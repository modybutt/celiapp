import React from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import LanguageManager from '../manager/LanguageManager';

export default class DayPicker extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      selectedDate: props.dateAndTime || new Date()
    }
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = choosenDate => {
    this.setState({ selectedDate: choosenDate })
    this.hideDateTimePicker();
    this.props.onDateChanged(choosenDate);
  };

  componentDidUpdate(prevProps) {
    if(this.props.dateAndTime !== prevProps.dateAndTime ) {
      this.setState({selectedDate: this.props.dateAndTime});
    }
  }

  render() {
    const hourString = (new Date(this.state.selectedDate).getHours() > 9) ? new Date(this.state.selectedDate).getHours() : "0" + new Date(this.state.selectedDate).getHours()
    const minuteString = (new Date(this.state.selectedDate).getMinutes() > 9) ? new Date(this.state.selectedDate).getMinutes() : "0" + new Date(this.state.selectedDate).getMinutes()
    const newDateString = new Date(this.state.selectedDate).getDate() + "." + (new Date(this.state.selectedDate).getMonth()+1) + "." + new Date(this.state.selectedDate).getFullYear()
        

    return (
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.occuredText} onPress={this.showDateTimePicker} >{newDateString}</Text>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={'date'}
        />
      </View>
    )
  }
}
/*<View style={styles.rowContainer}>
  <Text style={styles.occuredText} onPress={this.showDateTimePicker} >{LanguageManager.getInstance().getText(this.props.textString)} {hourString + ":" + minuteString}</Text>
  <Button title={LanguageManager.getInstance().getText("SELECT_TIME")} onPress={this.showDateTimePicker} />
</View>*/

var styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  occuredText: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#3398DE'
  }
});