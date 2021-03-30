import React from 'react';
import { SafeAreaView, Keyboard, View, Button, Alert, TextInput, StyleSheet, TouchableHighlight, Text, BackHandler } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack'
import Dialog from "react-native-dialog";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SymptomGroup from '../components/SymptomTracker/SymptomGroup';
import NoteEdit from '../components/NoteEdit';
import TextInputSingleLine from '../components/TextInputSingleLine';
import DayChooser from '../components/DayChooser';
import TimePicker from '../components/TimePicker';
import DayPicker from '../components/DayPicker';
import HeaderBanner from '../components/HeaderBanner';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import DatabaseManager from '../manager/DatabaseManager';
import LanguageManager from '../manager/LanguageManager';
import GlutonManager from '../manager/GlutonManager';
import HeaderSaveButton from '../components/HeaderSaveButton';
import GearManager from '../manager/GearManager';
import AchievementManager from '../manager/buddyManager/AchievementManager';
import AchievementRecordManager from '../manager/buddyManager/AchievementRecordManager';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';

export default class SymptomTrackerScreen extends React.Component {
    /*static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        if (state.params != undefined && state.params.onSymptomsUpdated != undefined) {
            return {
                title: LanguageManager.getInstance().getText("ADD_SYMPTOM"),
                headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()} />,
                headerRight: <HeaderSaveButton onPress={() => navigation.state.params.onOkPressed(true)} 
                            shareConfig={{onSymptomsUpdated: state.params.onSymptomsUpdated}} 
                            />
            }
        }
    }*/

