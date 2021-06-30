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
  static navigationOptions = ({ navigation }) => ({
    title: "ChallengesTest",
  });
    render(){
        return (
            <View style={styles.container}>
              <Button title="Add glutenfree breakfast - 15 Points" onPress={this.addMealPress}></Button>
              <Button title="Add breakfast with gluten - 0 points" onPress={this.addGlutenMealPress}></Button>
              <Button title="Add Symptom - 10 Points" onPress={this.addCalendarPress}></Button>
              <Button title="Reset points" onPress={this.resetPress}></Button>
              <Button title="Check Symptoms Added" onPress={this.checkSymptomsAdded}></Button>
              <Button title="Add glutenfree breakfast yesterday" onPress={this.addGlutenFreeBreakfastYesterday}></Button>
            </View>
          )
    }
    addMealPress(){
     AchievementManager.triggerAchievement('MEALADDED');
     EntryManager.addEntry('GLUTENFREEBREAKFAST');
    }
    addCalendarPress(){
      AchievementManager.triggerAchievement('SYMPTOMADDED');
      AchievementRecordManager.increaseCountForAchievementRecord('SYMPTOMADDED');
    }
    resetPress(){
      AsyncStorage.clear();
    }
    addGlutenMealPress(){
      EntryManager.addEntry('GLUTENBREAKFAST');
    }
    async checkSymptomsAdded(){
      await AchievementRecordManager.getCountForAchievementRecord('SYMPTOMADDED');
    }
    addGlutenFreeBreakfastYesterday(){
      AchievementManager.triggerAchievement('MEALADDED');
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate()-1);
      EntryManager.addEntryWithFakeTime('GLUTENFREEBREAKFAST', yesterday);
    }
}
