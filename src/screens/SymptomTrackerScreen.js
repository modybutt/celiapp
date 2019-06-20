import React from 'react';
import { ScrollView, TouchableOpacity, View, Button, Alert, Text, StyleSheet, BackHandler } from 'react-native';
import { HeaderBackButton } from 'react-navigation'
import Dialog from "react-native-dialog";
import SymptomGroup from '../components/SymptomTracker/SymptomGroup';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';
import SymptomTimePicker from '../components/SymptomTracker/SymptomTimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import DatabaseManager from '../manager/DatabaseManager';
import LanguageManager from '../manager/LanguageManager';


export default class SymptomTrackerScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("ADD_SYMPTOM"),
        headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        headerRight: <View style={{paddingRight: 10}}><Button title={LanguageManager.getInstance().getText("SAVE")} onPress={() => navigation.state.params.onOkPressed(true)}/></View>
    })

    //_didFocusSubscription;
    //_willBlurSubscription;

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
            cancelSaveDialogVisible: false
        } 

        // this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
        //     BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        // );
    }

    componentDidMount() {
    //     this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
    //         BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    //     );
        
        this.props.navigation.setParams({ 
            onOkPressed: this.saveCurrentData.bind(this) ,
            onCancelPressed: this.handleCancelButton.bind(this) ,
        })
    }

    // onBackButtonPressAndroid = () => {
    //     alert("B")
    // };

    // componentWillUnmount() {
    //     this._didFocusSubscription && this._didFocusSubscription.remove();
    //     this._willBlurSubscription && this._willBlurSubscription.remove();
    // }
    






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


    noteEditedHandler(note){
        this.setState({
            selectedSymptoms: []
        })
        this._symptomGroup.deleteSymptoms();
      }


      setBackDayChooserOneDay = () =>{
        this._dayChooser.changeDay(false);
      }




      showBackDiscardDialog = () => {
        this.setState({ cancelSaveDialogVisible: true });
      };

      handleBack = () => {
        this.setState({ cancelSaveDialogVisible: false });
      };

      handleDiscard = () => {
        this.navigateHome()
        this.setState({ cancelSaveDialogVisible: false });
      };









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
                <View style={{paddingBottom: 10}} />

                {/*Dialog for Day Change Save Dialog*/}
                <View>
                    <Dialog.Container visible={this.state.dayChangeDialogVisible}>
                    <Dialog.Title>Day Change</Dialog.Title>
                    <Dialog.Description>
                        Do you want to save the entries?
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={this.handleDayChangeCancel} />
                    <Dialog.Button label="Save" onPress={this.handleDayChangeSave} />
                    </Dialog.Container>
                </View>

                {/*Dialog for Day Change Save Dialog*/}
                 <View>
                    <Dialog.Container visible={this.state.cancelSaveDialogVisible}>
                    <Dialog.Title>Cancel</Dialog.Title>
                    <Dialog.Description>
                        Do you really want to discard the entries?
                    </Dialog.Description>
                    <Dialog.Button label="Back" onPress={this.handleBack} />
                    <Dialog.Button label="Discard" onPress={this.handleDiscard} />
                    </Dialog.Container>
                </View>
            </ScrollView>
        )
    }

    saveCurrentData = (goHome) =>{
        for (let symptom of this.state.selectedSymptoms) {
            let tmpDateTime = this.state.selectedDateAndTime
            tmpDateTime.setFullYear(tmpDateTime.getFullYear());
            DatabaseManager.getInstance().createSymptomEvent(symptom[0], symptom[1], this.state.symptomEntryNote, tmpDateTime.getTime(), (error) => { alert(error)}, null);
        }

        if (goHome) {
            setTimeout(() => this.navigateHome(), 100);
        }
    }

    navigateHome = () =>{
        this.props.navigation.goBack();
    }

    handleCancelButton = () =>{
        if(Array.isArray(this.state.selectedSymptoms) && this.state.selectedSymptoms.length){
            this.showBackDiscardDialog()
        }else{
            this.navigateHome()
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
