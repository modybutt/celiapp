import React from 'react';
import { View, Keyboard, ScrollView, StyleSheet, Button} from 'react-native';
import { HeaderBackButton } from 'react-navigation'
import Dialog from "react-native-dialog";
import EmoteTrackerSymbolGroup from '../components/EmoteTracker/EmoteTrackerSymbolGroup';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import NoteEdit from '../components/NoteEdit';
import DatabaseManager from '../manager/DatabaseManager';
import DayChooser from '../components/DayChooser';
import LanguageManager from '../manager/LanguageManager';

export default class EmoteTrackerScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("ADD_EMOTION"),
        headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        headerRight: <View style={{paddingRight: 10}}><Button title={LanguageManager.getInstance().getText("SAVE")} onPress={() => navigation.state.params.onOkPressed(true)}/></View>
    })

    constructor(props){ 
        super(props)
        this.noteEditedHandler = this.noteEditedHandler.bind(this);
        this.dateEditedHandler = this.dateEditedHandler.bind(this);
        this.emotionChangedHandler = this.emotionChangedHandler.bind(this);
        this.state={
            show: false,
            selectedSymbolID: 3, // 1: unhappy, ... , 5: happy
            selectedDateAndTime: new Date(), //works correctly \o/
            tempDate: new Date(), //used to temporarliy save date and then set it to selectedDateAndTime after corresponding checks
            emoteNote: "",
            keyboardOpen: false
        }
    }

    clearNoteText = () => {
        this.setState({
            emoteNote: ""
        })
       this._noteEdit.deleteNote();
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


    noteEditedHandler = (note) =>{
        this.setState({
            emoteNote: note,
        });
    }

    emotionChangedHandler = (emotionID) =>{
        this.setState({
            selectedSymbolID: emotionID,
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

    //TODO Uplift selectedSymbolID

    render(){
        const marginToUse = ((this.state.keyboardOpen) ? 300 : 0);
        return(
            <ScrollView style={{marginBottom: marginToUse}}>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("DATE")}/>
                <DayChooser ref={component => this._dayChooser = component} date = {this.state.selectedDateAndTime} onDateChanged={this.dateEditedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("EMOTION")}/>
                <EmoteTrackerSymbolGroup ref={component => this._dayChooser = component} onEmotionChanged={this.emotionChangedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("NOTES")}/>
                <NoteEdit ref={component => this._noteEdit = component} onTextChanged={this.noteEditedHandler}/>
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

            </ScrollView>
        )
    }


    saveCurrentData = (goHome) =>{
        let tmpDateTime = this.state.selectedDateAndTime
        DatabaseManager.getInstance().createEmotionEvent(this.state.selectedSymbolID, this.state.emoteNote, tmpDateTime.getTime(), (error) => { alert(error)}, null);

        if (goHome) {
            setTimeout(() => this.navigateHome(), 100);
        }
    }

    navigateHome = () =>{
        this.props.navigation.goBack();
    }

    handleCancelButton = () =>{
        if(!this.state.selectedSymbolID == 0){
            this.showBackDiscardDialog()
        }else{
            this.navigateHome()
        }
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


}

var styles = StyleSheet.create({
 headText:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10
 }
});