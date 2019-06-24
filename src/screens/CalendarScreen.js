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
import HeaderSaveButton from '../components/HeaderSaveButton';

export default class CalendarScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: LanguageManager.getInstance().getText("CALENDAR"),
    headerRight: <HeaderSaveButton type={2} onPress={() => navigation.state.params.onOkPressed()}/>
  });

  state = {
    initDate: Date.now(),
    selectedDate: Date.now()
  }

  componentDidMount() {        
    this.props.navigation.setParams({ 
        onOkPressed: this.resetDate.bind(this),
    })
  }

  resetDate() {
    this.onDateChange(this.state.initDate)
  }

  onDateChange(date) {
    if (this.state.selectedDate != date) {
      this.list.updateList(date)
      this.setState({selectedDate: date})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CeliCalendarPicker selectedDate={this.state.selectedDate} onDateChange={(date) => this.onDateChange(date)}/>
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