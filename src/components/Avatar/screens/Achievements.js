import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AchievementRecordManager from '../manager/AchievementRecordManager';
//import BackToHomeScreenButton from '../BackToHomeScreenButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1dfed',
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


function Item( {item} ){
  return (
    <View style={styles.item}>
      <Text style={styles.text}><Icon name={item.icon} style={styles.icon}></Icon>  {item.count} {item.name}</Text>
    </View>
  )
}

export default class Achievements extends Component{
    
    async GetAchievementRecordData(achievementrecords){

    }

    constructor(props){
      super(props);
      var achievementrecords = require('../config/achievementRecords.json').achievementrecords;
      var i = 0;
      while(i < achievementrecords.length){
        achievementrecords[i].count = 0;
        i += 1;
      }

      this.state = {achievementrecords: achievementrecords};
    }
    render(){
        const achievementrecords = this.state.achievementrecords;
        return (
            <View style={styles.container}>
              <FlatList
                data={ achievementrecords }
                renderItem={( {item} ) => <Item item={item} />}
                keyExtractor={item => item.id}
              />
            </View>
          )
    }
    
    componentDidMount(){
      this.updateAchievementRecords();
    }
    async componentDidUpdate(){

    }
       async updateAchievementRecords(){
      var achievementrecords = require('../config/achievementRecords.json').achievementrecords;
      var i = 0;
      while(i < achievementrecords.length){
        var count = await AchievementRecordManager.getCountForAchievementRecord(this.state.achievementrecords[i].id);
        achievementrecords[i].count = count;
        i += 1;
      }
      this.setState({achievementrecords : achievementrecords});
    }
}


