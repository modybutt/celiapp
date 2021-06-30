import {AsyncStorage} from 'react-native';
import AchievementManager from './AchievementManager';


export default class AchievementRecordManager{
    static async getCountForAchievementRecord(id){
        let count = await AsyncStorage.getItem(id + "count");
        if( count == null ){
            AsyncStorage.setItem(id + "count", "0");
            count = 0
        }
        return parseInt(count);
    }

    static async increaseCountForAchievementRecord(id){
        let achcount = await this.getCountForAchievementRecord(id);
        achcount = achcount + 1;
        await AsyncStorage.setItem(id + "count", achcount.toString());

        if (this.achievementRecords === undefined) {
            this.achievementRecords = require("../../config/achievementRecords.json").achievementRecords;
        }

        let achievementRecord = this.achievementRecords.find(element=>element.id == id);
        if (achievementRecord === undefined) {
            //console.log("#WARNING: no achievementRecord found for ID ", id);
            return;
        }
        let recordType = achievementRecord.recordType;
        this.checkAchievements(recordType, achcount);

    }

    static async increaseCountForAchievementRecordByType(type){
        if (this.achievementRecords === undefined) {
            this.achievementRecords = require("../../config/achievementRecords.json").achievementRecords;
        }
        let achievementRecord = this.achievementRecords.find(element=>element.recordType == type)
        await this.increaseCountForAchievementRecord(achievementRecord.id);
    }

    static async checkAchievements(id, count){
        //console.log("checkAchievement : ", id, count);
        
        if (id === "MEALADDED") {
            if (count === 10) {
                this.triggerAchievementDelayed("10MEALSADDED");
            } else if (count === 20) {
                this.triggerAchievementDelayed("20MEALSADDED");
            } else if (count === 50) {
                this.triggerAchievementDelayed("50MEALSADDED");
            } else if (count === 100) {
                this.triggerAchievementDelayed("100MEALSADDED");
            }
        } else if (id === "SYMPTOMADDED") {
            if (count === 10) {
                this.triggerAchievementDelayed("10SYMPTOMSADDED");
            } else if (count === 20) {
                this.triggerAchievementDelayed("20SYMPTOMSADDED");
            } else if (count === 50) {
                this.triggerAchievementDelayed("50SYMPTOMSADDED");
            } else if (count === 100) {
                this.triggerAchievementDelayed("100SYMPTOMSADDED");
            }
        } else if (id === "ENERGYADDED") {
            if (count === 10) {
                this.triggerAchievementDelayed("10ENERGYADDED");
            } else if (count === 20) {
                this.triggerAchievementDelayed("20ENERGYADDED");
            } else if (count === 50) {
                this.triggerAchievementDelayed("50ENERGYADDED");
            } else if (count === 100) {
                this.triggerAchievementDelayed("100ENERGYADDED");
            }
        } else if (id === "GIPADDED") {
            if (count === 3) {
                this.triggerAchievementDelayed("3GIPSADDED");
            } else if (count === 5) {
                this.triggerAchievementDelayed("5GRIPSADDED");
            } else if (count === 10) {
                this.triggerAchievementDelayed("10GIPSADDED");
            }
        } else if(id === "QUESTIONRIGHT") {
            if (count === 5) {
                this.triggerAchievementDelayed("5QUESTIONSRIGHT",1000); //only delay these for 1 second, as there are no regular points messags shown
            } else if (count === 10) {
                this.triggerAchievementDelayed("10QUESTIONSRIGHT",1000);
            } else if (count === 20) {
                this.triggerAchievementDelayed("20QUESTIONSRIGHT",1000);
            } else if (count === 30) {
                this.triggerAchievementDelayed("30QUESTIONSRIGHT",1000);
            }
        } 
    }

    static async triggerAchievementDelayed(achievement, delay=5000){
        //delayed call to show achievement for a couple of seconds, as there are usually point messages shown first.
        setTimeout(()=>{AchievementManager.triggerAchievement(achievement)}, delay); 
    }
}