    constructor(props) {
        super(props);
        this.noteEditedHandler = this.noteEditedHandler.bind(this);
        this.dateEditedHandler = this.dateEditedHandler.bind(this);
        this.timeEditedHandler = this.timeEditedHandler.bind(this);
        this.symptomSelectionChangeHandler = this.symptomSelectionChangeHandler.bind(this);
        this.state = {
            symptomDescription: "",
            symptomEntryNote: "", //works correctly \o/
            selectedSymptoms: [], //bit buggy when deleting existing symptoms from list
            dayChangeDialogVisible: false,
            resetSymptomGroup: false,
            cancelSaveDialogVisible: false,
            selectSymptomDialogVisible: false,
            keyboardOpen: false,
            color: '#1DBBA0',
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            selectedDateAndTime: this.props.navigation.state.params.selectedDateAndTime
        });
        CeliLogger.addLog("SymptomTrackerScreen", Interactions.OPEN);
    }

    componentDidMount() {
        //     this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
        //         BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        //     );

        this.props.navigation.setParams({
            onOkPressed: this.saveCurrentData.bind(this),
            onCancelPressed: this.handleCancelButton.bind(this),
            onSymptomsUpdated: this.onSymptomsUpdated.bind(this)
        });

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
        CeliLogger.addLog("SymptomTrackerScreen", Interactions.CLOSE);
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

    clearNoteText = () => {
        this.setState({
            symptomEntryNote: ""
        })
        this._noteEdit.deleteNote();
    }

    onSymptomsUpdated = (callback) => {
        //this.symptomsUpdated = callback;
    }

    clearSymptomGroup = () => {
        this.setState({
            selectedSymptoms: []
        })
        this._symptomGroup.deleteSymptoms();
    }

    noteEditedHandler(note) {
        this.setState({
            selectedSymptoms: []
        })
        this._symptomGroup.deleteSymptoms();
    }

    setBackDayChooserOneDay = () => {
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

    noteEditedHandler = (note) => {
        this.setState({
            symptomEntryNote: note,
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

    descriptionEditedHandler = (text) => {
        this.setState({
            symptomDescription: text,
        });
    }

    symptomSelectionChangeHandler = (sympIDsAndSeverity) => {
        //this.symptomsUpdated(sympIDsAndSeverity.length > 0);
        this.setState({
            selectedSymptoms: sympIDsAndSeverity,
        });
    }

    render() {

        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: this.state.color }} />
                <KeyboardAwareScrollView style={{ backgroundColor: "#fff" }}>
                    {/* <TextInput onSubmitEditing={Keyboard.dismiss} /> */}
                    <HeaderBanner color={this.state.color} imageSource={require('../../assets/images/SymptomTracker/add_symptom_icon.png')} />
                    <HorizontalLineWithText color={this.state.color} text={LanguageManager.getInstance().getText("DATE")} />
                    <DayPicker ref={component => this._dayChooser = component} textString="SYMPTOM_OCCURED" onDateChanged={this.dateEditedHandler} />
                    <HorizontalLineWithText color={this.state.color} text={LanguageManager.getInstance().getText("TIME")} />
                    <TimePicker ref={component => this._timePicker = component} textString="SYMPTOM_OCCURED" onTimeChanged={this.timeEditedHandler} />
                    <HorizontalLineWithText color={this.state.color} text={LanguageManager.getInstance().getText("SYMPTOMS")} />
                    <SymptomGroup ref={component => this._symptomGroup = component} selection={this.state.selectedSymptoms} onSelectionChanged={this.symptomSelectionChangeHandler} navigation={this.props.navigation} />
                    <HorizontalLineWithText color={this.state.color} text={LanguageManager.getInstance().getText("SHORT_DESCRIPTION")} />
                    <View style={styles.containerPadding}>
                        <TextInputSingleLine color={this.state.color}
                            ref={component => this._name = component}
                            onTextChanged={this.descriptionEditedHandler}
                            style={{ Top: 10 }}
                            placeholderText={LanguageManager.getInstance().getText("MEAL_NAME_PLACEHOLDER")}
                        />
                    </View>
                    <HorizontalLineWithText color={this.state.color} text={LanguageManager.getInstance().getText("NOTES")} />
                    <NoteEdit color={this.state.color} style={styles.notes} ref={component => this._noteEdit = component} note={this.state.symptomEntryNote} onTextChanged={this.noteEditedHandler} />
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
                    {/* <KeyboardListener
                          onWillShow={() => { this.setState({ keyboardOpen: true }); }}
                          onWillHide={() => { this.setState({ keyboardOpen: false }); }}
                      /> */}
                </KeyboardAwareScrollView>
            </>
        )
    }

    isSymptomSelected() {
        return Array.isArray(this.state.selectedSymptoms) && this.state.selectedSymptoms.length > 0;
    }

    saveCurrentData = (goHome) => {
        let added = 1;
        let tmpDateTime = this.state.selectedDateAndTime;

        if (this.isSymptomSelected()) {
            this.state.selectedSymptoms.forEach((symptom) => {
                DatabaseManager.getInstance().createSymptomEvent(symptom.symptomID, symptom.severity,this.state.symptomDescription ,this.state.symptomEntryNote, tmpDateTime.getTime(),
                    (error) => { alert(error) },
                    () => { GlutonManager.getInstance().setMessage(2); GearManager.getInstance().sendMessage("msg 32") }
                );
                //Achievement Addition
                AchievementManager.triggerAchievement("SYMPTOMADDED");
                AchievementRecordManager.increaseCountForAchievementRecord('SYMPTOMADDED');
            });

            if (goHome) {
                setTimeout(() => this.navigateHome(), 100);
            }
        } else {
            this.showBackDiscardDialog();
        }
    }

    navigateHome = () => {
        this.props.navigation.goBack();
    }

    handleCancelButton = () => {
        if (Array.isArray(this.state.selectedSymptoms) && this.state.selectedSymptoms.length) {
            this.showBackDiscardDialog()
        } else {
            this.navigateHome()
        }
    }

}

var styles = StyleSheet.create({

    notes: {
        margin: 10,
        padding: 10
    },
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
    },
    containerPadding: {
        paddingLeft: 20,
        paddingRight: 20,
    },
});
