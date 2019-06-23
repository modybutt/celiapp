import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import LanguageManager from "../manager/LanguageManager";

export default class CeliCalendarPicker extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={(date, type) => this.props.onDateChange(date)}
          selectedStartDate={this.props.selectedDate}
          weekdays={[LanguageManager.getInstance().getText("MON"),LanguageManager.getInstance().getText("TUE"),LanguageManager.getInstance().getText("WED"),LanguageManager.getInstance().getText("THU"),LanguageManager.getInstance().getText("FRI"),LanguageManager.getInstance().getText("SAT"),LanguageManager.getInstance().getText("SUN")]}
          months={[LanguageManager.getInstance().getText("JAN"), LanguageManager.getInstance().getText("FEB"), LanguageManager.getInstance().getText("MAR"), LanguageManager.getInstance().getText("APR"), LanguageManager.getInstance().getText("MAY"), LanguageManager.getInstance().getText("JUN"), LanguageManager.getInstance().getText("JUL"), LanguageManager.getInstance().getText("AUG"), LanguageManager.getInstance().getText("SEP"), LanguageManager.getInstance().getText("OCT"), LanguageManager.getInstance().getText("NOV"), LanguageManager.getInstance().getText("DEC")]}
          previousTitle={LanguageManager.getInstance().getText("PREVIOUS")}
          nextTitle={LanguageManager.getInstance().getText("NEXT")}
          startFromMonday={true}
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
