export default class DateUtil {
  static getPreviousSunday(now) {
    var date = now || new Date();
    var dayOfWeek = date.getDay();
    var prevSunday = new Date(date);
    prevSunday.setDate(date.getDate() - (dayOfWeek == 0 ? 7 : dayOfWeek));
    return prevSunday;
  }

  static getStartOfPenultimateFullWeekBeginningMonday(now) {
    var endOfWeek = DateUtil.getPreviousSunday(now || new Date());
    var endOfPenultimateWeek = DateUtil.getPreviousSunday(endOfWeek);
    var startOfWeek = new Date(endOfPenultimateWeek);
    startOfWeek.setDate(endOfPenultimateWeek.getDate() - 6);

    startOfWeek.setHours(0, 0, 0, 0);

    return startOfWeek;
  }

  static getEndOfPenultimateFullWeekEndingSunday(now) {
    var endOfWeek = DateUtil.getPreviousSunday(now || new Date());
    var endOfPenultimateWeek = DateUtil.getPreviousSunday(endOfWeek);
    endOfPenultimateWeek.setHours(23, 59, 59, 999);
    return endOfPenultimateWeek;
  }

  static getEndOfPreviousFullWeekEndingSunday(now) {
    var endOfWeek = DateUtil.getPreviousSunday(now || new Date());
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  }

  static getStartOfPreviousFullWeekBeginningMonday(now) {
    var endOfWeek = DateUtil.getPreviousSunday(now || new Date());
    var startOfWeek = new Date(endOfWeek);
    startOfWeek.setDate(endOfWeek.getDate() - 6);

    startOfWeek.setHours(0, 0, 0, 0);

    return startOfWeek;
  }

  static getStartOfThisWeekBeginningMonday(now) {
    now = now || new Date()
    var previousSunday = DateUtil.getPreviousSunday(now);
    var startOfWeek = new Date(now)
    startOfWeek.setDate(previousSunday.getDate() + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }

  static getEndOfThisFullWeekEndingSunday(now) {
    now = now || new Date()
    var previousSunday = DateUtil.getPreviousSunday(now);
    var endOfWeek = new Date(now)
    endOfWeek.setDate(previousSunday.getDate() + 7);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  }

  static fullDaysSinceEpoch = (date) => Math.floor(date / 8.64e7);

  static dateAsDaysAgo = (date) => DateUtil.fullDaysSinceEpoch(new Date()) - DateUtil.fullDaysSinceEpoch(date);

  static sameTimeAWeekPrevious = date => {
    d = date ? new Date(date) : new Date()
    d.setDate(d.getDate() - 7)
    return d
  }

  static dayOfWeek = date => date.getDay() == 0 ? 6 : date.getDay() - 1

  static justDate = date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

  static daysBetween = (start, end) => {
    var days = []
    var stopDate = new Date(DateUtil.justDate(end))
    var loopDate = new Date(DateUtil.justDate(start))
    do {
      days.push(loopDate)
      loopDate = new Date(loopDate)
      loopDate.setDate(loopDate.getDate() + 1)
    } while (loopDate <= stopDate)

    return days
  }

}