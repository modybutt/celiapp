import DateUtil from '../utils/dateUtils';
import Events, {Emotion, Gluten, Severity, Symptoms} from '../constants/Events';

log = (msg, e) => {
    console.log(msg, " : ", e);
    return e
}

export default class WeeklyReportData {

    constructor(dataBase) {
        this.bestDay = {}
        this.events = []
        this.currentWeekStart = {}
        this.currentWeekEnd = {}
        this.thisTimePreviousWeek = {}
        this.dataBase = dataBase
        this.enrichedDays = []
    };

    init = (startOfWeek, endOfWeek, now) => {
        this.now = now || new Date()
        this.currentWeekStart = startOfWeek || DateUtil.getStartOfThisWeekBeginningMonday(this.now)
        this.currentWeekEnd = endOfWeek || DateUtil.getEndOfThisFullWeekEndingSunday(this.now)

        console.log("returning promise from init, start = ", startOfWeek)
        return Promise.all([
            this.getData(this.currentWeekStart, this.currentWeekEnd),
            this.getGoals()
        ]);
    }

    getGoals = () => this.dataBase.getDailyGoals()
        .then((goals) => {
            this.goals = goals.dailyGoals
            console.log("Got goals", this.goals)

        })
        .catch(error => console.error("Failed to get goals", error.message, error))

    jsonifyEvent = (event) => {
        event.objData = JSON.parse(event.objData)
        event.created = new Date(event.created)
        event.modified = new Date(event.modified)
        return event
    }

    getData = (startOfPeriod, endOfPeriod) => {
        return new Promise((resolve, _) => {
            this.getEventsBetweenDatesInclusive(startOfPeriod, endOfPeriod)
                .then(data => {
                    console.log("data from db, start = ", startOfPeriod)
                    this.events = data
                        .filter(event => event.eventType !== Events.LogEvent)
                        .map(this.jsonifyEvent)
                    console.log("data filtered, start = ", startOfPeriod)
                    this.calcBestDay()
                    console.log("best day calculated, start = ", startOfPeriod)
                    resolve("done")
                })
                .catch(err => console.log("Report data access error:", err.message, err));
        });
    }

    getEventsBetweenDatesInclusive = (start, end) =>
        new Promise((resolve, reject) => {
            this.dataBase.fetchEventsBetween(
                start,
                end,
                () => reject("Error fetching events for previous 7 days"),
                (_, {rows: {_array}}) => resolve(_array),
            );
        })

    TARGET_DAILY_SCORE = 9
    TARGET_MEALS_PER_DAY = 3
    TARGET_SYMPTOMS_PER_DAY = 3
    TARGET_EMOTIONS_PER_DAY = 3

    targetActivityCounter = (day) =>
        Math.min(day.mealCount, this.TARGET_MEALS_PER_DAY) +
        Math.min(day.emotionCount, this.TARGET_EMOTIONS_PER_DAY) +
        Math.min(day.symptomCount, this.TARGET_SYMPTOMS_PER_DAY)

    activityRateForDay = (dayOfWeek) => !!this.enrichedDays[dayOfWeek]  ? this.enrichedDays[dayOfWeek].activity : 0

    eventInCurrentWeek = (event) => event.created > this.currentWeekStart && event.created < this.currentWeekEnd

    scoreEvent = (event) => {

        switch (event.eventType) {
            case Events.Symptom: {
                const scores = {
                    [Severity.LOW]: 1,
                    [Severity.MODERATE]: 2,
                    [Severity.SEVERE]: 3,
                }

                if (event.objData.symptomID === 0) return 5;

                return event.objData.severity in scores ? scores[event.objData.severity] : 0;
            }

            case Events.Food: {
                const scores = {
                    [Gluten.FREE]: 1,
                    [Gluten.UNKNOWN]: 0.5,
                    [Gluten.PRESENT]: 0,
                }
                return event.objData.tag in scores ? scores[event.objData.tag] : 0;
            }

            case Events.Emotion: {
                const scores = {
                    [Emotion.HAPPY]: 5,
                    [Emotion.SLIGHTLY_HAPPY]: 4,
                    [Emotion.NEUTRAL]: 3,
                    [Emotion.SLIGHTLY_UNHAPPY]: 2,
                    [Emotion.UNHAPPY]: 1,
                }
                return event.objData.type in scores ? scores[event.objData.type] : 0;
            }

            case Events.GIP: {
                const scores = {
                    [Gluten.FREE]: 1,
                    [Gluten.UNKNOWN]: 0.5,
                    [Gluten.PRESENT]: 0,
                }
                return event.objData.result in scores ? scores[event.objData.result] : 0;
            }
        }
    }

