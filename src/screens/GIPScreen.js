import React from 'react';
import { View, Button, Alert, ScrollView, Keyboard, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Dialog from "react-native-dialog";
import { HeaderBackButton } from 'react-navigation-stack'
import * as FileSystem from 'expo-file-system';
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
import GearManager from '../manager/GearManager';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';
import UploadManager from '../manager/UploadManager';


export default class GIPScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("ADD_GIP"),
        headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        headerRight: <HeaderSaveButton onPress={() => navigation.state.params.onOkPressed(true)}/>
    })

    constructor(props) {
        super(props);
        this.noteEditedHandler = this.noteEditedHandler.bind(this);
        this.dateEditedHandler = this.dateEditedHandler.bind(this);
        this.timeEditedHandler = this.timeEditedHandler.bind(this);
        this.gipManualResultHandler = this.gipManualResultHandler.bind(this);
        this.state = {
            modified: false,
            gipEntryNote: "",
            keyboardOpen: false,
            photo: null,            
            gipManualResult : 2
        }  
    }

    UNSAFE_componentWillMount() {
        this.setState({
            selectedDateAndTime: this.props.navigation.state.params.selectedDateAndTime
        });
        CeliLogger.addLog(this.constructor.name, Interactions.OPEN);
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
        CeliLogger.addLog(this.constructor.name, Interactions.CLOSE);
      }

    clearNoteText = () => {
        this.setState({
            gipEntryNote: ""
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

        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setDate(dateTime.getDate())
        tmpDateTime.setMonth(dateTime.getMonth())
        tmpDateTime.setFullYear(dateTime.getFullYear())
        this.setState({
            selectedDateAndTime: tmpDateTime,
            modified: true
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
  
    gipManualResultHandler = (tag) =>{
        this.setState({
            gipManualResult: tag, 
            modified: true           
        });
    }
  
    noteEditedHandler = (note) =>{
        this.setState({
            gipEntryNote: note,
            modified: true
        });
    }

    saveCurrentData(goHome) {
        if (this.state.photo != null || this.state.modified == true){     
            this.saveData(goHome)
            }else{
                this.showSaveEmptyDialog()
            }        
    }

    saveData(goHome){
        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setFullYear(tmpDateTime.getFullYear());
        if (this.state.photo) {
            UploadManager.getInstance().uploadGIPImage(this.state.photo, () => {});
        }

        DatabaseManager.getInstance().createGIPEvent(
            this.state.gipManualResult,
            this.state.gipEntryNote,
            this.state.photo,
            tmpDateTime.getTime(),
            (error) => {alert(error)},
                () => {
                    GlutonManager.getInstance().setMessage(2);
                    GearManager.getInstance().sendMessage("msg 31")
                }
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

    showSaveEmptyDialog(){
        this.setState({ saveAsEmptyGIPDialogVisible: true });
    }

    handleBack() {
        this.setState({ cancelSaveDialogVisible: false });
        this.setState({ saveAsEmptyGIPDialogVisible: false });
    };

    handleDiscard() {
        this.setState({ cancelSaveDialogVisible: false });
        this.setState({ saveAsEmptyGIPDialogVisible: false });
        this.navigateHome()
    };


    render() {

        const marginToUse = ((this.state.keyboardOpen) ? 300 : 0);
        const tags = [LanguageManager.getInstance().getText("GLUTEN"), LanguageManager.getInstance().getText("NO_GLUTEN"), LanguageManager.getInstance().getText("UNSURE")];
        const meals = [LanguageManager.getInstance().getText("BREAKFAST"), LanguageManager.getInstance().getText("LUNCH"), LanguageManager.getInstance().getText("DINNER"), LanguageManager.getInstance().getText("SNACK")];
        return (
            <ScrollView style={{marginBottom: marginToUse}}>
                <Text style={styles.infoText}>{LanguageManager.getInstance().getText("GIP_INFO")}.</Text>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("DATE")}/>
                <DayChooser ref={component => this._dayChooser = component} date = {this.state.selectedDateAndTime} onDateChanged={this.dateEditedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("TIME")}/>
                <TimePicker ref={component => this._timePicker = component} textString = "TAKEN_AT" onTimeChanged={this.timeEditedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("IMAGE")}/>
                <View style={{alignItems: 'center'}}>
                    <FoodDiaryImageEdit navigation = {this.props.navigation} onPictureTaken={(image) => this.setState({photo: image, modified: true})}/>
                </View>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("TAGS")}/>
                <FoodDiaryTagEdit ref={component => this._class = component} all={tags} selected={this.state.gipManualResult} isExclusive={true} onTagChanged={this.gipManualResultHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("NOTES")} style={{Top: 10}}/>
                <NoteEdit ref={component => this._noteEdit = component} note={this.state.symptomEntryNote} onTextChanged={this.noteEditedHandler} style={{Top: 10}}/>
                <View>
                    <Dialog.Container visible={this.state.saveAsEmptyGIPDialogVisible}>
                        <Dialog.Title>{LanguageManager.getInstance().getText("SAVE_EMPTY_GIP")}</Dialog.Title>
                        <Dialog.Description>
                        {LanguageManager.getInstance().getText("WANT_TO_SAVE_EMPTY_GIP")}
                        </Dialog.Description>
                        <Dialog.Button label={LanguageManager.getInstance().getText("No")} onPress={() => this.handleBack()} />
                        <Dialog.Button label={LanguageManager.getInstance().getText("YES")} onPress={() => this.saveData(true)} />
                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={this.state.cancelSaveDialogVisible}>
                        <Dialog.Title>{LanguageManager.getInstance().getText("DISCARD")}</Dialog.Title>
                        <Dialog.Description>
                        {LanguageManager.getInstance().getText("DO_YOU_WANT_TO_DISCARD")}
                        </Dialog.Description>
                        <Dialog.Button label={LanguageManager.getInstance().getText("No")} onPress={() => this.handleBack()} />
                        <Dialog.Button label={LanguageManager.getInstance().getText("YES")} onPress={() => this.handleDiscard()} />
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
     infoText:{
        fontSize: 16,
        textAlign: 'center',
        margin: 5,
        marginBottom: 0
     }
    });