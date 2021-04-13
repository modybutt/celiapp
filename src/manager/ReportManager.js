import WeeklyReportData from './WeeklyReportData';
import DateUtil from '../utils/dateUtils';
import DatabaseManager from '../manager/DatabaseManager'

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
    bestDayBody: "Too little activity to calculate"

  }

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

  static gipString = (count) => {
      if (count == 1) return "a gluten test";
      if (count >  1) return "" + count + "gluten tests";
      return "no gluten tests";
  }

  static daySummaryString = (weekData) => {
    return "You logged " +
      this.symptomString(weekData.bestDaySymptomCount()) + ", " +
      this.moodString(weekData.bestDayMoodCount()) + ", " +
      this.mealString(weekData.bestDayMealCount()) + ", " +
      this.gipFreeString(weekData.bestDayGipTests());
  }

  static infoBoxBody = ( stringify , thisWeekCount, lastWeekCount) =>
    "You logged " + stringify(thisWeekCount) + " this week. That is " + this.differenceString(thisWeekCount, lastWeekCount) +" at this time last week!"
    
  static differenceString = (thisWeekCount, lastWeekCount) => {
    //console.log("this week: "+thisWeekCount)
    //console.log("prev week: "+lastWeekCount)
    
    if (thisWeekCount > lastWeekCount) return "" + (thisWeekCount - lastWeekCount) + " more than"
    if (thisWeekCount < lastWeekCount) return "" + (lastWeekCount - thisWeekCount) + " less than"
    return "the same as"
  }
  
  static weeklyReport(success) {

    const startOfWeek = DateUtil.getStartOfPreviousFullWeekBeginningMonday();
    const endOfWeek = DateUtil.getEndOfPreviousFullWeekEndingSunday();

    //console.log("startofweek", startOfWeek)
    //console.log("endtofweek", endOfWeek)
    
    const startOfWeekAsDaysAgo = DateUtil.dateAsDaysAgo(startOfWeek)
    //console.log("startOfWeekAsDaysAgo", startOfWeekAsDaysAgo)
    
    const weekData = new WeeklyReportData(DatabaseManager.getInstance());

    var a= weekData.init(startOfWeek, endOfWeek, new Date())
    
    a.then( _ => {
        //console.log("Data processed ok", weekData)
        this.reportText.dailyActivity = [0,1,2,3,4,5,6].map(day => weekData.activityRateForDay(day))
        this.reportText.weekEndingDate = endOfWeek

        if(weekData.bestDayDate()){
          var dateFormat = { weekday: 'long', month: 'long', day: 'numeric' };
          this.reportText.bestDayHeading = weekData.bestDayDate().toLocaleDateString("en-US", dateFormat)
          this.reportText.bestDayBody = this.daySummaryString(weekData)
        }
        
        this.reportText.symptomInfo.body = this.infoBoxBody(this.symptomString, weekData.thisWeekSymptomCount(), weekData.previousPartialWeekSymptomCount())
        this.reportText.mealInfo.body = this.infoBoxBody(this.mealString, weekData.thisWeekMealCount(), weekData.previousPartialWeekMealCount())
        this.reportText.emotionInfo.body = this.infoBoxBody(this.moodString, weekData.thisWeekMoodCount(), weekData.previousPartialWeekMoodCount())
        this.reportText.gipInfo.body = this.infoBoxBody(this.gipString, weekData.thisWeekGIPCount(), weekData.previousPartialWeekGIPCount())

        success(this.reportText)
      })
      .catch(err => console.log("Report error:", err.message));
  }
}