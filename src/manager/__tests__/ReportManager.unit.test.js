import ReportManager from "../ReportManager"
import WeeklyReportData from '../WeeklyReportData';
import DatabaseManager from '../DatabaseManager'


jest.mock("../WeeklyReportData")
jest.mock('../DatabaseManager')

const mockInit = jest.fn();
const mockBestDayDate = jest.fn();
const mockBestDaySymptomCount = jest.fn();
const mockBestDayMoodCount = jest.fn();
const mockBestDayMealCount = jest.fn();
const mockBestDayGipTests = jest.fn();
const mockThisWeekGIPCount = jest.fn();
const mockThisWeekSymptomCount = jest.fn();
const mockThisWeekMoodCount = jest.fn();
const mockThisWeekMealCount = jest.fn();
const mockPreviousPartialWeekGIPCount = jest.fn();
const mockPreviousPartialWeekSymptomCount = jest.fn();
const mockPreviousPartialWeekMoodCount = jest.fn();
const mockPreviousPartialWeekMealCount = jest.fn();
const mockPreviousFullWeekGIPCount = jest.fn();
const mockPreviousFullWeekSymptomCount = jest.fn();
const mockPreviousFullWeekMoodCount = jest.fn();
const mockPreviousFullWeekMealCount = jest.fn();
const mockActivityRateForDay = jest.fn();
const mockThisWeekNumDaysWithNO_SYMPTOM = jest.fn();
const mockThisWeekNumDaysWithSymptoms = jest.fn();
const mockThisWeekNumDaysWithMeals = jest.fn();
const mockThisWeekNumDaysWithEnergy = jest.fn();
const mockThisWeekNumDaysWithGIP = jest.fn();
const mockThisWeekNumDaysWithMildAsWorstSymptoms = jest.fn();
const mockThisWeekNumDaysWithModerateAsWorstSymptoms = jest.fn();
const mockThisWeekNumDaysWithSevereAsWorstSymptoms = jest.fn();

var mockReportData = {
    init: mockInit,
    bestDayDate : mockBestDayDate,
    bestDaySymptomCount : mockBestDaySymptomCount,
    bestDayMoodCount : mockBestDayMoodCount,
    bestDayMealCount : mockBestDayMealCount,
    bestDayGipTests : mockBestDayGipTests,
    thisWeekGIPCount : mockThisWeekGIPCount,
    thisWeekSymptomCount : mockThisWeekSymptomCount,
    thisWeekMoodCount : mockThisWeekMoodCount,
    thisWeekMealCount : mockThisWeekMealCount,
    previousPartialWeekGIPCount : mockPreviousPartialWeekGIPCount,
    previousPartialWeekSymptomCount : mockPreviousPartialWeekSymptomCount,
    previousPartialWeekMoodCount : mockPreviousPartialWeekMoodCount,
    previousPartialWeekMealCount : mockPreviousPartialWeekMealCount,
    previousFullWeekGIPCount : mockPreviousFullWeekGIPCount,
    previousFullWeekSymptomCount : mockPreviousFullWeekSymptomCount,
    previousFullWeekMoodCount : mockPreviousFullWeekMoodCount,
    previousFullWeekMealCount : mockPreviousFullWeekMealCount,
    activityRateForDay:  mockActivityRateForDay,
    thisWeekNumDaysWithNO_SYMPTOM: mockThisWeekNumDaysWithNO_SYMPTOM,
    thisWeekNumDaysWithSymptoms: mockThisWeekNumDaysWithSymptoms,
    thisWeekNumDaysWithMeals: mockThisWeekNumDaysWithMeals,
    thisWeekNumDaysWithEnergy: mockThisWeekNumDaysWithEnergy,
    thisWeekNumDaysWithGIP: mockThisWeekNumDaysWithGIP,
    thisWeekNumDaysWithMildAsWorstSymptoms: mockThisWeekNumDaysWithMildAsWorstSymptoms,
    thisWeekNumDaysWithModerateAsWorstSymptoms: mockThisWeekNumDaysWithModerateAsWorstSymptoms,
    thisWeekNumDaysWithSevereAsWorstSymptoms: mockThisWeekNumDaysWithSevereAsWorstSymptoms,
};

