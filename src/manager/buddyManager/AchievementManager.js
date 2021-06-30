import { AsyncStorage } from "react-native";
import { showMessage } from "react-native-flash-message";
import Colors from "../../constants/Colors";
import loggingStore from "../buddyManager/LoggingStore";

export default class AchievementManager {
  static async triggerAchievement(achievementID) {
    //console.log("triggeredAchievement: ", achievementID)
    if (this.achievementsJson == undefined) {
      this.achievementsJson = require("../../config/achievements.json").achievements;
    }
    if (this.levelJson == undefined) {
      this.levelJson = require("../../config/levels.json").levels;
    }
    var achievement = this.achievementsJson.find(
      (element) => element.id == achievementID
    );
    if (achievement.type == "ONETIME") {
      var achieved = await AsyncStorage.getItem(achievement.id + "ACHIEVED");
      if (achieved == undefined || achieved == null) {
        await AsyncStorage.setItem(achievement.id + "ACHIEVED", "TRUE");
      } else {
        return;
      }
    }
    await this.increaseLevelPoints(achievement.points);
    var alertmsg = achievement.message + ": +" + achievement.points + " points";
    if (await this.checkLevelIncrease()) {
      var currentLevelName = await this.getCurrentLevelName();
      alertmsg += "\nReached level " + currentLevelName + "!";
    }
    if (achievement.type == "ONETIME") {
      await this.sendAchievementAlert(alertmsg, type="achievement", this.colorForID(achievement.id));
    } else {
      await this.sendAchievementAlert(alertmsg);
    }
  }

  //dirty: this does not only check the level, but also save it
  static async checkLevelIncrease() {
    let levelpoints = await this.getLevelPoints();
    let level = await this.getCurrentLevel();
    let levelName = await this.getCurrentLevelName();
    let oldlevel = level;
    let i = 0;
    while (i < this.levelJson.length) {
      if (levelpoints >= this.levelJson[i].points) {
        if (level < this.levelJson[i].level) {
          level = this.levelJson[i].level;
          levelName = this.levelJson[i].name;
          break; //i = this.levelJson.length;
        }
      }
      i++;
    }
    if (oldlevel < level) {
      await AsyncStorage.setItem("level", level.toString());
      await AsyncStorage.setItem("levelName", levelName);
      return true;
    } else {
      return false;
    }
  }

  static async getCurrentLevel() {
    var level = "1";
    level = await AsyncStorage.getItem("level");
    if (level == null || level == NaN) {
      await AsyncStorage.setItem("level", "1");
      level = "1";
    }
    //console.debug("DB: level ", level);
    return parseInt(level);
  }

  static async getCurrentLevelName() {
    var levelName = "1";
    levelName = await AsyncStorage.getItem("levelName");
    if (levelName == null) {
      levelName = "Novice";
      await AsyncStorage.setItem("levelName", levelName);
    }
    //console.debug("DB: level ", level);
    return levelName;
  }

  static async getNextLevelName() {
    let level = "1";
    level = await AsyncStorage.getItem("level");
    if (this.levelJson == undefined) {
      this.levelJson = require("../../config/levels.json").levels;
    }
    let levels = this.levelJson
    if (level > 0 && level < levels.length) {
      return levels[level].name;
    } else {
      return "";
    }
  }

  static async getLevelPoints() {
    var levelpoints = "0";
    levelpoints = await AsyncStorage.getItem("points");
    if (levelpoints == null || levelpoints == NaN) {
      await AsyncStorage.setItem("points", "0");
      levelpoints = "0";
    }
    //console.debug("DB: level points:", levelpoints);
    return parseInt(levelpoints);
  }

  static async increaseLevelPoints(increase) {
    var levelpoints = await this.getLevelPoints();
    levelpoints = levelpoints + increase;
    await AsyncStorage.setItem("points", levelpoints.toString());
  }

  static colorForID(id) {
      if (id ) {
        if (id.includes("MEAL")) {
          return Colors.meal
        } else if (id.includes("SYMPTOM")) {
          return Colors.symptom
        } else if (id.includes("GIP")) {
          return Colors.gip
        } else if (id.includes("ENERGY")) {
          return Colors.emotion
        }
      }
      return Colors.mainscreenColor
  }

  static sendAchievementAlert(text, type='entry', color=undefined) {
    if(loggingStore.gamificationFlag){

      let messageType = "success"
      let messageColor = ""
      let message = "Experience Points Earned!"

      if (type === "entry") {
        messageType = "success"
        messageColor = color ? color : "#5cb85c"
      } else if (type === "achievement") {
        messageType = "info"
        messageColor = color ? color: "#5bc0de"
        message = "New Achievement!"
      }

      showMessage({
        message: message,
        description: text,
        type: messageType,
        backgroundColor: messageColor
      });
    }
  }

  static async getCurrentLevelBounds() {
    let currentLevel = await this.getCurrentLevel();
    if (!currentLevel) {
      console.error("DB: getCurrentLevel() failed.");
      return;
    }

    if (this.levelJson == undefined) {
      this.levelJson = require("../../config/levels.json").levels;
    }

    let levels = this.levelJson

    if (currentLevel > 0 && currentLevel <= levels.length) {
      let lowerBound = levels[currentLevel-1].points
      let upperBound = -1;
      if (currentLevel >= levels.length) {
        upperBound = Number.MAX_SAFE_INTEGER;
      } else {
        upperBound = levels[currentLevel].points-1; //points form next level
      }
      //console.log("level " + currentLevel + " lower "  + lowerBound + " upper " + upperBound);
      return [lowerBound, upperBound];
    } else {
      console.log("#WARNING: No bounds for current level " + currentLevel);
      return [0,-1];
    }

   

    /*
    //bounds for level 1:
    if (currentLevel < 2 && temp[0].points && temp[0].level) {
      //console.debug("DB: lower: 0, upper: ", temp[0].points - 1);
      return [0, temp[0].points - 1];
    }
    // prevent errors in all other cases but level 1:
    if (
      !(
        temp[currentLevel - 1].level &&
        temp[currentLevel - 1].points &&
        temp[currentLevel - 2].level &&
        temp[currentLevel - 2].points
      )
    ) {
      console.error("DB: json file 'levels' is not valid!");
      return [0, -1];
    }
    // case: level >= 2:
    if (currentLevel) {
      // lower bound:
      var lower = temp[currentLevel - 2].points;
      // uppervbound
      var upper = temp[currentLevel - 1].points - 1;
      //console.debug("borders:", lower, upper);
      if (lower > upper){
        console.log("you have reached the MAX level! Update levels.json!")
        return [upper, upper];
      }
      return [lower, upper];
    }
    return [0, -1];
    */
  }
}
