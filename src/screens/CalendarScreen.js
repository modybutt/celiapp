import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import SymptomCalendarPicker from "../components/SymptomCalendarPicker";  
import EntryList from "../components/EntryList"
import MenuButton from '../components/MenuButton';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  state = {
    selectedDate: Date.now()
  }

  onDateChange(date) {
    this.list.updateList(date)
    this.setState({selectedDate: date})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calenderArea}>
          <SymptomCalendarPicker selectedDate={this.state.selectedDate} onDateChange={(date) => this.onDateChange(date)}/>
        </View>
        <View style={styles.listArea}>
          <EntryList selectedDate={this.state.selectedDate} ref={list => this.list = list} />
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
    paddingTop: 15,
  },
});