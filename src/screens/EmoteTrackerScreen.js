import React from 'react';
import { SafeAreaView, View, Keyboard, ScrollView, Text, TouchableHighlight, StyleSheet, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import { HeaderBackButton } from 'react-navigation-stack'
import Dialog from "react-native-dialog";
import EmoteTrackerSymbolGroup from '../components/EmoteTracker/EmoteTrackerSymbolGroup';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import NoteEdit from '../components/NoteEdit';
import DatabaseManager from '../manager/DatabaseManager';
import LanguageManager from '../manager/LanguageManager';
import GlutonManager from '../manager/GlutonManager';
import DayChooser from '../components/DayChooser';
import DayPicker from '../components/DayPicker';
import TimePicker from '../components/TimePicker';
import HeaderBanner from '../components/HeaderBanner';
//import HeaderSaveButton from '../components/HeaderSaveButton';
import GearManager from '../manager/GearManager';
import EmotionStore from '../manager/buddyManager/EmotionStore';
import { observer } from "mobx-react";
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';

export default class EmoteTrackerScreen extends React.Component {
    /*static navigationOptions = ({ navigation }) => ({
        title: LanguageManager.getInstance().getText("ADD_EMOTION"),
        //headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        //headerRight: <HeaderSaveButton onPress={() => navigation.state.params.onOkPressed(true)}/>
    })*/

    constructor(props) {
        super(props)
        this.noteEditedHandler = this.noteEditedHandler.bind(this);
        this.dateEditedHandler = this.dateEditedHandler.bind(this);
        this.emotionChangedHandler = this.emotionChangedHandler.bind(this);
        this.state = {
            show: false,
            selectedSymbolID: 3, // 1: unhappy, ... , 5: happy
            emoteNote: "",
            keyboardOpen: false,
            modified: false,
            color: "#9958B7",
        }
    }

    clearNoteText = () => {
        this.setState({
            emoteNote: ""
        })
        this._noteEdit.deleteNote();
    }

    componentWillMount() {
        this.setState({
            selectedDateAndTime: this.props.navigation.state.params.selectedDateAndTime
        });
        CeliLogger.addLog("EmoteTrackerScreen", Interactions.OPEN);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onOkPressed: this.saveCurrentData.bind(this),
            onCancelPressed: this.handleCancelButton.bind(this),
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
        CeliLogger.addLog("EmoteTrackerScreen", Interactions.CLOSE);
    }

    _keyboardDidShow = () => {
        this.setState({
            keyboardOpen: true,
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            keyboardOpen: false,
        })
    }


    noteEditedHandler = (note) => {
        this.setState({
            emoteNote: note,
        });
    }

    emotionChangedHandler = (emotionID) => {
        this.setState({
            selectedSymbolID: emotionID,
            modified: true,
        });
    }

    dateEditedHandler = (dateTime) => {
        //TODO: if symptoms selected and not saved, ask user. Then refresh page.

        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setDate(dateTime.getDate())
        tmpDateTime.setMonth(dateTime.getMonth())
        tmpDateTime.setFullYear(dateTime.getFullYear())
        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
        if (Array.isArray(this.state.selectedSymptoms) && this.state.selectedSymptoms.length) {
            this.showDayChangeSaveDialog()
        } else {
            //symptoms were not edited, but maybe the note. Delete note and update noteEdit
            this.setState({
                symptomEntryNote: ""
            })
            this.clearNoteText()
        }
    }

    timeEditedHandler = (dateTime) => {
        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setHours(dateTime.getHours())
        tmpDateTime.setMinutes(dateTime.getMinutes())
        //TODO: Change time of tmpDateTime

        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
    }

    //TODO Uplift selectedSymbolID
    //{LanguageManager.getInstance().getText("DATE")}
    //<Image source={this.state.imgSource} style={styles.small} />
    //<MenuButton navigation={this.props.navigation}/>

    //<DayChooser ref={component => this._dayChooser = component} date={this.state.selectedDateAndTime} onDateChanged={this.dateEditedHandler} />

    render() {

        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: this.state.color }} />
                <KeyboardAwareScrollView style={{backgroundColor: "#fff"}}>
                    <HeaderBanner color={this.state.color} imageSource={require('../../assets/images/EmoteTracker/mood_icon.png')} />
                    <HorizontalLineWithText color={this.state.color} text={LanguageManager.getInstance().getText("DATE")} />
                    <DayPicker ref={component => this._dayChooser = component} textString="SYMPTOM_OCCURED" onDateChanged={this.dateEditedHandler} />
                    <HorizontalLineWithText color={this.state.color} text={LanguageManager.getInstance().getText("TIME")} />
                    <TimePicker ref={component => this._timePicker = component} textString="SYMPTOM_OCCURED" onTimeChanged={this.timeEditedHandler} />
                    <HorizontalLineWithText color={this.state.color} text={LanguageManager.getInstance().getText("ENERGY")} />
                    <EmoteTrackerSymbolGroup color={this.state.color} selectedID={this.state.selectedSymbolID} onChancedId={this.emotionChangedHandler} />
                    <HorizontalLineWithText color={this.state.color} text={LanguageManager.getInstance().getText("NOTES")} />
                    <NoteEdit color={this.state.color} ref={component => this._noteEdit = component} onTextChanged={this.noteEditedHandler} />
                    <View style={{ paddingBottom: 10 }} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonSubContainer}>
                            <TouchableHighlight style={styles.buttonSaveAndCancel} onPress={this.handleCancelButton}>
                                <Text style={{ textAlign: 'center', color: '#707070' }}>cancel</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.buttonSaveAndCancel} onPress={this.saveCurrentData}>
                                <Text style={{ textAlign: 'center', color: '#707070' }}>save</Text>
                            </TouchableHighlight>
                        </View>
                    </View>



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
                </KeyboardAwareScrollView>
            </>
        )
    }


    saveCurrentData = (goHome) => {
        let tmpDateTime = this.state.selectedDateAndTime
        DatabaseManager.getInstance().createEmotionEvent(this.state.selectedSymbolID, this.state.emoteNote, tmpDateTime.getTime(),
            (error) => { alert(error) },
            () => { GlutonManager.getInstance().setMessage(2); GearManager.getInstance().sendMessage("msg 30") }
        );
        EmotionStore.setEmotionId(this.state.selectedSymbolID, tmpDateTime);

        if (goHome) {
            setTimeout(() => this.navigateHome(), 100);
        }
    }

    navigateHome = () => {
        this.props.navigation.goBack();
    }

    handleCancelButton = () => {
        if (this.state.modified == true) {
            this.showBackDiscardDialog()
        } else {
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
    headText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: 30,
        paddingTop: 20,
    },
    buttonSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    buttonSaveAndCancel: {
        width: 90,
        height: 50,
        borderRadius: 3,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center'
    }
});