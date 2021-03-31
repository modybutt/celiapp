import DatabaseManager from '../manager/DatabaseManager';
import Events, { Emotion, Gluten, Severity } from '../constants/Events';

export default class WeeklyReportData {

    constructor(){
        this.dailySummary = new Array(7).fill().map(_ => ({}));
        this.bestDay = {}
    }

    scoreEvent = (event) => {
        switch (event.eventType) {
          case Events.Symptom: {
            const scores = {
              [Severity.LOW]: 1,
              [Severity.MODERATE]: 2,
              [Severity.SEVERE]: 3,
            }
    
            if (event.objData.symptomID === 0) return 5;
    
            return event.objData.type in scores ? scores[event.objData.type] : 0;
          }
          case Events.Food: {
            const scores = {
              [Gluten.FREE]: 1,
              [Gluten.UNKNOWN]: 0.5,
              [Gluten.PRESENT]: 0,
            }
            return event.objData.type in scores ? scores[event.objData.type] : 0;
          }
    
          case Events.Emotion: {
            const scores = {
              [Emotion.HAPPY]: 4,
              [Emotion.SLIGHTLY_HAPPY]: 3,
              [Emotion.NEUTRAL]: 2,
              [Emotion.SLIGHTLY_UNHAPPY]: 1,
              [Emotion.UNHAPPY]: 0,
            }
            return event.objData.type in scores ? scores[event.objData.type] : 0;
          }
    
          case Events.GIP: {
            return 1;
          }
        }
    }
    
    init = (startOfWeek, endOfWeek) => {
        this.initialiseDailySummary(startOfWeek);
        console.log("Daily summary");
        
        return this.getData(startOfWeek, endOfWeek);
    }

    //TODO move to util class
    static fullDaysSinceEpoch = (date) => Math.floor(date / 8.64e7);
    //TODO move to util class
    static dateAsDaysAgo = (date) => this.fullDaysSinceEpoch(new Date()) - this.fullDaysSinceEpoch(date);

    getData = (startOfPeriod, endOfPeriod) => 
        this.getEventsBetweenDatesInclusive(startOfPeriod, endOfPeriod)
            .then(data => {
                data
                    .filter(event => event.eventType !== Events.LogEvent)
                    .map(event => {
                    event.objData = JSON.parse(event.objData)
                    event.created = new Date(event.created)
                    event.modified = new Date(event.modified)
                    event.daysAgo = this.dateAsDaysAgo(event.created)
                    return event
                })
                .map(event => { console.log("Event enriched:", event); return event })
                .map(event => this.addToDailyScore(event.daysAgo, startOfWeekAsDaysAgo, event))
                this.calcBestDay()
            })
            .catch(err => console.log("Report data access error:", err.message));

    getEventsBetweenDatesInclusive = (start, end) =>
        new Promise((resolve, reject) => {
            DatabaseManager.getInstance().fetchEventsBetween(
            start,
            end,
            () => reject("Error fetching events for previous 7 days"),
            (_, { rows: { _array } }) => resolve(_array),
            );
        })
    }

    dailyFields = ["eventCount","score","mealCount","moodCount","symptomCount","gipTests"];
    
    initialiseDailySummary = (d) =>{
        var date = new Date(d)
        this.dailySummary.forEach(ds => {
            this.dailyFields
            .forEach( (f) => {ds[f] = 0;})
            ds.date = new Date(date)
            date.setDate(date.getDate()+1)
        });
    }

    addToDailyScore = (day, start, event) => {
        const dayOfWeek = start - day;  
    
        this.dailySummary[dayOfWeek].eventCount += 1;
        this.dailySummary[dayOfWeek].score += this.scoreEvent(event);
    
        switch (event.eventType) {
          case Events.Symptom: {
            this.dailySummary[dayOfWeek].symptomCount++;
            break;
          }
          case Events.Food: {
            this.dailySummary[dayOfWeek].mealCount++;
            break;
          }
          case Events.Emotion: {
            this.dailySummary[dayOfWeek].moodCount++;
            break;
          }
          case Events.GIP: {
            this.dailySummary[dayOfWeek].gipTests++;
            break;
          }
        }
    
      }

      static TARGET_DAILY_EVENTS = 9;
      activityRateForDay = (dayOfWeek) => this.dailySummary[dayOfWeek].eventCount/this.TARGET_DAILY_EVENTS

      calcBestDay =() => {
        this.bestDay=this.dailySummary[0];
        for(i=1;i< this.dailySummary.length;i++){
          if(this.dailySummary[i].score > this.bestDay.score)
            this.bestDay=this.dailySummary[i];
        }
      }

      bestDayDate = () => this.bestDay.date

      bestDaySymptomCount = () => this.bestDay.symptomCount;
      bestDayMoodCount = () => this.bestDay.moodCount;
      bestDayMealCount = () => this.bestDay.mealCount;
      bestDayGipTests = () => this.bestDay.gipTests;

      
};