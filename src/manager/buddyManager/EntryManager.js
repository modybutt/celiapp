import {AsyncStorage} from "react-native";
import AchievementRecordManager from "./AchievementRecordManager";
import StreakManager from "./StreakManager";


export default class EntryManager{
    static async AddEntry(id){
        //new Date = Timestamp mit aktuellem Datum und Zeit
        var currdate = new Date();
        var entry = require("../../config/entries.json").entries.find(element=>element.id == id);
        await AsyncStorage.setItem("LastEntry", currdate.toString());
        await AsyncStorage.setItem("LastEntry" + id, currdate.toString());
        //alert('Meal added @ ' + currdate.toString());
        await AchievementRecordManager.increaseCountForAchievementRecordByType(entry.type);
        var streak = require("../../config/streaks.json").streaks.find(element=>element.entryid == id);
        await StreakManager.checkStreak(streak.id);
    }

    static async AddEntryWithFakeTime(id, date){
        var currdate = date;
        var entry = require("../../config/entries.json").entries.find(element=>element.id == id);
        await AsyncStorage.setItem("LastEntry", currdate.toString());
        await AsyncStorage.setItem("LastEntry" + id, currdate.toString());
        //alert('Meal added @ ' + currdate.toString());
        await AchievementRecordManager.increaseCountForAchievementRecordByType(entry.type);
        var streak = require("../../config/streaks.json").streaks.find(element => element.entryid == id);
        await StreakManager.checkStreak(streak.id);
    }
}