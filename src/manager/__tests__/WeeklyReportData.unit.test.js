import WeeklyReportData from '../WeeklyReportData';
import MockDB from './mockDB'
import Events, { Meals, Emotion, Gluten, Severity, Symptoms } from '../../constants/Events';

getEvents1 = () => {
        events = []
        //before time window
        events.push(MockDB.symptom("21 Mar 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
        events.push(MockDB.meal("21 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("21 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        //In previous Week
        events.push(MockDB.symptom("22 Mar 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
        events.push(MockDB.meal("22 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("22 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.emotion("22 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.emotion("22 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.symptom("23 Mar 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
        events.push(MockDB.meal("23 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("23 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.interaction("23 Mar 2021 19:07:20.05"))
        events.push(MockDB.symptom("23 Mar 2021 19:07:20.05", Symptoms.LOW_ENERGY, Severity.MODERATE, ""))
        events.push(MockDB.meal("24 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.meal("24 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("24 Mar 2021 19:07:20.05", Emotion.NEUTRAL))
        events.push(MockDB.interaction("24 Mar 2021 19:07:20.05"))
        //Previous week but after this time last week
        events.push(MockDB.symptom("25 Mar 2021 13:07:20.05", Symptoms.BLOATING, Severity.SEVERE, ""))
        events.push(MockDB.meal("25 Mar 2021 13:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("25 Mar 2021 13:07:20.05", Emotion.HAPPY))
        events.push(MockDB.interaction("26 Mar 2021 19:07:20.05"))
        events.push(MockDB.symptom("27 Mar 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
        events.push(MockDB.meal("28 Mar 2021 19:08:20.05", Meals.BREAKFAST, Gluten.FREE))
        //Current Week Mon 29th to Sun 4th
        events.push(MockDB.symptom("31 Mar 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
        events.push(MockDB.meal("31 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("31 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.symptom("31 Mar 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
        events.push(MockDB.meal("31 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("31 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.symptom("31 Mar 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
        events.push(MockDB.meal("31 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("31 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.symptom("01 Apr 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
        events.push(MockDB.meal("01 Apr 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("01 Apr 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.interaction("01 Apr 2021 19:07:20.05"))
        events.push(MockDB.symptom("02 Apr 2021 19:07:20.05", Symptoms.LOW_ENERGY, Severity.MODERATE, ""))
        events.push(MockDB.meal("02 Apr 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("02 Apr 2021 19:07:20.05", Emotion.NEUTRAL))
        events.push(MockDB.interaction("02 Apr 2021 19:07:20.05"))
        events.push(MockDB.symptom("03 Apr 2021 19:07:20.05", Symptoms.BLOATING, Severity.SEVERE, ""))
        events.push(MockDB.meal("03 Apr 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("03 Apr 2021 19:07:20.05", Emotion.HAPPY))
        events.push(MockDB.interaction("03 Apr 2021 19:07:20.05"))
        events.push(MockDB.symptom("04 Apr 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
        events.push(MockDB.symptom("04 Apr 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
        events.push(MockDB.meal("04 Apr 2021 19:08:20.05", Meals.BREAKFAST, Gluten.FREE))
        //outside of time window
        events.push(MockDB.symptom("05 Apr 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
        events.push(MockDB.meal("05 Apr 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("05 Apr 2021 19:07:20.05", Emotion.UNHAPPY))

        return events;
}



const startOfCurrentWeek = new Date("2021-03-29T00:00:00")
const endOfCurrentWeek = new Date("2021-04-04T23:59:59")
const thurs_1_april = new Date("2021-04-01T12:00:00")

function initData(events, start, end, now) {
        var mockDB = new MockDB(events)
        wd = new WeeklyReportData(mockDB);
        return wd.init(start, end, now)
                .then(_ => wd)
}


describe('calculate weekly count score ', () => {

        var weekData = {};

        beforeAll((done) =>
                initData(getEvents1(), startOfCurrentWeek, endOfCurrentWeek, thurs_1_april)
                        .then(wd => { weekData = wd; done() })
        );

        test('this week count', () => {
                expect(weekData.thisWeekSymptomCount()).toBe(8)
                expect(weekData.thisWeekMoodCount()).toBe(6)
                expect(weekData.thisWeekMealCount()).toBe(7)
                //TODO add GIP events in DB
                expect(weekData.thisWeekGIPCount()).toBe(0)
        });

        test('previous week count until this time last week', () => {
                expect(weekData.previousPartialWeekSymptomCount()).toBe(3)
                expect(weekData.previousPartialWeekMoodCount()).toBe(5)
                expect(weekData.previousPartialWeekMealCount()).toBe(4)
                //TODO add GIP events in DB
                expect(weekData.previousPartialWeekGIPCount()).toBe(0)
        });


        test('previous week count until this time last week', () => {
                expect(weekData.previousFullWeekSymptomCount()).toBe(5)
                expect(weekData.previousFullWeekMoodCount()).toBe(6)
                expect(weekData.previousFullWeekMealCount()).toBe(6)
                //TODO add GIP events in DB
                expect(weekData.previousFullWeekGIPCount()).toBe(0)
        });

        test.todo('add mock GIP events to fix two previous tests')

        test('calc daily activity rate for this week', () => {
                expect(weekData.activityRateForDay(0)).toEqual(0)
                expect(weekData.activityRateForDay(2)).toEqual(1)
                expect(weekData.activityRateForDay(5)).toBeCloseTo(0.33)

        })

        test('calc best day', () => {
                expect(weekData.bestDayDate().toDateString()).toEqual("Sat Apr 03 2021")
        })

        test('calc best day counts', () => {
                expect(weekData.bestDaySymptomCount()).toEqual(1)
                expect(weekData.bestDayMoodCount()).toEqual(1)
                expect(weekData.bestDayMealCount()).toEqual(1)
                expect(weekData.bestDayGipTests()).toEqual(0)
        })
});

describe('calculate day score ', () => {
        glutenMaybe = MockDB.meal("31 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN)
        glutenYes = MockDB.meal("31 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.PRESENT)
        glutenNo = MockDB.meal("31 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.FREE)
        unhappy = MockDB.emotion("05 Apr 2021 19:07:20.05", Emotion.UNHAPPY)
        slightly_unhappy = MockDB.emotion("05 Apr 2021 19:07:20.05", Emotion.SLIGHTLY_UNHAPPY)
        neutral = MockDB.emotion("05 Apr 2021 19:07:20.05", Emotion.NEUTRAL)
        slightly_happy = MockDB.emotion("05 Apr 2021 19:07:20.05", Emotion.SLIGHTLY_HAPPY)
        happy = MockDB.emotion("05 Apr 2021 19:07:20.05", Emotion.HAPPY)
        severe = MockDB.symptom("01 Apr 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, Severity.SEVERE, "")
        moderate = MockDB.symptom("01 Apr 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, Severity.MODERATE, "")
        low = MockDB.symptom("01 Apr 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, Severity.LOW, "")
        no_symptom = MockDB.symptom("01 Apr 2021 19:07:20.05", Symptoms.NO_SYMPTOMS, 0, "")

        var weekData = new WeeklyReportData(new MockDB([]));

        beforeAll(() => {

                [glutenMaybe, glutenYes, glutenNo, severe, moderate, low, no_symptom, unhappy, slightly_unhappy, neutral, slightly_happy, happy]
                        .map(weekData.jsonifyEvent)
        });


        test('calculate day scores for meals', () => {
                expect(weekData.scoreDay([glutenMaybe, glutenYes, glutenNo])).toBe(0 + 0.5 + 1)
        });

        test('calculate day scores for emotions', () => {
                expect(weekData.scoreDay([unhappy,
                        slightly_unhappy,
                        neutral,
                        slightly_happy,
                        happy])).toBe(1 + 2 + 3 + 4 + 5)
        });

        test('calculate day scores for symptoms', () => {
                expect(weekData.scoreDay([severe, moderate, low, no_symptom])).toBe(1 + 2 + 3 + 5)
        });

        test.todo('calculate day scores for GIP')

        test('calculate day scores for a mix', () => {
                expect(weekData.scoreDay(
                        [glutenMaybe, glutenYes, glutenNo, severe, moderate, low, no_symptom, unhappy, slightly_unhappy, neutral, slightly_happy, happy]
                ))
                        .toBe(0 + 0.5 + 1 + 1 + 2 + 3 + 5 + 1 + 2 + 3 + 4 + 5)
        })
})


getEvents2 = () => {
        events = []
        events.push(MockDB.emotion("28 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.symptom("28 Mar 2021 19:07:20.05", Symptoms.NO_SYMPTOMS, 1, ""))
        //above is before test week
        events.push(MockDB.emotion("29 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.emotion("30 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.meal("31 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("31 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.meal("31 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("31 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.meal("31 Mar 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("31 Mar 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.meal("01 Apr 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("01 Apr 2021 19:07:20.05", Emotion.UNHAPPY))
        events.push(MockDB.interaction("01 Apr 2021 19:07:20.05"))
        events.push(MockDB.meal("02 Apr 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("02 Apr 2021 19:07:20.05", Emotion.NEUTRAL))
        events.push(MockDB.interaction("02 Apr 2021 19:07:20.05"))
        events.push(MockDB.meal("03 Apr 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
        events.push(MockDB.emotion("03 Apr 2021 19:07:20.05", Emotion.HAPPY))
        events.push(MockDB.interaction("03 Apr 2021 19:07:20.05"))
        events.push(MockDB.symptom("31 Mar 2021 19:07:20.05", Symptoms.NO_SYMPTOMS, 1, ""))
        events.push(MockDB.symptom("31 Mar 2021 19:07:20.05", Symptoms.NO_SYMPTOMS, 1, ""))
        events.push(MockDB.symptom("31 Mar 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, Severity.SEVERE, ""))
        events.push(MockDB.symptom("01 Apr 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, Severity.LOW, ""))
        events.push(MockDB.symptom("02 Apr 2021 19:07:20.05", Symptoms.LOW_ENERGY, Severity.MODERATE, ""))
        events.push(MockDB.symptom("02 Apr 2021 19:07:20.05", Symptoms.LOW_ENERGY, Severity.SEVERE, ""))
        events.push(MockDB.symptom("03 Apr 2021 19:07:20.05", Symptoms.BLOATING, Severity.SEVERE, ""))
        events.push(MockDB.symptom("04 Apr 2021 19:42:20.05", Symptoms.NO_SYMPTOMS, 1, ""))
        events.push(MockDB.symptom("04 Apr 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, Severity.MODERATE, ""))
        //below is after test week
        events.push(MockDB.symptom("05 Apr 2021 19:07:20.05", Symptoms.NO_SYMPTOMS,  Severity.MODERATE, ""))
        events.push(MockDB.symptom("05 Apr 2021 19:07:20.05", Symptoms.NO_SYMPTOMS,  Severity.SEVERE, ""))
        events.push(MockDB.emotion("05 Apr 2021 19:07:20.05", Emotion.HAPPY))

        return events;
}

describe('count  days with ', () => {

        var weekData = {};
        beforeAll((done) =>
                initData(getEvents2(), startOfCurrentWeek, endOfCurrentWeek, thurs_1_april)
                        .then(wd => { weekData = wd; done() })
        );

        test('symptom NO_SYMPTOM recorded', () => {
                expect(weekData.thisWeekNumDaysWithNO_SYMPTOM()).toEqual(2);
        })

        test('symptoms recorded', () => {
                expect(weekData.thisWeekNumDaysWithSymptoms()).toEqual(5);
        })

        test('meals recorded', () => {
                expect(weekData.thisWeekNumDaysWithMeals()).toEqual(4);
        })

        test('energy recorded', () => {
                expect(weekData.thisWeekNumDaysWithEnergy()).toEqual(6);
        })

        test.todo('GIP recorded')
        // , () =>{
        //         expect(weekData.thisWeekNumDaysWithGIP()).toEqual(6);
        // })

        test.only('days with mild as worst symptoms', () => {
                expect(weekData.thisWeekNumDaysWithMildAsWorstSymptoms()).toEqual(1);
        })

        test('days with moderate as worst symptoms', () => {
                expect(weekData.thisWeekNumDaysWithModerateAsWorstSymptoms()).toEqual(2);
        })

        test('days with severe symptoms', () => {
                expect(weekData.thisWeekNumDaysWithSevereAsWorstSymptoms()).toEqual(3);
        })
});


