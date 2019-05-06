
import React from 'react';
import { ScrollView, View, Button, Alert, Text, StyleSheet} from 'react-native';
import SymptomGroup from '../components/SymptomTracker/SymptomGroup';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';
import SymptomTimePicker from '../components/SymptomTracker/SymptomTimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import DatabaseManager from '../brokers/DatabaseManager';

export default class SymptomTrackerScreen extends React.Component{
    static navigationOptions = {
        title: 'Add Symptom',
    };


    constructor(props) {
        super(props);
        this.noteEditedHandler = this.noteEditedHandler.bind(this);
        this.dateEditedHandler = this.dateEditedHandler.bind(this);
        this.timeEditedHandler = this.timeEditedHandler.bind(this);
        this.symptomSelectedIDsChangedHandler = this.symptomSelectedIDsChangedHandler.bind(this);
        this.state = {
            symptomEntryNote: "", //works correctly \o/
            selectedDateAndTime: new Date(), //doesnt work yet
            selectedSymptoms: [],
        } 
     }

     
    noteEditedHandler(note){
        this.setState({
            symptomEntryNote: note,
        });
    }

    dateEditedHandler(dateTime){
        Alert.alert("onDateEditedHandler called");
        // //Only update the date of the current selectedDateAndTime
        // let tmpDateTime = selectedDateAndTime
        // //TODO: Change date of 
        tmpDateTime.setDate(dateTime.getDate())
        tmpDateTime.setMonth(dateTime.getMonth())
        tmpDateTime.setYear(dateTime.getYear())

        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
    }


    timeEditedHandler(dateTime){
        Alert.alert("onTimeEditedHandler called");
        // //Only update the time of the current selectedDateAndTime

        let tmpDateTime = selectedDateAndTime
        tmpDateTime.setHours(dateTime.getHours())
        tmpDateTime.setMinutes(dateTime.getMinutes())
        //TODO: Change time of tmpDateTime

        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
    }

    symptomSelectedIDsChangedHandler(sympIDsAndSeverity){
        Alert.alert("symptomSelectedIDsChangedHandler called");
        this.setState({
            selectedSymptoms: sympIDsAndSeverity,
        })
    }



    render(){
        return(
            <ScrollView>
                <Text style={styles.headText}>SymptomTracker</Text>
                <HorizontalLineWithText text = "Date"/>
                <DayChooser date = {getTodayDate()} onDateChanged={this.dateEditedHandler}/>
                <HorizontalLineWithText text = "Time"/>
                <SymptomTimePicker onTimeChanged={this.timeEditedHandler}/>
                <HorizontalLineWithText text = "Symptoms"/>
                <SymptomGroup onSelectedSymptomIDsChanged={this.symptomSelectedIDsChangedHandler}/>
                <HorizontalLineWithText text = "Notes"/>
                <NoteEdit onTextChanged={this.noteEditedHandler}/>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    margin: 20,
                }}           
                >
                    <View>
                        <Button title = "OK" onPress={() => this.onOkPressed()}/>
                    </View>
                    <View>
                        <Button title = "Cancel" onPress={() => this.props.navigation.navigate('Home')}/>
                    </View>
                </View>
            </ScrollView>
        )
    }

    onOkPressed() {
        for (let symptom of this.state.selectedSymptoms)
        {
            DatabaseManager.getInstance().insertSymptom(symptom[0], symptom[1], this.state.symptomEntryNote, Date.now());
        }

        this.props.navigation.navigate('Home');
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