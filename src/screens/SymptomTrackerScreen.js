
import React from 'react';
import { ScrollView, TouchableOpacity, View, Button, Alert, Text, StyleSheet} from 'react-native';
import SymptomGroup from '../components/SymptomTracker/SymptomGroup';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';
import SymptomTimePicker from '../components/SymptomTracker/SymptomTimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import DatabaseManager from '../persistance/DatabaseManager';
import Dialog from "react-native-dialog";


export default class SymptomTrackerScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        headerRight: <Button title="SAVE" onPress={() => navigation.state.params.onOkPressed()}/>
    })

    constructor(props) {
        super(props);
        this.noteEditedHandler = this.noteEditedHandler.bind(this);
        this.dateEditedHandler = this.dateEditedHandler.bind(this);
        this.timeEditedHandler = this.timeEditedHandler.bind(this);
        this.symptomSelectedIDsChangedHandler = this.symptomSelectedIDsChangedHandler.bind(this);
        this.state = {
            symptomEntryNote: "", //works correctly \o/
            tempDate: new Date(), //used to temporarliy save date and then set it to selectedDateAndTime after corresponding checks
            selectedDateAndTime: new Date(), //works correctly \o/
            selectedSymptoms: [], //bit buggy when deleting existing symptoms from list
            dayChangeDialogVisible: false,
            resetSymptomGroup: false,
        } 
     }

     clearNoteText = () => {
         this.setState({
             symptomEntryNote: ""
         })
        this._noteEdit.deleteNote();
      }


      clearSymptomGroup = () =>{
        this.setState({
            selectedSymptoms: []
        })
        this._symptomGroup.deleteSymptoms();
      }

    componentDidMount() {
        this.props.navigation.setParams({ onOkPressed: this.testSave.bind(this) })
    }

    testSave() {
        alert("Test")
    }

    noteEditedHandler(note){
        this.setState({
            selectedSymptoms: []
        })
        this._symptomGroup.deleteSymptoms();
      }


      setBackDayChooserOneDay = () =>{
        this._dayChooser.changeDay(false);
      }


     showDayChangeSaveDialog = () => {
        this.setState({ dayChangeDialogVisible: true });
      };
     
      handleDayChangeCancel = () => {
          //do nothing, dont change date
          this.setBackDayChooserOneDay()
        this.setState({ dayChangeDialogVisible: false });
      };
     
      handleDayChangeSave = () => {
        //Save Data and go on to next date

        //Alert.alert("onDateEditedHandler called");
        // //Only update the date of the current selectedDateAndTime
        let tmpDateTime = this.state.selectedDateAndTime
        // //TODO: Change date of 
        tmpDateTime.setDate(this.state.tempDate.getDate())
        tmpDateTime.setMonth(this.state.tempDate.getMonth())
        tmpDateTime.setYear(this.state.tempDate.getYear())

        this.saveCurrentData(false)


        //delete data

        this.setState({ 
            selectedDateAndTime: tmpDateTime,
            dayChangeDialogVisible: false, 
        });

        this.clearNoteText()
        this.clearSymptomGroup()
      };

     
    noteEditedHandler = (note) =>{
        this.setState({
            symptomEntryNote: note,
        });
    }

    dateEditedHandler = (dateTime) =>{
        //TODO: if symptoms selected and not saved, ask user. Then refresh page.
        this.state.tempDate = dateTime
        if(Array.isArray(this.state.selectedSymptoms) && this.state.selectedSymptoms.length){
            this.showDayChangeSaveDialog()
        }else{
            //symptoms were not edited, but maybe the note. Delete note and update noteEdit
            this.setState({
                symptomEntryNote: ""
            })
            this.clearNoteText()
        }
    }


    timeEditedHandler = (dateTime) =>{
        // //Only update the time of the current selectedDateAndTime

        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setHours(dateTime.getHours())
        tmpDateTime.setMinutes(dateTime.getMinutes())
        //TODO: Change time of tmpDateTime

        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
    }

    symptomSelectedIDsChangedHandler = (sympIDsAndSeverity) =>{
        Alert.alert("symptomSelectedIDsChangedHandler called");
        this.setState({
            selectedSymptoms: sympIDsAndSeverity,
        })
    }






    render(){
        return(
            <ScrollView>
                <HorizontalLineWithText text = "Date"/>
                <DayChooser ref={component => this._dayChooser = component} date = {getTodayDate()} onDateChanged={this.dateEditedHandler}/>
                <HorizontalLineWithText text = "Time"/>
                <SymptomTimePicker ref={component => this._timePicker = component} onTimeChanged={this.timeEditedHandler}/>
                <HorizontalLineWithText text = "Symptoms"/>
                <SymptomGroup ref={component => this._symptomGroup = component} onSelectedSymptomIDsChanged={this.symptomSelectedIDsChangedHandler}/>
                <HorizontalLineWithText text = "Notes"/>
                <NoteEdit ref={component => this._noteEdit = component} note={this.state.symptomEntryNote} onTextChanged={this.noteEditedHandler}/>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    margin: 20,
                }}           
                >
                    <View>
                        <Button title = "OK" onPress={() => this.saveCurrentData(true)}/>
                    </View>
                    <View>
                        <Button title = "Cancel" onPress={() => this.props.navigation.goBack()}/>
                    </View>
                </View>

                {/*Dialog for Day Change Save Dialog*/}
                <View>
                    <Dialog.Container visible={this.state.dayChangeDialogVisible}>
                    <Dialog.Title>Save Symptoms</Dialog.Title>
                    <Dialog.Description>
                        Do you want to save the entries?
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={this.handleDayChangeCancel} />
                    <Dialog.Button label="Save" onPress={this.handleDayChangeSave} />
                    </Dialog.Container>
                </View>
            </ScrollView>
        )
    }

    saveCurrentData = (goHome) =>{
        for (let symptom of this.state.selectedSymptoms)
        {
            let tmpDateTime = this.state.selectedDateAndTime
            tmpDateTime.setFullYear(tmpDateTime.getFullYear() + 1900)
            DatabaseManager.getInstance().insertSymptom(symptom[0], symptom[1], this.state.symptomEntryNote, tmpDateTime.getTime(), (error) => { alert(error)}, null);
        }
        if(goHome){
            this.props.navigation.goBack();
        }
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