    scoreDay = (dayEvents) => dayEvents.reduce(
        (sum, event) => this.scoreEvent(event) + sum,
        0
    )

    calcBestDay = () => {

        const dayEvents = new Array(7).fill(null).map(() => ({date: "", events: []}))

        const eventsGroupedIntoDays =
            this.events
                .filter(this.eventInCurrentWeek)
                .reduce((days, event) => {
                        const key = DateUtil.dayOfWeek(event.created)
                        days[key].date = DateUtil.justDate(event.created)
                        days[key].events.push(event)
                        return days
                    }, dayEvents
                )

        this.enrichedDays = Object.keys(eventsGroupedIntoDays)
            .map(key => eventsGroupedIntoDays[key])
            .map(day => (
                {
                    ...day,
                    score: this.scoreDay(day.events),
                    mealCount: this.countEventsOfTypeOnADay(Events.Food, day.date),
                    emotionCount: this.countEventsOfTypeOnADay(Events.Emotion, day.date),
                    symptomCount: this.countEventsOfTypeOnADay(Events.Symptom, day.date),
                    gipTests: this.countEventsOfTypeOnADay(Events.GIP, day.date),
                    noSymptomCount: this.countSymptomsOfTypeOnADay(Symptoms.NO_SYMPTOMS, day.date),
                    mildSymptomCount: this.countSymptomsOfTypeOnADay(null, day.date, Severity.LOW),
                    moderateSymptomCount: this.countSymptomsOfTypeOnADay(null, day.date, Severity.MODERATE),
                    severeSymptomCount: this.countSymptomsOfTypeOnADay(null, day.date, Severity.SEVERE),
                    highEnergyCount: this.countEventsOnADay(day.date, Events.Emotion, Emotion.HAPPY, null),
                    mediumEnergyCount: this.countEventsOnADay(day.date, Events.Emotion, Emotion.SLIGHTLY_HAPPY, null) +
                        this.countEventsOnADay(day.date, Events.Emotion, Emotion.NEUTRAL, null)

                }))
            .map(day => ({
                ...day,
                activity: this.targetActivityCounter(day) / this.TARGET_DAILY_SCORE
            }))

        this.bestDay = this.enrichedDays.reduce((bestDay, thisDay) => bestDay.score > thisDay.score ? bestDay : thisDay)
        console.log("best day calc -> ", this.bestDay)
    }

    countSymptomsOfTypeOnADay = (symptom, date, severity) => {
        const start = new Date(date)
        start.setHours(0, 0, 0, 0);
        const end = new Date(date)
        end.setHours(23, 59, 59, 999);
        return this.events
            .filter(event => event.created > start && event.created < end)
            .filter(event => event.eventType === Events.Symptom)
            .filter(event => symptom ? event.objData.symptomID === symptom.id : event.objData.symptomID !== Symptoms.NO_SYMPTOMS.id)
            .filter(event => severity ? event.objData.severity === severity : true)
            .length
    }

    countEventsOnADay = (date, type, subType, tag) => {
        const start = new Date(date)
        start.setHours(0, 0, 0, 0);
        const end = new Date(date)
        end.setHours(23, 59, 59, 999);

        return this.events
            .filter(event => event.created > start && event.created < end)
            .filter(event => event.eventType === type)
            .filter(event => event.objData)
            .filter(event => tag == null || event.objData.tag === tag)
            .filter(event => subType == null || event.objData.type === subType)
            .length
    }

