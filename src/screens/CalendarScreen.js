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
import LanguageManager from '../manager/LanguageManager';

export default class CalendarScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: LanguageManager.getInstance().getText("CALENDAR"),
  });

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
        <SymptomCalendarPicker selectedDate={this.state.selectedDate} onDateChange={(date) => this.onDateChange(date)}/>
        <EntryList navigation={this.props.navigation} selectedDate={this.state.selectedDate} ref={list => this.list = list} />
        <MenuButton navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});