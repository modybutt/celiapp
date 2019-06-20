import React from 'react';
import {View, Button, Text, Alert, StyleSheet} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import LanguageManager from '../../manager/LanguageManager';

export default class SymptomTimePicker extends React.Component {


    constructor(props){
        super(props);
        this.state = {
          isDateTimePickerVisible: false,
          selectedTime: new Date()
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
     
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };
     
      handleDatePicked = choosenDate => {
        this.setState({selectedTime: choosenDate})
        this.hideDateTimePicker();
        this.props.onTimeChanged(choosenDate);
      };

    render(){
        return(
            <View>
              <View style={styles.rowContainer}>
                <Text style={styles.occuredText}>{LanguageManager.getInstance().getText("SYMPTOM_OCCURED")} {new Date(this.state.selectedTime).getHours() + ":" + (new Date(this.state.selectedTime).getMinutes())}</Text>
                <Button title={LanguageManager.getInstance().getText("SELECT_TIME")} onPress={this.showDateTimePicker} />
                </View>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                mode = {'time'}
               />
            </View>
        )
    }
}


var styles = StyleSheet.create({
    rowContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    occuredText:{
      fontSize: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
   });