import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, FlatList } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import AchievementManager from "../../../manager/buddyManager/AchievementManager";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CeliLogger from '../../../analytics/analyticsManager';
import Interactions from '../../../constants/Interactions';

//import BackToHomeScreenButton from '../BackToHomeScreenButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7ffe6',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  item: {
    padding: 10,
  },
  text: {
    fontSize: 20
  },
  icon: {
    fontSize: 30
  }

});
challenges = require('../../../config/achievements.json').achievements;
iconsource = require('../../../config/achievementRecords.json').achievementrecords;
function Item({ item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}><Icon name={item.icon} style={styles.icon}></Icon>		   {item.challengename} 	-	 {item.points}		points</Text>
    </View>
  )
}

export default class Challenges extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Challenges",
  });

  UNSAFE_componentWillMount() {
    CeliLogger.addLog("Challenges", Interactions.OPEN);
  }

  componentWillUnmount() {
    CeliLogger.addLog("Challenges", Interactions.CLOSE);
  }

  render() {
    var i = 0;
    while (i < challenges.length) {
      var icon = iconsource.find(element => element.id == challenges[i].id);
      if (icon == undefined) {
        challenges[i].icon = "restaurant";
      } else {
        challenges[i].icon = icon.icon;
      }
      i += 1;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={challenges}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.id}
        />

      </View>
    )
  }

}


