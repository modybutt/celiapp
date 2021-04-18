import WeeklyReportData from './WeeklyReportData';
import DateUtil from '../utils/dateUtils';
import DatabaseManager from '../manager/DatabaseManager'
import { Emotion } from '../constants/Events';

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
    if (count > 1) return "" + count + " symptoms";
    return "no symptoms";
  }

  static mealString = (count) => {
    if (count == 1) return "one meal";
    if (count > 1) return "" + count + " meals";
    return "no meals";
  }

  static moodString = (count) => {
    if (count == 1) return "one mood";
    if (count > 1) return "" + count + " moods";
    return "no moods";
  }

  static gipFreeString = (count) => {
    if (count == 1) return "a gluten-free test";
    if (count > 1) return "" + count + " gluten-free tests";
    return "";
  }

  static gipPositiveString = (count) => {
    if (count == 1) return "a gluten-positive test";
    if (count > 1) return "" + count + " gluten-positive tests";
    return "";
  }

  static gipString = (count) => {
    if (count == 1) return "a gluten test";
    if (count > 1) return "" + count + " gluten tests";
    return "no gluten tests";
  }

  static dayPluralString = (count) => {
    if (count == 1) return "one day";
    if (count > 1) return "" + count + " days";
    return "no day";
  }

  static daySummaryString = (weekData) => {
    return "You logged " +
      this.symptomString(weekData.bestDaySymptomCount()) + ", " +
      this.moodString(weekData.bestDayMoodCount()) + ", " +
      this.mealString(weekData.bestDayMealCount()) + ", " +
      this.gipFreeString(weekData.bestDayGipTests());
  }

  static infoBoxDefaultBodyText = (stringify, thisWeekCount, lastWeekCount) =>
    "You logged " + stringify(thisWeekCount) + " this week." +
    (lastWeekCount ? " That is " + this.differenceString(thisWeekCount, lastWeekCount) + " at this time last week!"
      : " This is your first week")

  static symptomBox = (thisWeek, lastWeek) => {
    //body = You logged N symptoms this week. That is x more/less than the previous week week
    this.reportText.symptomInfo.body = this.infoBoxDefaultBodyText(this.symptomString, thisWeek.thisWeekSymptomCount(), lastWeek ? lastWeek.thisWeekSymptomCount() : null)

    //Symptom free days:
    // head = X days you entered NO SYMPTOMS. Good job!

    var symptomFreeDays = thisWeek.thisWeekNumDaysWithNO_SYMPTOM();
    if (symptomFreeDays > 0) {
      this.reportText.symptomInfo.headline = this.dayPluralString(symptomFreeDays) + " you recorded as SYMPTOM FREE. Good job!"
      return;
    }

    var numberOfDaysWithSymptoms = thisWeek.thisWeekNumDaysWithSymptoms();

    if (numberOfDaysWithSymptoms <= 2) {
      this.reportText.symptomInfo.headline = "Most of the week you haven’t logged any symptoms.";
      this.reportText.symptomInfo.sub = "Did you know that you can also enter NO SYMPTOMS if you had none?";
      return;
    }

    var numberOfDaysWithMildSymptoms = thisWeek.thisWeekNumDaysWithMildAsWorstSymptoms();

    if (numberOfDaysWithMildSymptoms >= 1) {
      this.reportText.symptomInfo.headline =
        "" + this.dayPluralString(numberOfDaysWithSymptoms) + " you have felt symptoms, of which " +
        "" + this.dayPluralString(numberOfDaysWithMildSymptoms) + " they were only mild.";
      if (lastWeek) {
        this.reportText.symptomInfo.sub = "Keep it up and try to get more symptom FREE days!"
      }
      else {
        this.reportText.symptomInfo.sub = "First week: Let’s try to get symptom FREE days!"
      }

      return;
    }

    // sub =  More : Let’s get try to get a symptom FREE days again!
    //       Less:  Keep it up and try to get more symptom FREE days!
    //       First week: Let’s try to get a symptom FREE days!


    //symptoms3+days (some moderate)
    // head = 7 days you have felt symptoms, of which 3 days they were moderate.
    // sub =  Let’s try to do better next week!
    var numberOfDaysWithModerateSymptoms = thisWeek.thisWeekNumDaysWithModerateAsWorstSymptoms();

    if (numberOfDaysWithModerateSymptoms >= 1) {
      this.reportText.symptomInfo.headline =
        "" + this.dayPluralString(numberOfDaysWithSymptoms) + " you have felt symptoms, of which " +
        "" + this.dayPluralString(numberOfDaysWithModerateSymptoms) + " they were moderate.";

      this.reportText.symptomInfo.sub = "Let’s try to do better next week!"


      return;
    }

    // symptoms3+days (only severe)
    // 7 days you have felt symptoms, of which 7 days they were severe.
    // Let’s try to get less symptoms next week! 
    var numberOfDaysWithSevereSymptoms = thisWeek.thisWeekNumDaysWithSevereAsWorstSymptoms();

    if (numberOfDaysWithSevereSymptoms >= 1) {
      this.reportText.symptomInfo.headline =
        "" + this.dayPluralString(numberOfDaysWithSymptoms) + " you have felt symptoms, of which " +
        "" + this.dayPluralString(numberOfDaysWithSevereSymptoms) + " they were severe.";

      this.reportText.symptomInfo.sub = "Let’s try to do better next week!"


      return;
    }

  }

  static mealBox = (thisWeek, lastWeek) => {
    this.reportText.mealInfo.body = this.infoBoxDefaultBodyText(this.mealString, thisWeek.thisWeekMealCount(),lastWeek ? lastWeek.thisWeekMealCount() : null)
    
    glutenFreeCount = thisWeek.thisWeekGlutenFreeMealCount()

    mealHead = "" + glutenFreeCount + "logged meals were GLUTENFREE!"
    if(glutenFreeCount == 1)
      mealHead = "One logged meal was GLUTENFREE!"
    this.reportText.mealInfo.headline = mealHead
  }

  static emotionBox = (thisWeek, lastWeek) => {
      this.reportText.emotionInfo.body = this.infoBoxDefaultBodyText(this.moodString, thisWeek.thisWeekMoodCount(), lastWeek? lastWeek.thisWeekMoodCount(): null)
  
      highEnergyCount = thisWeek.numDaysHighEnergy()
      energyHead = ""+ this.dayPluralString(highEnergyCount)+ " you were had HIGH energy!"

      if(highEnergyCount=0){
        medEnergyCount = thisWeek.numDaysMediumEnergy()
        energyHead = ""+ this.dayPluralString(medEnergyCount)+ " you were had MEDIUM energy!"
      }

      this.reportText.mealInfo.headline = energyHead
  }

  static gipBox = (thisWeek, lastWeek) => {
        this.reportText.gipInfo.body = this.infoBoxDefaultBodyText(this.gipString, thisWeek.thisWeekGIPCount(), lastWeek ? lastWeek.thisWeekGIPCount(): null)
  }



  static differenceString = (thisWeekCount, lastWeekCount) => {

    if (thisWeekCount > lastWeekCount) return "" + (thisWeekCount - lastWeekCount) + " more than"
    if (thisWeekCount < lastWeekCount) return "" + (lastWeekCount - thisWeekCount) + " less than"
    return "the same as"
  }

  static async weeklyReport(success, now) {
    now = now || new Date()
    startDate = await DatabaseManager.getInstance().getDBCreatedDate();

    const startOfWeek = DateUtil.getStartOfPreviousFullWeekBeginningMonday(now);
    const endOfWeek = DateUtil.getEndOfPreviousFullWeekEndingSunday(now);

    const startOfPenultimateWeek = DateUtil.getStartOfPenultimateFullWeekBeginningMonday(now);
    const endOfPenultimateWeek = DateUtil.getEndOfPenultimateFullWeekEndingSunday(now);

    var thisWeekData = new WeeklyReportData(DatabaseManager.getInstance());
    var penultimateWeekData = new WeeklyReportData(DatabaseManager.getInstance());

    thisWeek = thisWeekData.init(startOfWeek, endOfWeek, new Date())
    penultimateWeek = penultimateWeekData.init(startOfPenultimateWeek, endOfPenultimateWeek, new Date())

    Promise.all([thisWeek, penultimateWeek])
      .then(_ => {
        if (startDate > startOfPenultimateWeek) { penultimateWeekData = null }

        this.reportText.dailyActivity = [0, 1, 2, 3, 4, 5, 6].map(day => thisWeekData.activityRateForDay(day))
        this.reportText.weekEndingDate = endOfWeek

        if (thisWeekData.bestDayDate()) {
          var dateFormat = { weekday: 'long', month: 'long', day: 'numeric' };
          this.reportText.bestDayHeading = thisWeekData.bestDayDate().toLocaleDateString("en-US", dateFormat)
          this.reportText.bestDayBody = this.daySummaryString(thisWeekData)
        }

        this.symptomBox(thisWeekData, penultimateWeekData);
        this.mealBox(thisWeekData, penultimateWeekData);
        this.emotionBox(thisWeekData, penultimateWeekData);
        this.gipBox(thisWeekData, penultimateWeekData);

        success(this.reportText)
      })
      .catch(err => console.log("Report error:", err.message));
  }
}