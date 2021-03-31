import WeeklyReportData from './WeeklyReportData';

export default class ReportManager {

  static reportText = {
    symptomInfo: {
      body: "You haven’t logged any symptoms.Did you know that you can also enter NO SYMPTOMS if you had none?",
      headline: "",
      sub: "",
    },
    mealInfo: {
      body: "You have not logged any meals. Surely you must have eaten something this week? ",
      headline: "",
      sub: "",
    },
    emotionInfo: {
      body: "You have not logged any energy levels. Did you know that logging energy levels can give you better insight into your diet? ",
      headline: "",
      sub: "",
    },
    gipInfo: {
      body: "You have You have not logged any GIP sticks. Logging GIP sticks will help you master your diet! 1 test this week. That is 1 more then last week!",
      headline: "",
      sub: "",
    },
    dailyActivity: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],

    bestDayHeading: "Unknown",
    bestDayBody: "Everyday was just like the previous"

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

  static fullDaysSinceEpoch = (date) => Math.floor(date / 8.64e7);

  static dateAsDaysAgo = (date) => this.fullDaysSinceEpoch(new Date()) - this.fullDaysSinceEpoch(date);

  static symptomString = (count) => {
    if (count == 1) return "one symptom";
    if (count >  1) return "" + count + "symptoms";
    return "no symptoms";
  }

  static mealString = (count) => {
      if (count == 1) return "one meal";
      if (count >  1) return "" + count + "meals";
      return "no meals";
  }

  static moodString = (count) => {
    if (count == 1) return "one mood";
    if (count >  1) return "" + count + "moods";
    return "no moods";
  }

  static gipFreeString = (count) => {
      if (count == 1) return "a gluten-free test";
      if (count >  1) return "" + count + "gluten-free tests";
      return "";
  }

  static gipPositiveString = (count) => {
    if (count == 1) return "a gluten-positive test";
    if (count >  1) return "" + count + "gluten-positive tests";
    return "";
  
}

  static daySummaryString = (weekData) => {
    return "You logged " +
      this.symptomString(weekData.bestDaySymptomCount()) + ", " +
      this.moodString(weekData.bestDayMoodCount()) + ", " +
      this.mealString(weekData.bestDayMealCount()) + ", " +
      this.gipFreeString(weekData.bestDayGipTests());
  }

  static weeklyReport(success) {

    const startOfWeek = this.getStartOfThisWeekBeginningMonday();
    const endOfWeek = this.getEndOfThisWeekBeginningMonday();

    console.log("startofweek", startOfWeek)
    console.log("endtofweek", endOfWeek)
    
    const startOfWeekAsDaysAgo = this.dateAsDaysAgo(startOfWeek)
    console.log("startOfWeekAsDaysAgo", startOfWeekAsDaysAgo)
    
    const weekData = new WeeklyReportData();

    weekData.init(startOfWeek, endOfWeek)
      .then( _ => {
        console.log("Data processed ok")
        this.reportText.dailyActivity = [0,1,2,3,4,5,6].map(day => weekData.activityRateForDay(day))
        this.reportText.weekEndingDate = endOfWeek

        var dateFormat = { weekday: 'long', month: 'long', day: 'numeric' };
        this.reportText.bestDayHeading = weekData.bestDayDate().toLocaleDateString("en-US", dateFormat)
        this.reportText.bestDayBody = this.daySummaryString(weekData)

        // this.reportText.symptomInfo.body = this.symptomBoxBody(dailySummary)
        // this.reportText.mealInfo.body = this.infoBoxBody(dailySummary, "mealCount")
        // this.reportText.emotionInfo.body = this.infoBoxBody(dailySummary, "moodCount")
        // this.reportText.gipInfo.body = this.infoBoxBody(dailySummary, "gipTests")

        success(this.reportText)
      })
      .catch(err => console.log("Report error:", err.message));
  }
}