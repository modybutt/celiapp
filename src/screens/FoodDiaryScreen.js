
import React from 'react';
import { View, Button, ScrollView, Keyboard, TouchableOpacity, StyleSheet} from 'react-native';
import Dialog from "react-native-dialog";
import { HeaderBackButton } from 'react-navigation'
import DatabaseManager from '../manager/DatabaseManager';
import TextInputSingleLine from '../components/TextInputSingleLine';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';
import TimePicker from '../components/TimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import FoodDiaryRatingBar from '../components/FoodDiary/FoodDiaryRatingBar';
import FoodDiaryTagEdit from '../components/FoodDiary/FoodDiaryTagEdit'
import FoodDiaryImageEdit from '../components/FoodDiary/FoodDiaryImageEdit'
import LanguageManager from '../manager/LanguageManager';
import GlutonManager from '../manager/GlutonManager';
import HeaderSaveButton from '../components/HeaderSaveButton';


export default class FoodDiaryScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("ADD_MEAL"),
        headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        headerRight: <HeaderSaveButton onPress={() => navigation.state.params.onOkPressed(true)}/>
    })

    constructor(props) {
        super(props);
        this.noteEditedHandler = this.noteEditedHandler.bind(this);
        this.nameEditedHandler = this.nameEditedHandler.bind(this);
        this.dateEditedHandler = this.dateEditedHandler.bind(this);
        this.timeEditedHandler = this.timeEditedHandler.bind(this);
        this.ratingEditedHandler = this.ratingEditedHandler.bind(this);
        this.mealChangedHandler = this.mealChangedHandler.bind(this);
        this.classChangedHandler = this.classChangedHandler.bind(this);
        this.state = {
            foodEntryNote: "",
            tempDate: new Date(), 
            foodEntryName: "", 
            selectedDateAndTime: new Date(), 
            foodRating: 0,
            keyboardOpen: false,
            photo: null,
            selectedMealKey : 0,            
            selectedClass : 2,
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

    
    mealChangedHandler = (meal) =>{
        this.setState({
            selectedMealKey: meal,
        });
    }
  
    classChangedHandler = (tag) =>{
        this.setState({
            selectedClassKey: tag,            
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
        DatabaseManager.getInstance().createMealEvent(this.state.foodEntryName, this.state.selectedClassKey, this.state.selectedMealKey, this.state.foodRating, this.state.foodEntryNote, this.state.photo, tmpDateTime.getTime(), 
            (error) => {alert(error)}, 
            () => {GlutonManager.getInstance().setMessage(2)}
        );

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
        const tags = [LanguageManager.getInstance().getText("GLUTEN"), LanguageManager.getInstance().getText("NO_GLUTEN"), LanguageManager.getInstance().getText("UNSURE")];
        const meals = [LanguageManager.getInstance().getText("BREAKFAST"), LanguageManager.getInstance().getText("LUNCH"), LanguageManager.getInstance().getText("DINNER"), LanguageManager.getInstance().getText("SNACK")];
        return (
            <ScrollView style={{marginBottom: marginToUse}}>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("DATE")}/>
                <DayChooser ref={component => this._dayChooser = component} date = {this.state.selectedDateAndTime} onDateChanged={this.dateEditedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("TIME")}/>
                <TimePicker ref={component => this._timePicker = component} textString = "EATEN_AT" onTimeChanged={this.timeEditedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("NAME")}/>
                <TextInputSingleLine ref={component => this._name = component} onTextChanged={this.nameEditedHandler} style={{Top: 10}}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("TAGS")}/>
                <FoodDiaryTagEdit ref={component => this._class = component} all={tags} selected={this.state.selectedClass} isExclusive={true} onTagChanged={this.classChangedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("TYPES")}/>
                <FoodDiaryTagEdit ref={component => this._meal = component} all={meals} selected={this.state.selectedMealKey} isExclusive={true} onTagChanged={this.mealChangedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("IMAGE")}/>
                <View style={{alignItems: 'center'}}>
                    <FoodDiaryImageEdit navigation = {this.props.navigation} onPictureTaken={(image) => this.setState({photo: image})}/>
                </View>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("RATING")}/>
                <View style={{alignItems: 'center'}}>
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
    });