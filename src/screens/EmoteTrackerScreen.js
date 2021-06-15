import React from 'react';
import { SafeAreaView, View, Keyboard, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dialog from "react-native-dialog";
import EmoteTrackerSymbolGroup from '../components/EmoteTracker/EmoteTrackerSymbolGroup';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import NoteEdit from '../components/NoteEdit';
import DatabaseManager from '../manager/DatabaseManager';
import LanguageManager from '../manager/LanguageManager';
import GlutonManager from '../manager/GlutonManager';
import DayPicker from '../components/DayPicker';
import TimePicker from '../components/TimePicker';
import HeaderBanner from '../components/HeaderBanner';
import GearManager from '../manager/GearManager';
import EmotionStore from '../manager/buddyManager/EmotionStore';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';
import EmotionInformation from '../components/EmoteTracker/EmotionInformation';

const themeColor = '#9958B7';

export default class EmoteTrackerScreen extends React.Component {

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
            informationPosition: {
                'height': 0,
                'width': 0,
                'x': 0,
                'y': 0,
            },
            showEmotionInformation: false,
        }
    }

    clearNoteText = () => {
        this.setState({
            emoteNote: ""
        })
        this._noteEdit.deleteNote();
    }

    UNSAFE_componentWillMount() {
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
        this.props.navigation.addListener('willFocus', () =>  {
                this.receiveFocus();
            }
        );
    }

    receiveFocus = () => {
        const eventData = this.props.navigation.getParam("event", false)
        if(this.props.navigation.getParam("edit", false) && eventData){
            const objData = JSON.parse(eventData.objData);
            console.log(objData)
            // Object {
            //     "note": "my notes",
            //         "type": 4,
            // }
            this.setState({
                //     selectedSymptoms : [{symptomID: objData.symptomID,severity: objData.severity }],
                //     symptomEntryNote : objData.note,
                selectedSymbolID: objData.type,
                emoteNote: objData.note,
                selectedDateAndTime: new Date(eventData.created),
                edit : true,
                originalEventData: eventData
            })
        }
    }

    UNSAFE_componentWillUnmount() {
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

    toggleShowEmotionInformation = () => {
        this.setState({showEmotionInformation: !this.state.showEmotionInformation})
    }

    addInformationLayout(layout){
        this.setState({informationPosition:layout});
    }

    render() {
        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: themeColor }} />
                <KeyboardAwareScrollView style={{backgroundColor: "#fff"}} keyboardShouldPersistTaps="always">
                    <HeaderBanner color={themeColor} imageSource={require('../assets/images/EmoteTracker/mood_icon.png')} />
                    <HorizontalLineWithText color={themeColor} text={LanguageManager.getInstance().getText("DATE")} />
                    <DayPicker ref={component => this._dayChooser = component} textString="SYMPTOM_OCCURED"
                               dateAndTime = {this.state.selectedDateAndTime} onDateChanged={this.dateEditedHandler} />
                    <HorizontalLineWithText color={themeColor} text={LanguageManager.getInstance().getText("TIME")} />
                    <TimePicker ref={component => this._timePicker = component} textString="SYMPTOM_OCCURED"
                                dateAndTime = {this.state.selectedDateAndTime} onTimeChanged={this.timeEditedHandler} />
                    <HorizontalLineWithText iconClickEvent={this.toggleShowEmotionInformation} color={themeColor} text={LanguageManager.getInstance().getText("ENERGY")} />
                    <View
                    onLayout={event => {
                        const layout = event.nativeEvent.layout;
                        this.addInformationLayout(layout);
                      }}
                    />
                    <EmoteTrackerSymbolGroup color={themeColor}
                                             selectedID={this.state.selectedSymbolID}
                                             onChancedId={this.emotionChangedHandler} />
                    <HorizontalLineWithText color={themeColor} text={LanguageManager.getInstance().getText("NOTES")} />
                    <NoteEdit color={themeColor}
                              ref={component => this._noteEdit = component}
                              onTextChanged={this.noteEditedHandler}
                              note={this.state.emoteNote}/>
                    <View style={{ paddingBottom: 10 }} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonSubContainer}>
                            <TouchableHighlight style={styles.buttonSaveAndCancel} onPress={this.handleCancelButton}>
                                <Text style={{ textAlign: 'center', color: '#707070' }}>Cancel</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.buttonSaveAndCancel} onPress={this.saveCurrentData}>
                                <Text style={{ textAlign: 'center', color: '#707070' }}>{this.state.edit? "Update":"Save"}</Text>
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

                    {this.state.showEmotionInformation &&
                    <EmotionInformation color={themeColor} position={this.state.informationPosition}/>
                    }

                </KeyboardAwareScrollView>
            </>
        )
    }


    saveCurrentData = (goHome) => {
        let tmpDateTime = this.state.selectedDateAndTime
        if(this.state.edit){
            DatabaseManager.getInstance().updateEmotionEvent(
                this.state.originalEventData.id,
                this.state.selectedSymbolID,
                this.state.emoteNote,
                tmpDateTime.getTime(),
                (error) => {
                    alert(error)
                },
                () => {
                    GlutonManager.getInstance().setMessage(2);
                    GearManager.getInstance().sendMessage("msg 30")
                }
            );

        }else {
            DatabaseManager.getInstance().createEmotionEvent(
                this.state.selectedSymbolID,
                this.state.emoteNote,
                tmpDateTime.getTime(),
                (error) => {
                    alert(error)
                },
                () => {
                    GlutonManager.getInstance().setMessage(2);
                    GearManager.getInstance().sendMessage("msg 30")
                }
            );
            EmotionStore.setEmotionId(this.state.selectedSymbolID, tmpDateTime);
        }
        if (goHome) {
            setTimeout(() => this.navigateHome(), 100);
        }
    }

    navigateHome = () => {
        this.props.navigation.goBack();
    }

    handleCancelButton = () => {
        if (this.state.modified === true) {
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