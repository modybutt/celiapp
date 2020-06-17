import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import AchievementManager from "../../../manager/buddyManager/AchievementManager";
import AchievementRecordManager from '../../../manager/buddyManager/AchievementRecordManager';
import EntryManager from "../../../manager/buddyManager/EntryManager";

//import BackToHomeScreenButton from '../BackToHomeScreenButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default class ChallengesTest extends Component{
    render(){
        return (
            <View style={styles.container}>
              <Button title="Add glutenfree breakfast - 15 Points" onPress={this.AddMealPress}></Button>
              <Button title="Add breakfast with gluten - 0 points" onPress={this.AddGlutenMealPress}></Button>
              <Button title="Add Symptom - 10 Points" onPress={this.AddCalendarPress}></Button>
              <Button title="Reset points" onPress={this.ResetPress}></Button>
              <Button title="Check Symptoms Added" onPress={this.CheckSymptomsAdded}></Button>
              <Button title="Add glutenfree breakfast yesterday" onPress={this.AddGlutenFreeBreakfastYesterday}></Button>
            </View>
          )
    }
    AddMealPress(){
     AchievementManager.triggerAchievement('MEALADDED');
     EntryManager.AddEntry('GLUTENFREEBREAKFAST');
    }
    AddCalendarPress(){
      AchievementManager.triggerAchievement('SYMPTOMADDED');
      AchievementRecordManager.increaseCountForAchievementRecord('SYMPTOMADDED');
    }
    ResetPress(){
      AsyncStorage.clear();
    }
    AddGlutenMealPress(){
      EntryManager.AddEntry('GLUTENBREAKFAST');
    }
    async CheckSymptomsAdded(){
      await AchievementRecordManager.getCountForAchievementRecord('SYMPTOMADDED');
    }
    AddGlutenFreeBreakfastYesterday(){
      AchievementManager.triggerAchievement('MEALADDED');
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate()-1);
      EntryManager.AddEntryWithFakeTime('GLUTENFREEBREAKFAST', yesterday);
    }
}
