import du from '../dateUtils';

const mon19_Apr_2021 = new Date("2021-4-19")
const mon12_Apr_2021 = new Date("2021-4-12")
const mon05_Apr_2021 = new Date("2021-4-05")
const sun18_Apr_2021 = new Date("2021-4-18")
const sun25_Apr_2021 = new Date("2021-4-25")
const sun18_Apr_2021_midnight = new Date("2021-04-18T23:59:59.999")
const sun11_Apr_2021 = new Date("2021-4-11")
const tue20_Apr_2021_1pm = new Date("2021-04-20T13:00:35")
const tue20_Apr_2021 = new Date("2021-04-20")
const tue13_Apr_2021 = new Date("2021-04-13T13:00:35")


test('get previous sunday', () => {
    expect(du.getPreviousSunday(mon19_Apr_2021)).toEqual(sun18_Apr_2021);
    expect(du.getPreviousSunday(sun18_Apr_2021)).toEqual(sun11_Apr_2021);
});

test('get end previous week', () => {
    expect(du.getEndOfPreviousFullWeekEndingSunday(mon19_Apr_2021)).toEqual(sun18_Apr_2021_midnight);
    expect(du.getEndOfPreviousFullWeekEndingSunday(sun25_Apr_2021)).toEqual(sun18_Apr_2021_midnight);
});

test('get start previous week', () => {
    expect(du.getStartOfPreviousFullWeekBeginningMonday(mon19_Apr_2021)).toEqual(mon12_Apr_2021);
    expect(du.getStartOfPreviousFullWeekBeginningMonday(sun18_Apr_2021)).toEqual(mon05_Apr_2021);
});

test('get start current week', () => {
    expect(du.getStartOfThisWeekBeginningMonday(mon19_Apr_2021)).toEqual(mon19_Apr_2021);
    expect(du.getStartOfThisWeekBeginningMonday(sun18_Apr_2021)).toEqual(mon12_Apr_2021);
});

test('get start current week', () => {
    expect(du.getEndOfThisFullWeekEndingSunday(mon12_Apr_2021)).toEqual(sun18_Apr_2021_midnight);
    expect(du.getEndOfThisFullWeekEndingSunday(sun18_Apr_2021)).toEqual(sun18_Apr_2021_midnight);
});

test('get start current week', () => {
    expect(du.sameTimeAWeekPrevious(tue20_Apr_2021_1pm)).toEqual(tue13_Apr_2021);
});

test('days between two days without time', () => {
    days = du.daysBetween(sun18_Apr_2021, mon19_Apr_2021)
    expect(days).toEqual([sun18_Apr_2021,mon19_Apr_2021]);
});
