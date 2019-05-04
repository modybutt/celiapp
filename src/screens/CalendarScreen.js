import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import SymptomCalendarPicker from "../components/CalendarPicker";  
import EntryList from "../components/EntryList"
import MenuButton from '../components/MenuButton';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  state = {
    text: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calenderArea}>
          <SymptomCalendarPicker/>
        </View>
        <View style={styles.listArea}>
          <EntryList />
        </View>
        <MenuButton navigation={this.props.navigation}/>
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