jest.mock('../WeeklyReportData', () =>{
    return jest.fn().mockImplementation(()=>{
        return mockReportData;
    })
});

beforeAll(() => {
    mockReportData.init.mockResolvedValue("ok");
});

//var db = new DatabaseManager();


test('should get best day', done => {
    function callback(report){
            try{
                expect(report.bestDayHeading).toEqual("Monday, March 29");
                done();
            }
            catch(error){
                done(error);
            }
    }

    mockReportData.bestDayDate.mockReturnValue(new Date("2021-03-29T13:00:00"))
    ReportManager.weeklyReport(callback)
});

test('should report days with no symptoms', done => {
    function callback(report){
            try{
                expect(report.symptomInfo.headline).toEqual("3 days you recorded as SYMPTOM FREE. Good job!");
                expect(report.symptomInfo.body).toEqual("You logged 4 symptoms this week. This is your first week");
                done();
            }
            catch(error){
                done(error);
            }
    }

    mockReportData.thisWeekNumDaysWithNO_SYMPTOM.mockReturnValue(3)
    mockReportData.thisWeekSymptomCount.mockReturnValue(4)
    ReportManager.weeklyReport(callback)
});

test.each([0,1,2])('should remind to record symptoms if recorded only 2 or less days', (days,done) => {
    function callback(report){
            try{
                expect(report.symptomInfo.headline).toEqual("Most of the week you haven’t logged any symptoms.");
                expect(report.symptomInfo.sub).toEqual("Did you know that you can also enter NO SYMPTOMS if you had none?");
                done();
            }
            catch(error){
                done(error);
            }
    }

    mockReportData.thisWeekNumDaysWithNO_SYMPTOM.mockReturnValue(0)
    mockReportData.thisWeekNumDaysWithSymptoms.mockReturnValue(days)
    ReportManager.weeklyReport(callback)
});

test('days with mild symptoms', (done) => {
    function callback(report){
            try{
                expect(report.symptomInfo.headline).toEqual("5 days you have felt symptoms, of which 2 days they were only mild.");
                expect(report.symptomInfo.sub).toEqual("First week: Let’s try to get symptom FREE days!");
                done();
            }
            catch(error){
                done(error);
            }
    }

    mockReportData.thisWeekNumDaysWithMildAsWorstSymptoms.mockReturnValue(2);
    mockReportData.thisWeekNumDaysWithSymptoms.mockReturnValue(5);
    ReportManager.weeklyReport(callback)
});

test('days with moderate symptoms', (done) => {
    function callback(report){
            try{
                expect(report.symptomInfo.headline).toEqual("6 days you have felt symptoms, of which 3 days they were moderate.");
                expect(report.symptomInfo.sub).toEqual("Let’s try to do better next week!");
                done();
            }
            catch(error){
                done(error);
            }
    }

    mockReportData.thisWeekNumDaysWithMildAsWorstSymptoms.mockReturnValue(0)
    mockReportData.thisWeekNumDaysWithModerateAsWorstSymptoms.mockReturnValue(3)
    mockReportData.thisWeekNumDaysWithSymptoms.mockReturnValue(6)

    ReportManager.weeklyReport(callback)
});

test('days with severe symptoms', (done) => {
    function callback(report){
            try{
                expect(report.symptomInfo.headline).toEqual("5 days you have felt symptoms, of which 4 days they were severe.");
                expect(report.symptomInfo.sub).toEqual("Let’s try to do better next week!");
                done();
            }
            catch(error){
                done(error);
            }
    }

    mockReportData.thisWeekNumDaysWithMildAsWorstSymptoms.mockReturnValue(0)
    mockReportData.thisWeekNumDaysWithModerateAsWorstSymptoms.mockReturnValue(0)
    mockReportData.thisWeekNumDaysWithSevereAsWorstSymptoms.mockReturnValue(4)
    mockReportData.thisWeekNumDaysWithSymptoms.mockReturnValue(5)

    ReportManager.weeklyReport(callback)
});

