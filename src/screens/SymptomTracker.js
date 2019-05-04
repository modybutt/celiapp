
import React from 'react';
import {Icon, View, Text, StyleSheet} from 'react-native';
import SymptomGroup from '../components/SymptomTracker/SymptomGroup';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';
import HorizontalLine from '../components/HorizontalLine';
import SymptomTimePicker from '../components/SymptomTimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';

export default class SymptomTracker extends React.Component{
    render(){
        return(
            <View>
                <Text style={styles.headText}>SymptomTracker</Text>
                <HorizontalLineWithText text = "Date"/>
                <DayChooser date = {getTodayDate()}/>
                <HorizontalLineWithText text = "Time"/>
                <SymptomTimePicker/>
                <HorizontalLineWithText text = "Symptoms"/>
                <SymptomGroup/>
                <HorizontalLineWithText text = "Notes"/>
                <NoteEdit/>
            </View>
        )
    }
}

function getTodayDate(){
    return new Date()
}
  

var styles = StyleSheet.create({
 headText:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10
 }
});