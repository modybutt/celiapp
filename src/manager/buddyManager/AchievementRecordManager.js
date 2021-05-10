import {AsyncStorage} from 'react-native';
import AchievementManager from './AchievementManager';


export default class AchievementRecordManager{
    static async getCountForAchievementRecord(id){
        var count = await AsyncStorage.getItem(id + "count");
        if( count == null ){
            AsyncStorage.setItem(id + "count", "0");
            count = 0
        }
        return parseInt(count);
    }

    static async increaseCountForAchievementRecord(id){
        var achcount = await this.getCountForAchievementRecord(id);
        achcount = achcount + 1;
        await AsyncStorage.setItem(id + "count", achcount.toString());
        var recordtype = require("../../config/achievementRecords.json").achievementrecords.find(element=>element.id == id).recordtype;
        this.checkAchievements(recordtype, achcount);

    }

    static async increaseCountForAchievementRecordByType(type){
        var achievementrecord = require("../../config/achievementRecords.json");
        this.increaseCountForAchievementRecord(achievementrecord.achievementrecords.find(element=>element.recordtype == type).id);
    }

    static async checkAchievements(id, count){
        // 10MEALSADDED Achievement
        if(id == "MEAL" && count >= 10){
            AchievementManager.triggerAchievement("10MEALSADDED");
        }
    }
}