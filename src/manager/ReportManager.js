import DatabaseManager from '../manager/DatabaseManager';
import Events, { Emotion, Gluten, Severity } from '../constants/Events';

export default class ReportManager {

  static reportData = {
    symptomInfo: {
      body: "You have logged 6 meals That is 3 more than last week!",
      headline: "5 days you have had NO SYMPTOMS!",
      sub: "",
    },
    mealInfo: {
      body: "You have logged 6 meals That is 3 more than last week",
      headline: "3 logged meals were GLUTENFREE!",
      sub: "You have reached intermediate level in food logging. Log 3 more to become an expert!",
    },
    emotionInfo: {
      body: "You have logged 6 meals That is 3 more than last week",
      headline: "3 days you were DELIGHTED about your diet",
      sub: "",
    },
    gipInfo: {
      body: "You have logged 1 test this week. That is 1 more then last week!",
      headline: " All tests were GLUTENFREE!",
      sub: "You have reached beginner level in testing for Gluten. Log 2 more to become an intermediate!",
    },
    dailyActivity: [0.0, 0.1, 0.3, 0.5, 0.7, 0.8, 1.0],

    bestDayHeading: "Thursday October 8th",
    bestDayBody: "You logged no symptoms, had a delighted mood, a gluten free test and no meals"

  }

  static getPreviousSunday(now) {
    var date = now || new Date();
    var dayOfWeek = date.getDay();
    var prevSunday = new Date(date);
    prevSunday.setDate(date.getDate() - (dayOfWeek == 0 ? 7 : dayOfWeek));
    return prevSunday;
  }

  static getEndOfPreviousFullWeekBeginningMonday(now) {
    var endOfWeek = this.getPreviousSunday(now || new Date());
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  }

  static getStartOfPreviousFullWeekBeginningMonday(now) {
    var endOfWeek = this.getPreviousSunday(now || new Date());
    var startOfWeek = new Date(endOfWeek);
    startOfWeek.setDate(endOfWeek.getDate() - 6);

    startOfWeek.setHours(0, 0, 0, 0);

    return startOfWeek;
  }

  static getStartOfThisWeekBeginningMonday(now){
    var previousSunday = this.getPreviousSunday(now || new Date());
    var startOfWeek=new Date()
    startOfWeek.setDate(previousSunday.getDate() + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }

  static getEndOfThisWeekBeginningMonday(now){
    var previousSunday = this.getPreviousSunday(now || new Date());
    var endOfWeek=new Date()
    endOfWeek.setDate(previousSunday.getDate() + 7);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  }

  static getEventsBetweenDatesInclusive(start, end) {
    return new Promise((resolve, reject) => {
      DatabaseManager.getInstance().fetchEventsBetween(
        start,
        end,
        () => reject("Error fetching events for previous 7 days"),
        (_, { rows: { _array } }) => resolve(_array),
      );
    })
  }

  static fullDaysSinceEpoch = (date) => Math.floor(date / 8.64e7);

  static dateAsDaysAgo = (date) => this.fullDaysSinceEpoch(new Date()) - this.fullDaysSinceEpoch(date);

  static scoreEvent = (event) => {
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

  static dailyScores = []
  static addToDailyScore = (day, start) => {
    const dayOfWeek = start - day
    console.log("dayOfWeek", dayOfWeek)
    this.dailyScores[dayOfWeek] = this.dailyScores[dayOfWeek] || 0;
    this.dailyScores[dayOfWeek] += 1;
  }

  static weeklyReport(success) {
    this.dailyScores = Array(7).fill(0);

    const startOfWeek = this.getStartOfThisWeekBeginningMonday()
    const endOfWeek = this.getEndOfThisWeekBeginningMonday()
    console.log("startofweek", startOfWeek)
    console.log("endtofweek", endOfWeek)
    
    const startOfWeekAsDaysAgo = this.dateAsDaysAgo(startOfWeek)
    console.log("startOfWeekAsDaysAgo", startOfWeekAsDaysAgo)
    
    this.getEventsBetweenDatesInclusive(startOfWeek, endOfWeek)
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
          .map(event => this.addToDailyScore(event.daysAgo, startOfWeekAsDaysAgo))

        console.log("DailyScores:", this.dailyScores)
        this.reportData.dailyActivity  = this.dailyScores.map(s => s/9)
        this.reportData.weekEndingDate = endOfWeek
        console.log("DailyActivity:", this.reportData.dailyActivity)

        success(this.reportData)
      })
      .catch(err => console.log("Report error:", err.message));
  }
}