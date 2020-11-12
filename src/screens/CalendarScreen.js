import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import CeliCalendarPicker from "../components/CeliCalendarPicker";
import EntryList from "../components/EntryList"
import MenuButton from '../components/MenuButton';
import LanguageManager from '../manager/LanguageManager';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';

var count = 0
export default class CalendarScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: LanguageManager.getInstance().getText("CALENDAR")
  });

  state = {
    initDate: Date.now(),
    selectedDate: Date.now()
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onOkPressed: this.resetDate.bind(this),
    });
    this.props.navigation.addListener('willFocus', () => {
      this.refs.celiCalendar.onfocus();
      CeliLogger.addLog(this.props.navigation.state.routeName, Interactions.OPEN);
    });
  }

  resetDate() {
    this.onDateChange(this.state.initDate)
  }

  onDateChange(date) {
    let d = new Date(date);
    d.setHours(new Date().getHours());
    d.setMinutes(new Date().getMinutes());
    if (this.state.selectedDate != date) {
      this.list.updateList(date);
      this.setState({ selectedDate: d });
      this.onDatechangesListener(d);
    }
  }

  getCurrentDate = () => {
    return this.state.selectedDate;
  }

  render() {
    return (
      <View style={styles.container}>
        <CeliCalendarPicker ref='celiCalendar' selectedDate={this.state.selectedDate} onDateChange={(date) => this.onDateChange(date)} />
        <EntryList navigation={this.props.navigation} selectedDate={this.state.selectedDate} ref={list => this.list = list} />
        <MenuButton navigation={this.props.navigation} shareConfig={{
          onDateChanged: (onDatechangesListener) => { this.onDatechangesListener = onDatechangesListener; }
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});