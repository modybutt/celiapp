import React from 'react';
import {View, Button, Text, Alert, StyleSheet} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";

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
      };

    render(){
        return(
            <View>
                <Text>Symptom occured: {new Date(this.state.selectedTime).getHours() + ":" + (new Date(this.state.selectedTime).getMinutes())}</Text>
                <Button title="SelectTime" onPress={this.showDateTimePicker} />
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
    scheissReact:{

    }
   });