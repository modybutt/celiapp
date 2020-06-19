import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AchievementRecordManager from '../../../manager/buddyManager/AchievementRecordManager';
//import BackToHomeScreenButton from '../BackToHomeScreenButton';
import { NavigationEvents } from 'react-navigation';


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
    static navigationOptions = ({ navigation }) => ({
      title: "Achievements",
    });
    state = {
      achievementrecords: null
    }

    async componentDidMount() {
      await this.updateAchievementRecords();
    }

    render(){
        if(this.state.achievementrecords == null){
          return (
            <View style={styles.container}>
              <Text>Loading...</Text>
            </View>
          )
        } else {
          return (
            <View style={styles.container}>
              <FlatList
                data={this.state.achievementrecords}
                renderItem={( {item} ) => <Item item={item} />}
                keyExtractor={item => item.id}
              />
            </View>
          )
        }

    }
    async updateAchievementRecords(){
      var achievementrecords = require('../../../config/achievementRecords.json').achievementrecords;
      var i = 0;
      while(i < achievementrecords.length){
        var count = await AchievementRecordManager.getCountForAchievementRecord(achievementrecords[i].id);
        achievementrecords[i].count = count;
        i += 1;
      }
      await this.setState({achievementrecords : achievementrecords});
      this.forceUpdate();
    }
}


