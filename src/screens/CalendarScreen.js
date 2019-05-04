import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import SymptomCalendarPicker from "../components/CalendarPicker";  
import EntryList from "../components/EntryList"

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  state = {
    text: null
  };

  componentDidUpdate() {
    alert("FOO")
  }

  render() {
    
    return (
      <View style={styles.container}>
      <NavigationEvents
        onWillFocus={payload => console.log('will focus',payload)}
        onDidFocus={payload => console.log('did focus',payload)}
        onWillBlur={payload => console.log('will blur',payload)}
        onDidBlur={payload => console.log('did blur',payload)}
      />
        <View style={styles.calenderArea}>
          <SymptomCalendarPicker/>
        </View>
        <View style={styles.listArea}>
          <EntryList />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems:'stretch',
    justifyContent:'flex-start',
    flexDirection: 'column',
  },
  listArea: {
    backgroundColor: 'white',
    flex: 2,
    paddingTop: 10,
	
  },
  calenderArea: {
    backgroundColor: 'white',
    flex: 3,
    //paddingTop: 10,
  },
});