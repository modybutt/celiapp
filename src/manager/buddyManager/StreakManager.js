import {AsyncStorage} from 'react-native';
import AchievementManager from './AchievementManager';


export default class StreakManager{

    static async checkStreak(id){
        var streakjson = require("../../config/streaks.json");
        var streak = streakjson.streaks.find(element=>element.id == id);
        var lastadded = await AsyncStorage.getItem("LastEntry" + streak.entryid);
        var currdate = new Date();
        var lastaddeddate = new Date(lastadded);
        switch (streak.timetype) {
            case "DAY":
                if(dateDiffInDays(currdate, lastaddeddate) < 2){
                    await this.increaseStreak(streak.id);
                }
        }
        var streaknumber = await this.getStreakNumber(streak.id);
        var streakinterval = streak.interval;
        if(streaknumber != 0 && streaknumber % streakinterval == 0){
            await AchievementManager.increaseLevelPoints(streak.pointmultiplier * streaknumber);
            var levelincrease = await AchievementManager.checkLevelIncrease();
            var alertmsg = streak.name.replace("%n%", streaknumber.toString())
            if(levelincrease){
                var level = await AchievementManager.getCurrentLevel();
                alertmsg += "\nReached Level " + level.toString() + "!";
            }
            AchievementManager.sendAchievementAlert(alertmsg);
        }
    }

    static async getStreakNumber(id){
        var streaknumber = await AsyncStorage.getItem(id);
        if(streaknumber == undefined || streaknumber == null){
            await AsyncStorage.setItem(id, "0");
            return 0;
        }
        return parseInt(streaknumber);
    }

    static async increaseStreak(id){
        var newstreak = (await this.getStreakNumber(id)) + 1;
        await AsyncStorage.setItem(id, newstreak.toString());

    }

}
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }