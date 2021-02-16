import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import EntryList from "../components/EntryList"
import MenuButton from '../components/MenuButton';
import LanguageManager from '../manager/LanguageManager';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';

var count = 0
export default class ReportScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: LanguageManager.getInstance().getText("REPORT")
  });

  state = {
    initDate: Date.now(),
    selectedDate: Date.now()
  }

  componentDidMount() {
    this.props.navigation.setParams({
      
    });
    this.props.navigation.addListener('willFocus', () => {
      CeliLogger.addLog(this.props.navigation.state.routeName, Interactions.OPEN);
    });
  }

  getCurrentDate = () => {
    return this.state.selectedDate;
  }

  render() {
    return (
      <View style={styles.container}>
        <EntryList navigation={this.props.navigation} selectedDate={this.state.selectedDate} ref={list => this.list = list} />
        <MenuButton navigation={this.props.navigation} shareConfig={{
          onDateChanged: (onDatechangesListener) => { }
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