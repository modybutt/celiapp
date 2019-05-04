
import React from 'react';
import {Icon, View, Alert, Button, Text, StyleSheet} from 'react-native';
import SymptomGroup from '../components/SymptomTracker/SymptomGroup';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';
import HorizontalLine from '../components/HorizontalLine';
import SymptomTimePicker from '../components/SymptomTimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';

export default class SymptomTrackerScreen extends React.Component{
    static navigationOptions = {
        title: 'Add Symptom',
    };

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
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    margin: 20,
                }}           
                >
                    <View>
                        <Button title = "OK" onPress={() => this.props.navigation.navigate('Home')}/>
                    </View>
                    <View>
                        <Button title = "Cancel" onPress={() => this.props.navigation.navigate('Home')}/>
                    </View>
                </View>
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