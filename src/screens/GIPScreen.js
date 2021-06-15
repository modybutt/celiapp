import React from 'react';
import {Keyboard, SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Dialog from "react-native-dialog";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import DatabaseManager from '../manager/DatabaseManager';
import NoteEdit from '../components/NoteEdit';
import DayPicker from '../components/DayPicker';
import TimePicker from '../components/TimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import GipTrackerSymbolClassGroup from '../components/GipTracker/GipTrackerSymbolClassGroup'
import FoodDiaryImageEdit from '../components/FoodDiary/FoodDiaryImageEdit'
import HeaderBanner from '../components/HeaderBanner';
import LanguageManager from '../manager/LanguageManager';
import GlutonManager from '../manager/GlutonManager';
import GearManager from '../manager/GearManager';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';
import UploadManager from '../manager/UploadManager';
import GipInformation from '../components/GipTracker/GipInformation'

const themeColor = '#FF8D1E';

export default class GIPScreen extends React.Component {

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
            gipManualResult: 2,
            informationPosition: {
                'height': 0,
                'width': 0,
                'x': 0,
                'y': 0,
            },
            showSymptomInformation: false,
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            selectedDateAndTime: this.props.navigation.state.params.selectedDateAndTime
        });
        CeliLogger.addLog("GIPScreen", Interactions.OPEN);
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
        this.props.navigation.addListener('willFocus', () => {
                this.receiveFocus();
            }
        );
    }

    receiveFocus = () => {
        const eventData = this.props.navigation.getParam("event", false)
        if (this.props.navigation.getParam("edit", false) && eventData) {
            const objData = JSON.parse(eventData.objData);
            console.log(objData)
            // Object {
            //     "note": "gluten notes
            //     ",
            //     "photo": null,
            //         "result": 1,
            //         "timestamp": 1623704492799,
            // }
            this.setState({
                //     selectedSymptoms : [{symptomID: objData.symptomID,severity: objData.severity }],
                //     symptomEntryNote : objData.note,
                gipManualResult: objData.result,
                gipEntryNote: objData.note,
                photo: objData.photo,
                selectedDateAndTime: new Date(eventData.created),
                edit: true,
                originalEventData: eventData,
            })
        }
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        CeliLogger.addLog("GIPScreen", Interactions.CLOSE);
    }

    clearNoteText = () => {
        this.setState({
            gipEntryNote: ""
        })
        this._noteEdit.deleteNote();
    }

    timeEditedHandler = (dateTime) => {
        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setHours(dateTime.getHours())
        tmpDateTime.setMinutes(dateTime.getMinutes())

        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
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


    dateEditedHandler = (dateTime) => {

        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setDate(dateTime.getDate())
        tmpDateTime.setMonth(dateTime.getMonth())
        tmpDateTime.setFullYear(dateTime.getFullYear())
        this.setState({
            selectedDateAndTime: tmpDateTime,
            modified: true
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

    gipManualResultHandler = (tag) => {
        this.setState({
            gipManualResult: tag,
            modified: true
        });
    }

    noteEditedHandler = (note) => {
        this.setState({
            gipEntryNote: note,
            modified: true
        });
    }

    saveCurrentData(goHome) {
        if (this.state.photo != null || this.state.modified === true) {
            this.saveData(goHome)
        } else {
            this.showSaveEmptyDialog()
        }
    }

    saveData(goHome) {
        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setFullYear(tmpDateTime.getFullYear());
        if (this.state.edit) {
            DatabaseManager.getInstance().updateGipEvent(
                this.state.originalEventData.id,
                this.state.gipManualResult,
                this.state.gipEntryNote,
                this.state.photo,
                tmpDateTime.getTime(),
                tmpDateTime.getTime(),
                (error) => {
                    alert(error)
                },
                () => {
                    GlutonManager.getInstance().setMessage(2);
                    GearManager.getInstance().sendMessage("msg 31")
                });
        } else {
            if (this.state.photo) {
                UploadManager.getInstance().uploadGIPImage(this.state.photo, () => {
                });
            }
            DatabaseManager.getInstance().createGIPEvent(
                this.state.gipManualResult,
                this.state.gipEntryNote,
                this.state.photo,
                tmpDateTime.getTime(),
                (error) => {
                    alert(error)
                },
                () => {
                    GlutonManager.getInstance().setMessage(2);
                    GearManager.getInstance().sendMessage("msg 31")
                }
            );
        }
        if (goHome) {
            setTimeout(() => this.navigateHome(), 100);
        }
    }

    handleCancelButton = () => {
        if (this.state.modified === true) {
            this.showBackDiscardDialog()
        } else {
            this.navigateHome()
        }
    }

    navigateHome() {
        this.props.navigation.goBack();
    }

    showBackDiscardDialog() {
        this.setState({cancelSaveDialogVisible: true});
    };

    showSaveEmptyDialog() {
        this.setState({saveAsEmptyGIPDialogVisible: true});
    }

    handleBack() {
        this.setState({cancelSaveDialogVisible: false});
        this.setState({saveAsEmptyGIPDialogVisible: false});
    };

    handleDiscard() {
        this.setState({cancelSaveDialogVisible: false});
        this.setState({saveAsEmptyGIPDialogVisible: false});
        this.navigateHome()
    };

    addInformationLayout(layout) {
        this.setState({informationPosition: layout});
    }

    toggleShowSymptomInformation = () => {
        this.setState({showSymptomInformation: !this.state.showSymptomInformation})
    }

    render() {
        return (
            <>
                <SafeAreaView style={{flex: 0, backgroundColor: themeColor}}/>
                <KeyboardAwareScrollView style={{backgroundColor: "#fff"}} keyboardShouldPersistTaps="always">
                    <HeaderBanner color={themeColor} imageSource={require('../assets/images/GipTracker/gip_icon.png')}/>

                    <HorizontalLineWithText color={themeColor} text={LanguageManager.getInstance().getText("DATE")}/>
                    <DayPicker ref={component => this._dayChooser = component} textString="SYMPTOM_OCCURED"
                               dateAndTime={this.state.selectedDateAndTime} onDateChanged={this.dateEditedHandler}/>

                    <HorizontalLineWithText color={themeColor} text={LanguageManager.getInstance().getText("TIME")}/>
                    <TimePicker ref={component => this._timePicker = component} textString="TAKEN_AT"
                                dateAndTime={this.state.selectedDateAndTime} onTimeChanged={this.timeEditedHandler}/>
                    <HorizontalLineWithText color={themeColor} text={LanguageManager.getInstance().getText("PICTURE")}/>
                    <View style={{alignItems: 'center'}}>
                        <FoodDiaryImageEdit color={themeColor} navigation={this.props.navigation}
                                            onPictureTaken={(image) => this.setState({photo: image, modified: true})}/>
                    </View>
                    <HorizontalLineWithText iconClickEvent={this.toggleShowSymptomInformation} color={themeColor}
                                            text={LanguageManager.getInstance().getText("TAGS")}/>
                    <View
                        onLayout={event => {
                            const layout = event.nativeEvent.layout;
                            this.addInformationLayout(layout);
                        }}
                    />
                    <GipTrackerSymbolClassGroup
                        color={themeColor}
                        selectedID={this.state.gipManualResult}
                        onChancedId={this.gipManualResultHandler}/>
                    <HorizontalLineWithText color={themeColor} text={LanguageManager.getInstance().getText("NOTES")}
                                            style={{Top: 10}}/>
                    <NoteEdit color={themeColor}
                              ref={component => this._noteEdit = component}
                              note={this.state.gipEntryNote}
                              onTextChanged={this.noteEditedHandler} style={{Top: 10}}/>

                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonSubContainer}>
                            <TouchableHighlight style={styles.buttonSaveAndCancel} onPress={this.handleCancelButton}>
                                <Text style={{textAlign: 'center', color: '#707070'}}>Cancel</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.buttonSaveAndCancel}
                                                onPress={() => this.saveCurrentData(true)}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#707070'
                                }}>{this.state.edit ? "Update" : "Save"}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                    {this.state.showSymptomInformation &&
                    <GipInformation
                        color={themeColor}
                        position={this.state.informationPosition}>
                    </GipInformation>
                    }

                    <View>
                        <Dialog.Container visible={this.state.saveAsEmptyGIPDialogVisible}>
                            <Dialog.Title>{LanguageManager.getInstance().getText("SAVE_EMPTY_GIP")}</Dialog.Title>
                            <Dialog.Description>
                                {LanguageManager.getInstance().getText("WANT_TO_SAVE_EMPTY_GIP")}
                            </Dialog.Description>
                            <Dialog.Button label={LanguageManager.getInstance().getText("No")}
                                           onPress={() => this.handleBack()}/>
                            <Dialog.Button label={LanguageManager.getInstance().getText("YES")}
                                           onPress={() => this.saveData(true)}/>
                        </Dialog.Container>
                    </View>
                    <View>
                        <Dialog.Container visible={this.state.cancelSaveDialogVisible}>
                            <Dialog.Title>{LanguageManager.getInstance().getText("DISCARD")}</Dialog.Title>
                            <Dialog.Description>
                                {LanguageManager.getInstance().getText("DO_YOU_WANT_TO_DISCARD")}
                            </Dialog.Description>
                            <Dialog.Button label={LanguageManager.getInstance().getText("No")}
                                           onPress={() => this.handleBack()}/>
                            <Dialog.Button label={LanguageManager.getInstance().getText("YES")}
                                           onPress={() => this.handleDiscard()}/>
                        </Dialog.Container>
                    </View>
                </KeyboardAwareScrollView>
            </>
        )
    }
}


const styles = StyleSheet.create({
    headText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    infoText: {
        fontSize: 16,
        textAlign: 'center',
        margin: 5,
        marginBottom: 0
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