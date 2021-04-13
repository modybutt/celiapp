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

jest.mock('../WeeklyReportData', () =>{
    return jest.fn().mockImplementation(()=>{
        return {
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
        }
    })
});

beforeAll(() => {
    reportData.init.mockResolvedValue("ok");
});

var db = new DatabaseManager();
var reportData = new WeeklyReportData(db);

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

    reportData.bestDayDate.mockReturnValue(new Date("2021-03-29T13:00:00"))
    ReportManager.weeklyReport(callback)
});

test.skip('should report days with no symptoms', done => {
    function callback(report){
            //console.log("XXXXXXXXXXXXXX", report)
            try{
                expect(report.bestDayHeading).toEqual("3 days you entered NO SYMPTOMS");
                done();
            }
            catch(error){
                done(error);
            }
    }

    reportData.bestDayDate.mockReturnValue(new Date("2021-03-29T13:00:00"))
    //console.log(reportData.bestDayDate())
    ReportManager.weeklyReport(callback)
});