    countEventsOfTypeOnADay = (type, date, tag) => {
        const start = new Date(date)
        start.setHours(0, 0, 0, 0);
        const end = new Date(date)
        end.setHours(23, 59, 59, 999);

        return tag ? this.countEventsOfTypeAndTagBetweenDates(type, tag, start, end)
            : this.countEventsOfTypeBetweenDates(type, start, end)
    }

    countEventsOfTypeBetweenDates = (type, start, end) =>
        this.events
            .filter(event => event.created > start && event.created < end)
            .filter(event => event.eventType === type)
            .length

    countEventsOfTypeAndTagBetweenDates = (type, tag, start, end) =>

        this.events
            .filter(event => event.created > start && event.created < end)
            .filter(event => event.eventType === type)
            .filter(event => event.objData && event.objData.tag === tag)
            .length

    countGIPEventsBetweenDates = (result, start, end) =>
        this.events
            .filter(event => event.created > start && event.created < end)
            .filter(event => event.eventType === Events.GIP)
            .filter(event => event.objData && event.objData.result === result)
            .length


    bestDayDate = () => this.bestDay.date
    bestDaySymptomCount = () => this.bestDay.symptomCount;
    bestDayMoodCount = () => this.bestDay.emotionCount;
    bestDayMealCount = () => this.bestDay.mealCount;
    bestDayGipTests = () => this.bestDay.gipTests;

    thisWeekGIPCount = () => this.countEventsOfTypeBetweenDates(Events.GIP, this.currentWeekStart, this.currentWeekEnd)
    thisWeekSymptomCount = () => this.countEventsOfTypeBetweenDates(Events.Symptom, this.currentWeekStart, this.currentWeekEnd)
    thisWeekMoodCount = () => this.countEventsOfTypeBetweenDates(Events.Emotion, this.currentWeekStart, this.currentWeekEnd)
    thisWeekMealCount = () => this.countEventsOfTypeBetweenDates(Events.Food, this.currentWeekStart, this.currentWeekEnd)

    thisWeekNumDaysWithNO_SYMPTOM = () => this.enrichedDays.filter(day => day.noSymptomCount > 0).length;
    thisWeekNumDaysWithSymptoms = () => this.enrichedDays.filter(day => day.symptomCount > 0).length;
    thisWeekNumDaysWithMeals = () => this.enrichedDays.filter(day => day.mealCount > 0).length;
    thisWeekNumDaysWithEnergy = () => this.enrichedDays.filter(day => day.emotionCount > 0).length;
    thisWeekNumDaysWithGIP = () => this.enrichedDays.filter(day => day.gipTests > 0).length;

    thisWeekNumDaysWithMildAsWorstSymptoms = () => this.enrichedDays.filter(day => day.mildSymptomCount > 0 && day.moderateSymptomCount === 0 && day.severeSymptomCount === 0).length;
    thisWeekNumDaysWithModerateAsWorstSymptoms = () => this.enrichedDays.filter(day => day.moderateSymptomCount > 0 && day.severeSymptomCount === 0).length;
    thisWeekNumDaysWithSevereAsWorstSymptoms = () => this.enrichedDays.filter(day => day.severeSymptomCount > 0).length;

    thisWeekGlutenFreeMealCount = () => this.countEventsOfTypeAndTagBetweenDates(Events.Food, Gluten.FREE, this.currentWeekStart, this.currentWeekEnd);

    numDaysHighEnergy = () => this.enrichedDays.filter(day => day.highEnergyCount > 0).length;
    numDaysMediumEnergy = () => this.enrichedDays.filter(day => day.mediumEnergyCount > 0).length;

    numGIPGlutenFree = () => this.countGIPEventsBetweenDates(Gluten.Free, this.currentWeekStart, this.currentWeekEnd)

    numDaysReachingSymptomGoal = () => this.enrichedDays.filter(day => day.symptomCount >= this.goals.dailySymptoms).length;
    numDaysReachingEmotionGoal = () => this.enrichedDays.filter(day => day.emotionCount >= this.goals.dailyEmotions).length;
    numDaysReachingMealGoal = () => this.enrichedDays.filter(day => day.mealCount >= this.goals.dailyMeals).length;
    numDaysReachingGIPGoal = () => this.enrichedDays.filter(day => day.gipTests >= this.goals.dailyGips).length;

};