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
      body: "You have not logged any GIP sticks",
      headline: "Logging GIP sticks will help you master your diet!",
      sub: "",
    },
    dailyActivity: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],

    bestDayHeading: "Unknown",
    bestDayBody: "Too little activity to calculate"

  }

  static symptomString = (count) => {
    if (count === 1) return "one symptom";
    if (count > 1) return "" + count + " symptoms";
    return "no symptoms";
  }

  static mealString = (count) => {
    if (count === 1) return "one meal";
    if (count > 1) return "" + count + " meals";
    return "no meals";
  }

  static moodString = (count) => {
    if (count === 1) return "one mood";
    if (count > 1) return "" + count + " moods";
    return "no moods";
  }

  static gipFreeString = (count) => {
    if (count === 1) return "a gluten-free test";
    if (count > 1) return "" + count + " gluten-free tests";
    return "";
  }

  static gipPositiveString = (count) => {
    if (count === 1) return "a gluten-positive test";
    if (count > 1) return "" + count + " gluten-positive tests";
    return "";
  }

  static gipString = (count) => {
    if (count === 1) return "a gluten test";
    if (count > 1) return "" + count + " gluten tests";
    return "no gluten tests";
  }

  static dayPluralString = (count) => {
    if (count === 1) return "one day";
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


  static reachedGoalString = (numDaysGoalReached) => {

    let goalString = ""
    
    if(numDaysGoalReached !=null){  //no goal defined
      goalString += numDaysGoalReached > 0 
        ? " On " + this.dayPluralString(numDaysGoalReached) + " you reached your daily goal." 
        : " Alas, no day did you reach your daily goal"
    }

    return goalString
  }

  static infoBoxDefaultBodyText = (stringify, thisWeekCount, lastWeekCount) =>
    "You logged " + stringify(thisWeekCount) + " this week." +
    (lastWeekCount ? " That is " + this.differenceString(thisWeekCount, lastWeekCount) + " at this time last week!"
      : " This is your first week")

  static mostOfTheWeek = 3  

  static symptomBox = (thisWeek, lastWeek) => {
    //body = You logged N symptoms this week. That is x more/less than the previous week week
    this.reportText.symptomInfo.body = this.infoBoxDefaultBodyText(this.symptomString, thisWeek.thisWeekSymptomCount(), lastWeek ? lastWeek.thisWeekSymptomCount() : null)

    this.reportText.symptomInfo.body += this.reachedGoalString(thisWeek.numDaysReachingSymptomGoal());

    //Symptom free days:
    // head = X days you entered NO SYMPTOMS. Good job!

    const symptomFreeDays = thisWeek.thisWeekNumDaysWithNO_SYMPTOM();
    if (symptomFreeDays > 0) {
      this.reportText.symptomInfo.headline = this.dayPluralString(symptomFreeDays) + " you recorded as SYMPTOM FREE. Good job!"
      return;
    }

    const numberOfDaysWithSymptoms = thisWeek.thisWeekNumDaysWithSymptoms();

    if (numberOfDaysWithSymptoms < this.mostOfTheWeek) {
      this.reportText.symptomInfo.headline = "Most of the week you haven’t logged any symptoms.";
      this.reportText.symptomInfo.sub = "Did you know that you can also enter NO SYMPTOMS if you had none?";
      return;
    }

    const numberOfDaysWithMildSymptoms = thisWeek.thisWeekNumDaysWithMildAsWorstSymptoms();

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
    const numberOfDaysWithModerateSymptoms = thisWeek.thisWeekNumDaysWithModerateAsWorstSymptoms();

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
    const numberOfDaysWithSevereSymptoms = thisWeek.thisWeekNumDaysWithSevereAsWorstSymptoms();

    if (numberOfDaysWithSevereSymptoms >= 1) {
      this.reportText.symptomInfo.headline =
        "" + this.dayPluralString(numberOfDaysWithSymptoms) + " you have felt symptoms, of which " +
        "" + this.dayPluralString(numberOfDaysWithSevereSymptoms) + " they were severe.";

      this.reportText.symptomInfo.sub = "Let’s try to do better next week!"

    }

  }

  static mealBox = (thisWeek, lastWeek) => {
    this.reportText.mealInfo.body = 
        this.infoBoxDefaultBodyText(this.mealString, thisWeek.thisWeekMealCount(),lastWeek ? lastWeek.thisWeekMealCount() : null)
      + this.reachedGoalString(thisWeek.numDaysReachingMealGoal());

    const glutenFreeCount = thisWeek.thisWeekGlutenFreeMealCount()

    let mealHead = "" + glutenFreeCount + "logged meals were GLUTENFREE!"
    if(glutenFreeCount === 1)
      mealHead = "One logged meal was GLUTENFREE!"
    this.reportText.mealInfo.headline = mealHead
  }

  static emotionBox = (thisWeek, lastWeek) => {
      this.reportText.emotionInfo.body = 
        this.infoBoxDefaultBodyText(this.moodString, thisWeek.thisWeekMoodCount(), lastWeek? lastWeek.thisWeekMoodCount(): null)
        + this.reachedGoalString(thisWeek.numDaysReachingEmotionGoal());

      const highEnergyCount = thisWeek.numDaysHighEnergy()
      let energyHead = ""+ this.dayPluralString(highEnergyCount)+ " you were had HIGH energy!"

      if(highEnergyCount === 0){
        const medEnergyCount = thisWeek.numDaysMediumEnergy()
        energyHead = ""+ this.dayPluralString(medEnergyCount)+ " you were had MEDIUM energy!"
      }

      this.reportText.mealInfo.headline = energyHead
  }

  static gipBox = (thisWeek, lastWeek) => {
        const gipCount = thisWeek.thisWeekGIPCount();
        if(gipCount === 0){
          this.reportText.gipInfo.body = "You have not logged any GIP sticks"
          this.reportText.gipInfo.headline = "Logging GIP sticks will help you master your diet!"
        }
        else if(gipCount < this.mostOfTheWeek){
          this.reportText.gipInfo.body = "Most of the week you haven't logged any GIP sticks"
          this.reportText.gipInfo.headline = "Knowledge is power!";

        }
        else{
          this.reportText.gipInfo.body = 
            this.infoBoxDefaultBodyText(this.gipString, gipCount, lastWeek ? lastWeek.thisWeekGIPCount(): null)
            + this.reachedGoalString(thisWeek.numDaysReachingGIPGoal());

          if(thisWeek.numGIPGlutenFree() === gipCount)
            this.reportText.gipInfo.headline = "All tests were GLUTENFREE!"
        }
  } 



  static differenceString = (thisWeekCount, lastWeekCount) => {

    if (thisWeekCount > lastWeekCount) return "" + (thisWeekCount - lastWeekCount) + " more than"
    if (thisWeekCount < lastWeekCount) return "" + (lastWeekCount - thisWeekCount) + " less than"
    return "the same as"
  }

  static beforeFirstWeekReport = () => {
    this.reportText.symptomInfo.headline = ""
    this.reportText.symptomInfo.sub = ""
    this.reportText.symptomInfo.body = ""
    this.reportText.mealInfo.headline = ""
    this.reportText.mealInfo.sub = ""
    this.reportText.mealInfo.body = ""
    this.reportText.emotionInfo.headline = ""
    this.reportText.emotionInfo.sub = ""
    this.reportText.emotionInfo.body = ""
    this.reportText.gipInfo.headline = ""
    this.reportText.gipInfo.sub = ""
    this.reportText.gipInfo.body = ""
    this.reportText.bestDayHeading = "Your first weekly report will appear here on Monday"

  }

  static reportTitle = (endOfWeek) => {
    const dateFormat = { weekday: 'long', month: 'long', day: 'numeric' };
    return "Report for week ending "
      + endOfWeek.toLocaleDateString("en-US", dateFormat)
  }

  static async weeklyReport(success, now, str) {
    console.log("generating report for ", str, now && now.toDateString())
    now = now || new Date()
    const getDbStartDate =  DatabaseManager.getInstance().getDBCreatedDate();
    const startOfWeek = DateUtil.getStartOfThisWeekBeginningMonday(now);

    const endOfWeek = DateUtil.getEndOfThisFullWeekEndingSunday(now);

    const startOfPenultimateWeek = DateUtil.getStartOfPreviousFullWeekBeginningMonday(now);
    const endOfPenultimateWeek = DateUtil.getEndOfPreviousFullWeekEndingSunday(now);

    let thisWeekData = new WeeklyReportData(DatabaseManager.getInstance());
    let penultimateWeekData = new WeeklyReportData(DatabaseManager.getInstance());

    let thisWeek = thisWeekData.init(startOfWeek, endOfWeek, new Date())
    let penultimateWeek = penultimateWeekData.init(startOfPenultimateWeek, endOfPenultimateWeek, new Date())

    console.log("before promise ==============================================================")

    Promise.all([getDbStartDate, thisWeek, penultimateWeek])
      .then(([dbStartDate, _, __]) => {
        console.log("after promise")
        
        thisWeekData.calcBestDay()
        penultimateWeekData.calcBestDay()

        this.reportText.title = this.reportTitle(endOfWeek)

        if (dbStartDate > startOfPenultimateWeek) { penultimateWeekData = null }

        this.reportText.previousReportExists = true
        if(dbStartDate > endOfWeek){
          this.beforeFirstWeekReport()
          this.reportText.previousReportExists = false
          success(this.reportText)
          return;
        }

        let endOfFollowingWeek = new Date(endOfWeek)
        endOfFollowingWeek.setDate(endOfFollowingWeek.getDate()+7)
        
        this.reportText.followingReportExists = endOfFollowingWeek < new Date(Date.now())

        this.reportText.dailyActivity = [0, 1, 2, 3, 4, 5, 6].map(day => thisWeekData.activityRateForDay(day))
        this.reportText.weekEndingDate = endOfWeek
        this.reportText.startOfWeek = startOfWeek

        this.reportText.bestDayHeading = "Unknown"
        this.reportText.bestDayBody = "Too little activity to calculate"
        if (thisWeekData.bestDayDate()) {
          const dateFormat = { weekday: 'long', month: 'long', day: 'numeric' };
          this.reportText.bestDayHeading = thisWeekData.bestDayDate().toLocaleDateString("en-US", dateFormat)
          this.reportText.bestDayBody = this.daySummaryString(thisWeekData)
        }

        this.symptomBox(thisWeekData, penultimateWeekData);
        this.mealBox(thisWeekData, penultimateWeekData);
        this.emotionBox(thisWeekData, penultimateWeekData);
        this.gipBox(thisWeekData, penultimateWeekData);

        console.log("before success")
        success(this.reportText)
      })
      .catch(err => console.log("Report error:", err.message));
  }
}