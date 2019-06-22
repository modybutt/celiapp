import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class SymptomCalendarPicker extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={(date, type) => this.props.onDateChange(date)}
          selectedStartDate={this.props.selectedDate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: '#FFFFFF',
    //marginTop: -20,
  },
});
