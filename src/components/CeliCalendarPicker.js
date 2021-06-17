import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import LanguageManager from "../manager/LanguageManager";
import DatabaseManager from '../manager/DatabaseManager';
import moment from 'moment';

const borderEntryColor = "#E91F64";
const selectedColor = "#E23873"; 

export default class CeliCalendarPicker extends React.Component {
    onfocus = () =>
    {
        this.setNumberofEventsPerDate();
    }

    state = {
        customDatesStyles: []
    }

    setNumberofEventsPerDate = () => {
        let customDatesStyles = [];
        DatabaseManager.getInstance().fetchEventsCount(
        (_, error) => {  alert(error)}, 
        (_, {rows: { _array }}) => {
            for (let i = 0; i < _array.length; i++)
            {
                let d = _array[i];
                const date = moment(d.day + '-' + d.month + '-' + d.year, 'DD-MM-YYYY');
               
                customDatesStyles.push({
                    date: date,
                    style: {
                        //backgroundColor: 'lightblue',

                        borderColor: borderEntryColor,
                        borderWidth: 2,                      
                    }, textStyle: { fontWeight: 'bold' }
                });
            }
            this.setState({customDatesStyles: customDatesStyles});
        });
    }

  render() {
	  const todaySelected = new Date(this.props.selectedDate).toDateString() === new Date().toDateString();
    return (
      <View style={styles.container}>
        <CalendarPicker
		  selectedDayColor={selectedColor}
		  selectedDayTextColor={'white'}
		  todayBackgroundColor={'white'}		  
		  todayTextStyle={{color: todaySelected ? 'white' : selectedColor, textDecorationLine: 'underline'}}
          maxDate= {new Date()}
          customDatesStyles= {this.state.customDatesStyles}
          onDateChange={(date, type) => {this.props.onDateChange(date);}}
          selectedStartDate={this.props.selectedDate}
          weekdays={[LanguageManager.getInstance().getText("MON"),LanguageManager.getInstance().getText("TUE"),LanguageManager.getInstance().getText("WED"),LanguageManager.getInstance().getText("THU"),LanguageManager.getInstance().getText("FRI"),LanguageManager.getInstance().getText("SAT"),LanguageManager.getInstance().getText("SUN")]}
          months={[LanguageManager.getInstance().getText("JAN"), LanguageManager.getInstance().getText("FEB"), LanguageManager.getInstance().getText("MAR"), LanguageManager.getInstance().getText("APR"), LanguageManager.getInstance().getText("MAY"), LanguageManager.getInstance().getText("JUN"), LanguageManager.getInstance().getText("JUL"), LanguageManager.getInstance().getText("AUG"), LanguageManager.getInstance().getText("SEP"), LanguageManager.getInstance().getText("OCT"), LanguageManager.getInstance().getText("NOV"), LanguageManager.getInstance().getText("DEC")]}
          previousTitle={"<"}
          nextTitle={">"}
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
