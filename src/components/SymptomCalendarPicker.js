import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class SymptomCalendarPicker extends React.Component {
  render() {
    //const { selectedStartDate } = this.state;
    //const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    //const maxDate = new Date(2030,1,1);
    //const minDate = new Date(2019,1,1);

    return (
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={(date, type) => this.props.onDateChange(date)}
          //minDate={minDate}
          //maxDate={maxDate}
          selectedStartDate={this.props.selectedDate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -20,
  },
});
