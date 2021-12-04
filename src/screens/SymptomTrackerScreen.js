import React from 'react';
import { Keyboard, View, Button, Alert, TextInput, StyleSheet, BackHandler } from 'react-native';
import { HeaderBackButton } from 'react-navigation'
import Dialog from "react-native-dialog";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SymptomGroup from '../components/SymptomTracker/SymptomGroup';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';
import TimePicker from '../components/TimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import DatabaseManager from '../manager/DatabaseManager';
import LanguageManager from '../manager/LanguageManager';
import GlutonManager from '../manager/GlutonManager';
import HeaderSaveButton from '../components/HeaderSaveButton';
import GearManager from '../manager/GearManager';


export default class SymptomTrackerScreen extends React.Component{
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;

        if(state.params != undefined) {
            return {
                title: LanguageManager.getInstance().getText("ADD_SYMPTOM"),
                headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
                headerRight:<HeaderSaveButton onPress={() => navigation.state.params.onOkPressed(true)} shareConfig={{
                    onSymptomsUpdated: state.params.onSymptomsUpdated
                }} />
            }
        }
    }

    //_didFocusSubscription;
    //_willBlurSubscription;

    constructor(props) {
        super(props);
        this.noteEditedHandler = this.noteEditedHandler.bind(this);
        this.dateEditedHandler = this.dateEditedHandler.bind(this);
        this.timeEditedHandler = this.timeEditedHandler.bind(this);
        this.symptomSelectionChangeHandler = this.symptomSelectionChangeHandler.bind(this);
        this.state = {
            symptomEntryNote: "", //works correctly \o/
            tempDate: new Date(), //used to temporarliy save date and then set it to selectedDateAndTime after corresponding checks
            selectedDateAndTime: new Date(), //works correctly \o/
            selectedSymptoms: [], //bit buggy when deleting existing symptoms from list
            dayChangeDialogVisible: false,
            resetSymptomGroup: false,
            cancelSaveDialogVisible: false,
            selectSymptomDialogVisible: false,
            keyboardOpen: false
        } 

        // this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
        //     BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        // );
    }

    componentWillMount() {
        const {setParams} = this.props.navigation;
        setParams({onSymptomsUpdated: this.onSymptomsUpdated.bind(this)});
    }

    componentDidMount() {
    //     this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
    //         BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    //     );
        
        this.props.navigation.setParams({ 
            onOkPressed: this.saveCurrentData.bind(this) ,
            onCancelPressed: this.handleCancelButton.bind(this) ,
        })

        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
          );
          this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
          );

    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }

      _keyboardDidShow = ()  => {
        this.setState({
            keyboardOpen: true,
        })
      }
    
      _keyboardDidHide = ()  => {
        this.setState({
            keyboardOpen: false,
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

      onSymptomsUpdated = (callback) => {
        this.symptomsUpdated = callback;
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

    noteEditedHandler = (note) =>{
        this.setState({
            symptomEntryNote: note,
        });
    }

    dateEditedHandler = (dateTime) =>{
        //TODO: if symptoms selected and not saved, ask user. Then refresh page.
        this.state.tempDate = dateTime

        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setDate(dateTime.getDate())
        tmpDateTime.setMonth(dateTime.getMonth())
        tmpDateTime.setFullYear(dateTime.getFullYear())
        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
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

    symptomSelectionChangeHandler = (sympIDsAndSeverity) =>{
        this.symptomsUpdated(sympIDsAndSeverity.length > 0);
        this.setState({
            selectedSymptoms: sympIDsAndSeverity,
        });
    }

    render(){
        const marginToUse = ((this.state.keyboardOpen) ? 300 : 0);

            return(
                <View style={styles.container}>
                  <KeyboardAwareScrollView>
                      {/* <TextInput onSubmitEditing={Keyboard.dismiss} /> */}
                      <HorizontalLineWithText text = {LanguageManager.getInstance().getText("DATE")+"test"}/>
                      <DayChooser ref={component => this._dayChooser = component} date = {this.state.selectedDateAndTime} onDateChanged={this.dateEditedHandler}/>
                      <HorizontalLineWithText text = {LanguageManager.getInstance().getText("TIME")}/>
                      <TimePicker ref={component => this._timePicker = component} textString = "SYMPTOM_OCCURED" onTimeChanged={this.timeEditedHandler}/>
                      <HorizontalLineWithText text = {LanguageManager.getInstance().getText("SYMPTOMS")}/>
                      <SymptomGroup ref={component => this._symptomGroup = component} selection={this.state.selectedSymptoms} onSelectionChanged={this.symptomSelectionChangeHandler} navigation={this.props.navigation}/>
                      <HorizontalLineWithText text = {LanguageManager.getInstance().getText("NOTES")}/>
                      <NoteEdit ref={component => this._noteEdit = component} note={this.state.symptomEntryNote} onTextChanged={this.noteEditedHandler}/>
                      <View style={{paddingBottom: 10}} />
       
                      {/*Dialog for Day Change Save Dialog*/}
                       <View>
                          <Dialog.Container visible={this.state.cancelSaveDialogVisible}>
                          <Dialog.Title>{LanguageManager.getInstance().getText("DISCARD")}</Dialog.Title>
                          <Dialog.Description>
                          {LanguageManager.getInstance().getText("DO_YOU_WANT_TO_DISCARD")}
                          </Dialog.Description>
                          <Dialog.Button label={LanguageManager.getInstance().getText("BACK")} onPress={this.handleBack} />
                          <Dialog.Button label={LanguageManager.getInstance().getText("DISCARD")} onPress={this.handleDiscard} />
                          </Dialog.Container>
                      </View>
                      {/* <KeyboardListener
                          onWillShow={() => { this.setState({ keyboardOpen: true }); }}
                          onWillHide={() => { this.setState({ keyboardOpen: false }); }}
                      /> */}
                  </KeyboardAwareScrollView>
                </View>
            )
    }

    isSymptomSelected()
    {
        return Array.isArray(this.state.selectedSymptoms) && this.state.selectedSymptoms.length > 1;
    }

    saveCurrentData = (goHome) =>{
        let added = 1;
        let tmpDateTime = this.state.selectedDateAndTime;
        
        if(this.isSymptomSelected())
        {
            this.state.selectedSymptoms.forEach((symptom) => {
                DatabaseManager.getInstance().createSymptomEvent(symptom.symptomID, symptom.severity, this.state.symptomEntryNote, tmpDateTime.getTime(), 
                    (error) => {alert(error)}, 
                    () => {GlutonManager.getInstance().setMessage(2); GearManager.getInstance().sendMessage("msg 32")}
                );
            });
    
            if (goHome) {
                setTimeout(() => this.navigateHome(), 100);
            }
        } else {
            this.showBackDiscardDialog();
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

var styles = StyleSheet.create({
  container: {
    margin: 25
  },
 headText:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10
 }
});
