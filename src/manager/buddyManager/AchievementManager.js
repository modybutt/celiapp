import { AsyncStorage } from "react-native";
import { showMessage } from "react-native-flash-message";

export default class AchievementManager {
  static async triggerAchievement(achievementID) {
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
    var alertmsg = achievement.message + " - " + achievement.points + " points";
    if (await this.checkLevelIncrease()) {
      var currentlevel = await this.getCurrentLevel();
      alertmsg += "\nReached level " + currentlevel.toString() + "!";
    }
    await this.sendAchievementAlert(alertmsg);
  }
  static async checkLevelIncrease() {
    var levelpoints = await this.getLevelPoints();
    var level = await this.getCurrentLevel();
    var oldlevel = level;
    var i = 0;
    while (i < this.levelJson.length) {
      if (levelpoints <= this.levelJson[i].points - 1) {
        if (level < this.levelJson[i].level) {
          level = this.levelJson[i].level - 1;
          i = this.levelJson.length;
        }
      }
      i++;
    }
    if (oldlevel < level) {
      await AsyncStorage.setItem("level", level.toString());
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

  static sendAchievementAlert(text) {
    showMessage({
      message: "Achievement earned!",
      description: text,
      type: "success"
    });
  }

  static async getCurrentLevelBounds() {
    var currentLevel = await this.getCurrentLevel();
    if (!currentLevel) {
      console.error("DB: getCurrentLevel() failed.");
      return;
    }

    var temp = require("../../config/levels.json").levels;

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
      console.debug("borders:", lower, upper);
      if (lower > upper){
        console.log("you have reached the MAX level! Update levels.json!")
        return [upper, upper];
      }
      return [lower, upper];
    }
    return [0, -1];
  }
}
