import ReportManager from "../ReportManager"
import WeeklyReportData from '../WeeklyReportData';
import DatabaseManager from '../DatabaseManager'


//jest.mock("../WeeklyReportData")
//jest.mock('../DatabaseManager')

class mockReportData {
    //class mockReportData  {
    init = jest.fn();
    bestDayDate = jest.fn();
    bestDaySymptomCount = jest.fn();
    bestDayMoodCount = jest.fn();
    bestDayMealCount = jest.fn();
    bestDayGipTests = jest.fn();
    thisWeekGIPCount = jest.fn();
    thisWeekSymptomCount = jest.fn();
    thisWeekMoodCount = jest.fn();
    thisWeekMealCount = jest.fn();
    activityRateForDay = jest.fn();
    thisWeekNumDaysWithNO_SYMPTOM = jest.fn();
    thisWeekNumDaysWithSymptoms = jest.fn();
    thisWeekNumDaysWithMeals = jest.fn();
    thisWeekNumDaysWithEnergy = jest.fn();
    thisWeekNumDaysWithGIP = jest.fn();
    thisWeekNumDaysWithMildAsWorstSymptoms = jest.fn();
    thisWeekNumDaysWithModerateAsWorstSymptoms = jest.fn();
    thisWeekNumDaysWithSevereAsWorstSymptoms = jest.fn();
    thisWeekGlutenFreeMealCount = jest.fn();
    numDaysHighEnergy = jest.fn();
    numDaysMediumEnergy = jest.fn();
    

};

var mockThisWeekData = new mockReportData;
var mockPrevWeekData = new mockReportData;

jest.mock('../WeeklyReportData')

var MonApr06_2020 = new Date("2020-04-06T13:00:00")
var SatMar28_2020 = new Date("2020-03-28T13:00:00")

var mockGetDBCreatedDate = jest.fn().mockReturnValue(SatMar28_2020);

DatabaseManager.getInstance = () => {
    return {
        getDBCreatedDate: mockGetDBCreatedDate
    }
}


beforeEach(() => {
    mockThisWeekData.init.mockResolvedValue("ok");
    mockGetDBCreatedDate.mockReturnValue(SatMar28_2020)

    WeeklyReportData
        .mockImplementationOnce(() => mockThisWeekData)
        .mockImplementationOnce(() => mockPrevWeekData)
})


test('should get best day', done => {
    function callback(report) {
        try {
            expect(report.bestDayHeading).toEqual("Monday, March 29");
            done();
        }
        catch (error) {
            done(error);
        }
    }

    mockThisWeekData.bestDayDate.mockReturnValue(new Date("2021-03-29T13:00:00"))
    ReportManager.weeklyReport(callback)
});

test('should report days with no symptoms', done => {
    function callback(report) {
        try {
            expect(report.symptomInfo.headline).toEqual("3 days you recorded as SYMPTOM FREE. Good job!");
            expect(report.symptomInfo.body).toEqual("You logged 4 symptoms this week. This is your first week");
            done();
        }
        catch (error) {
            done(error);
        }
    }

    mockThisWeekData.thisWeekNumDaysWithNO_SYMPTOM.mockReturnValue(3)
    mockThisWeekData.thisWeekSymptomCount.mockReturnValue(4)
    ReportManager.weeklyReport(callback)
});

test.each([0, 1, 2])('should remind to record symptoms if recorded only 2 or less days', (days, done) => {
    function callback(report) {
        try {
            expect(report.symptomInfo.headline).toEqual("Most of the week you haven’t logged any symptoms.");
            expect(report.symptomInfo.sub).toEqual("Did you know that you can also enter NO SYMPTOMS if you had none?");
            done();
        }
        catch (error) {
            done(error);
        }
    }

    mockThisWeekData.thisWeekNumDaysWithNO_SYMPTOM.mockReturnValue(0)
    mockThisWeekData.thisWeekNumDaysWithSymptoms.mockReturnValue(days)
    ReportManager.weeklyReport(callback)
});

test('days with mild symptoms', (done) => {
    function callback(report) {
        try {
            expect(report.symptomInfo.headline).toEqual("5 days you have felt symptoms, of which 2 days they were only mild.");
            expect(report.symptomInfo.sub).toEqual("Keep it up and try to get more symptom FREE days!");
            done();
        }
        catch (error) {
            done(error);
        }
    }

    mockThisWeekData.thisWeekNumDaysWithMildAsWorstSymptoms.mockReturnValue(2);
    mockThisWeekData.thisWeekNumDaysWithSymptoms.mockReturnValue(5);
    ReportManager.weeklyReport(callback)
});

test('days with mild symptoms, first week', (done) => {
    function callback(report) {
        try {
            expect(report.symptomInfo.headline).toEqual("5 days you have felt symptoms, of which 2 days they were only mild.");
            expect(report.symptomInfo.sub).toEqual("First week: Let’s try to get symptom FREE days!");
            done();
        }
        catch (error) {
            done(error);
        }
    }

    mockGetDBCreatedDate.mockReturnValue(SatMar28_2020)

    mockThisWeekData.thisWeekNumDaysWithMildAsWorstSymptoms.mockReturnValue(2);
    mockThisWeekData.thisWeekNumDaysWithSymptoms.mockReturnValue(5);
    ReportManager.weeklyReport(callback, MonApr06_2020)
});

test('days with moderate symptoms', (done) => {
    function callback(report) {
        try {
            expect(report.symptomInfo.headline).toEqual("6 days you have felt symptoms, of which 3 days they were moderate.");
            expect(report.symptomInfo.sub).toEqual("Let’s try to do better next week!");
            done();
        }
        catch (error) {
            done(error);
        }
    }

    mockThisWeekData.thisWeekNumDaysWithMildAsWorstSymptoms.mockReturnValue(0)
    mockThisWeekData.thisWeekNumDaysWithModerateAsWorstSymptoms.mockReturnValue(3)
    mockThisWeekData.thisWeekNumDaysWithSymptoms.mockReturnValue(6)

    ReportManager.weeklyReport(callback)
});

test('days with severe symptoms', (done) => {
    function callback(report) {
        try {
            expect(report.symptomInfo.headline).toEqual("5 days you have felt symptoms, of which 4 days they were severe.");
            expect(report.symptomInfo.sub).toEqual("Let’s try to do better next week!");
            done();
        }
        catch (error) {
            done(error);
        }
    }

    mockThisWeekData.thisWeekNumDaysWithMildAsWorstSymptoms.mockReturnValue(0)
    mockThisWeekData.thisWeekNumDaysWithModerateAsWorstSymptoms.mockReturnValue(0)
    mockThisWeekData.thisWeekNumDaysWithSevereAsWorstSymptoms.mockReturnValue(4)
    mockThisWeekData.thisWeekNumDaysWithSymptoms.mockReturnValue(5)

    ReportManager.weeklyReport(callback)
});

