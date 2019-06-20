
import React from 'react';
import { View, Button, ScrollView, StyleSheet} from 'react-native';
import Dialog from "react-native-dialog";
import { HeaderBackButton } from 'react-navigation'
import DatabaseManager from '../manager/DatabaseManager';
import TextInputSingleLine from '../components/TextInputSingleLine';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';
import SymptomTimePicker from '../components/SymptomTracker/SymptomTimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import RatingBar from '../components/RatingBar';
import LanguageManager from '../manager/LanguageManager';



export default class FoodDiaryScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("ADD_MEAL"),
        headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        headerRight: <View style={{paddingRight: 10}}><Button title={LanguageManager.getInstance().getText("SAVE")} onPress={() => navigation.state.params.onOkPressed(true)}/></View>
    })

    constructor(props) {
        super(props);
        this.noteEditedHandler = this.noteEditedHandler.bind(this);
        this.nameEditedHandler = this.nameEditedHandler.bind(this);
        this.dateEditedHandler = this.dateEditedHandler.bind(this);
        this.timeEditedHandler = this.timeEditedHandler.bind(this);
        this.ratingEditedHandler = this.ratingEditedHandler.bind(this);
        this.state = {
            foodEntryNote: "", 
            tempDate: new Date(), 
            foodEntryName: "", 
            selectedDateAndTime: new Date(), 
            foodRating: 0,
        } 
    }

    state = {
        modified: true, // true for DEBUG now
        cancelSaveDialogVisible: false,
    }

    componentDidMount() {        
        this.props.navigation.setParams({ 
            onOkPressed: this.saveCurrentData.bind(this) ,
            onCancelPressed: this.handleCancelButton.bind(this) ,
        })
    }

    
    timeEditedHandler = (dateTime) =>{
        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setHours(dateTime.getHours())
        tmpDateTime.setMinutes(dateTime.getMinutes())

        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
    }

    
    dateEditedHandler = (dateTime) =>{
        this.state.tempDate = dateTime
        if(Array.isArray(this.state.selectedSymptoms) && this.state.selectedSymptoms.length){
            this.showDayChangeSaveDialog()
        }else{
            this.setState({
                symptomEntryNote: ""
            })
            this.clearNoteText()
        }
    }

    ratingEditedHandler = (rating) =>{
        this.setState({
            foodRating: rating,
        });
    }

    noteEditedHandler = (note) =>{
        this.setState({
            foodEntryNote: note,
        });
    }
    nameEditedHandler = (name) =>{
        this.setState({
            foodEntryName: name,
        });
    }

    saveCurrentData(goHome) {
        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setFullYear(tmpDateTime.getFullYear());
        DatabaseManager.getInstance().createMealEvent(this.foodEntryName, 0, 0, this.foodRating, this.foodEntryNote, null, tmpDateTime.getTime(), (error) => { alert(error)}, null);

        if (goHome) {
            setTimeout(() => this.navigateHome(), 100);
        }
    }

    handleCancelButton() {
        if (this.state.modified == true) {
            this.showBackDiscardDialog()
        } else {
            this.navigateHome()
        }
    }

    navigateHome() {
        this.props.navigation.goBack();
    }

    showBackDiscardDialog() {
        this.setState({ cancelSaveDialogVisible: true });
    };

    handleBack() {
        this.setState({ cancelSaveDialogVisible: false });
    };

    handleDiscard() {
        this.setState({ cancelSaveDialogVisible: false });
        this.navigateHome()
    };

    render() {
        return (
            <ScrollView>
                 <HorizontalLineWithText text = "Date"/>
                <DayChooser ref={component => this._dayChooser = component} date = {getTodayDate()} onDateChanged={this.dateEditedHandler}/>
                <HorizontalLineWithText text = "Time"/>
                <SymptomTimePicker ref={component => this._timePicker = component} onTimeChanged={this.timeEditedHandler}/>
                <HorizontalLineWithText text = "Name"/>
                <TextInputSingleLine ref={component => this._name = component} onTextChanged={this.nameEditedHandler} style={{Top: 10}}/>
                <HorizontalLineWithText text = "Rating"/>
                <RatingBar ref={component => this._rating = component}  onRatingChanged={this.ratingEditedHandler}/>
                <HorizontalLineWithText text = "Notes" style={{Top: 10}}/>
                <NoteEdit ref={component => this._noteEdit = component} note={this.state.symptomEntryNote} onTextChanged={this.noteEditedHandler} style={{Top: 10}}/>
               
                <View>
                    <Dialog.Container visible={this.state.cancelSaveDialogVisible}>
                        <Dialog.Title>Cancel</Dialog.Title>
                        <Dialog.Description>
                            Do you really want to discard the entries?
                        </Dialog.Description>
                        <Dialog.Button label="Back" onPress={() => this.handleBack()} />
                        <Dialog.Button label="Discard" onPress={() => this.handleDiscard()} />
                    </Dialog.Container>
                </View>
            </ScrollView>
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