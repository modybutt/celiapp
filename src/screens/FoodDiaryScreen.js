
import React from 'react';
import { View, Button, ScrollView, Keyboard,Alert,StyleSheet} from 'react-native';
import Dialog from "react-native-dialog";
import { HeaderBackButton } from 'react-navigation'
import DatabaseManager from '../manager/DatabaseManager';
import TextInputSingleLine from '../components/TextInputSingleLine';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';
import FoodDiaryTimePicker from '../components/FoodDiary/FoodDiaryTimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import FoodDiaryRatingBar from '../components/FoodDiary/FoodDiaryRatingBar';
import FoodDiaryTagEdit from '../components/FoodDiary/FoodDiaryTagEdit'
import FoodDiaryImageEdit from '../components/FoodDiary/FoodDiaryImageEdit'
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
            keyboardOpen: false,
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

    clearNoteText = () => {
        this.setState({
            foodEntryNote: ""
        })
       this._noteEdit.deleteNote();
     }
    
    timeEditedHandler = (dateTime) =>{
        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setHours(dateTime.getHours())
        tmpDateTime.setMinutes(dateTime.getMinutes())

        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
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


    dateEditedHandler = (dateTime) =>{
        this.state.tempDate = dateTime

        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setDate(dateTime.getDate())
        tmpDateTime.setMonth(dateTime.getMonth())
        tmpDateTime.setFullYear(dateTime.getFullYear())
        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
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

        const marginToUse = ((this.state.keyboardOpen) ? 300 : 0);

        return (
            <ScrollView style={{marginBottom: marginToUse}}>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("DATE")}/>
                <DayChooser ref={component => this._dayChooser = component} date = {this.state.selectedDateAndTime} onDateChanged={this.dateEditedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("TIME")}/>
                <FoodDiaryTimePicker ref={component => this._timePicker = component} onTimeChanged={this.timeEditedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("NAME")}/>
                <TextInputSingleLine ref={component => this._name = component} onTextChanged={this.nameEditedHandler} style={{Top: 10}}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("TAGS")}/>
                <FoodDiaryTagEdit/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("IMAGE")}/>
                <FoodDiaryImageEdit navigation = {this.props.navigation}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("RATING")}/>
                <View style={styles.ratingBarView}>
                    <FoodDiaryRatingBar ref={component => this._rating = component}  onRatingChanged={this.ratingEditedHandler}/>
                </View> 
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("NOTES")} style={{Top: 10}}/>
                <NoteEdit ref={component => this._noteEdit = component} note={this.state.symptomEntryNote} onTextChanged={this.noteEditedHandler} style={{Top: 10}}/>
               
                <View>
                    <Dialog.Container visible={this.state.cancelSaveDialogVisible}>
                        <Dialog.Title>{LanguageManager.getInstance().getText("DISCARD")}</Dialog.Title>
                        <Dialog.Description>
                        {LanguageManager.getInstance().getText("DO_YOU_WANT_TO_DISCARD")}
                        </Dialog.Description>
                        <Dialog.Button label={LanguageManager.getInstance().getText("BACK")} onPress={() => this.handleBack()} />
                        <Dialog.Button label={LanguageManager.getInstance().getText("DISCARD")} onPress={() => this.handleDiscard()} />
                    </Dialog.Container>
                </View>
            </ScrollView>
        )
    }

}

      
    
    var styles = StyleSheet.create({
     headText:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10
     },
     ratingBarView:{
         alignItems: 'center',
     }
    });