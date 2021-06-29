import React from 'react';
import {Keyboard, SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Dialog from "react-native-dialog";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import DatabaseManager from '../manager/DatabaseManager';
import TextInputSingleLine from '../components/TextInputSingleLine';
import NoteEdit from '../components/NoteEdit';
import DayPicker from '../components/DayPicker';
import TimePicker from '../components/TimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import FoodDiaryImageEdit from '../components/FoodDiary/FoodDiaryImageEdit'
import FoodTrackerSymbolGroup from '../components/FoodDiary/FoodTrackerSymbolGroup'
import FoodTrackerSymbolClassGroup from '../components/FoodDiary/FoodTrackerSymbolClassGroup'
import HeaderBanner from '../components/HeaderBanner';
import LanguageManager from '../manager/LanguageManager';
import GlutonManager from '../manager/GlutonManager';
import GearManager from '../manager/GearManager';
import AchievementManager from '../manager/buddyManager/AchievementManager';
import EntryManager from '../manager/buddyManager/EntryManager';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';
import FoodInformation from '../components/FoodDiary/FoodInformation';


const themeColor = '#3398DE';

export default class FoodDiaryScreen extends React.Component {

    state = {
        cancelSaveDialogVisible: false,
        saveAsEmptyFoodDialogVisible: false,
    }

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
            foodEntryName: "",
            foodRating: 0,
            keyboardOpen: false,
            photo: null,
            selectedMealKey: 0,
            selectedClassKey: 2,
            modified: false,
            informationPosition: {
                'height': 0,
                'width': 0,
                'x': 0,
                'y': 0,
            },
            showFoodInformation: false,
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            selectedDateAndTime: this.props.navigation.state.params.selectedDateAndTime
        });
        CeliLogger.addLog("FoodDiaryScreen", Interactions.OPEN);
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

            this.setState({
                foodEntryName: objData.name,
                selectedClassKey: objData.type,
                selectedMealKey: objData.tag,
                foodRating: objData.rating,
                foodEntryNote: objData.note,
                selectedDateAndTime: new Date(eventData.created),
                edit: true,
                originalEventData: eventData,
                photo: this.state.photo || objData.icon,
                eventId:eventData.id,
                deleteThisEntry: this.props.navigation.getParam("deleteThisEntry",null)
            })
        }
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        CeliLogger.addLog("FoodDiaryScreen", Interactions.CLOSE);
    }

    clearNoteText = () => {
        this.setState({
            foodEntryNote: ""
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

    ratingEditedHandler = (rating) => {
        this.setState({
            foodRating: rating,
        });
    }


    mealChangedHandler = (meal) => {
        this.setState({
            selectedMealKey: meal,
        });
    }

    classChangedHandler = (tag) => {
        console.log("class changed handler", tag)
        this.setState({
            selectedClassKey: tag,
        });
    }

    noteEditedHandler = (note) => {
        this.setState({
            foodEntryNote: note,
        });
    }
    nameEditedHandler = (name) => {
        this.setState({
            foodEntryName: name,
        });
    }

    saveCurrentData(goHome) {
        if (this.state.photo != null || this.state.foodEntryName != "") {
            this.saveData(goHome)
        } else {
            this.showSaveEmptyDialog()
            // Alert.alert(
            //     LanguageManager.getInstance().getText("NOT_SAVED"),
            //     LanguageManager.getInstance().getText("PICTURE_OR_NAME"),
            //     [
            //       {text: 'OK'},
            //     ],
            //     {cancelable: false},
            //   );
        }
    }

    saveData(goHome) {
        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setFullYear(tmpDateTime.getFullYear());
        if (this.state.edit) {
            DatabaseManager.getInstance().updateMealEvent(
                this.state.originalEventData.id,
                this.state.foodEntryName,
                this.state.selectedClassKey,
                this.state.selectedMealKey,
                this.state.foodRating,
                this.state.foodEntryNote,
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
        } else {
            DatabaseManager.getInstance().createMealEvent(
                this.state.foodEntryName,
                this.state.selectedClassKey,
                this.state.selectedMealKey,
                this.state.foodRating,
                this.state.foodEntryNote,
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
        // AchievementAddition
        if (this.state.selectedMealKey === 0) {
            if (this.state.selectedClassKey === 0) {
                EntryManager.AddEntry("GLUTENBREAKFAST");
            }
            if (this.state.selectedClassKey === 1) {
                EntryManager.AddEntry("GLUTENFREEBREAKFAST");
            }
            if (this.state.selectedClassKey === 2) {
                EntryManager.AddEntry("UNSUREBREAKFAST");
            }
        }
        if (this.state.selectedMealKey === 1) {
            if (this.state.selectedClassKey === 0) {

            }
            if (this.state.selectedClassKey === 1) {
                EntryManager.AddEntry("GLUTENFREELUNCH");
            }
        }
        if (this.state.selectedMealKey === 2) {
            if (this.state.selectedClassKey === 0) {

            }
            if (this.state.selectedClassKey === 1) {
                EntryManager.AddEntry("GLUTENFREEDINNER");
            }
        }
        AchievementManager.triggerAchievement("MEALADDED");
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
        this.setState({saveAsEmptyFoodDialogVisible: true});
    }

    handleBack() {
        this.setState({cancelSaveDialogVisible: false});
        this.setState({saveAsEmptyFoodDialogVisible: false});
        this.setState({deleteDialogVisible: false});
    };

    handleDiscard() {
        this.setState({cancelSaveDialogVisible: false});
        this.setState({saveAsEmptyFoodDialogVisible: false});
        this.navigateHome()
    };

    handleDeleteButton = () =>{
        this.setState({deleteDialogVisible: true});
    };

    handleDelete = () =>{
        this.state.deleteThisEntry(this.state.eventId);
        this.props.navigation.goBack();
    };


    toggleShowFoodInformation = () => {
        this.setState({showFoodInformation: !this.state.showFoodInformation})
    }

    addInformationLayout(layout) {
        this.setState({informationPosition: layout});
    }

    render() {
        console.log("state:", this.state)
        return (
            //extraScrollHeight not supoorted out-of-the-box in android see here https://github.com/AyushAppin/react-native-keyboard-aware-scroll-view
            <>
                <SafeAreaView style={{flex: 0, backgroundColor: themeColor}}/>
                <KeyboardAwareScrollView style={{backgroundColor: "#FFFFFF"}} extraScrollHeight={20}
                                         scrollEnabled={true} enableAutomaticScroll={true}
                                         keyboardShouldPersistTaps="handled">
                    <HeaderBanner color={themeColor}
                                  imageSource={require('../assets/images/FoodTracker/meal_icon.png')}/>
                    <HorizontalLineWithText color={themeColor} text={LanguageManager.getInstance().getText("DATE")}/>
                    <DayPicker ref={component => this._dayChooser = component} textString="SYMPTOM_OCCURED"
                               dateAndTime={this.state.selectedDateAndTime} onDateChanged={this.dateEditedHandler}/>
                    <HorizontalLineWithText color={themeColor} text={LanguageManager.getInstance().getText("TIME")}/>
                    <TimePicker ref={component => this._timePicker = component} textString="EATEN_AT"
                                dateAndTime={this.state.selectedDateAndTime} onTimeChanged={this.timeEditedHandler}/>
                    <HorizontalLineWithText iconClickEvent={this.toggleShowFoodInformation} color={themeColor}
                                            text={LanguageManager.getInstance().getText("TYPES")}/>
                    <View
                        onLayout={event => {
                            const layout = event.nativeEvent.layout;
                            this.addInformationLayout(layout);
                        }}
                    />
                    <FoodTrackerSymbolGroup color={themeColor}
                                            selectedID={this.state.selectedMealKey}
                                            onChancedId={this.mealChangedHandler}/>
                    <HorizontalLineWithText color={themeColor}
                                            text={LanguageManager.getInstance().getText("MEAL_NAME")}/>
                    <View style={styles.containerPadding}>
                        <TextInputSingleLine color={themeColor}
                                             ref={component => this._name = component}
                                             onTextChanged={this.nameEditedHandler}
                                             style={{Top: 10}}
                                             placeholderText={LanguageManager.getInstance().getText("MEAL_NAME_PLACEHOLDER")}
                                             preText={this.state.foodEntryName}
                        />
                    </View>
                    <HorizontalLineWithText color={themeColor} text={LanguageManager.getInstance().getText("IMAGE")}/>
                    <View style={{alignItems: 'center'}}>
                        <FoodDiaryImageEdit color={themeColor} navigation={this.props.navigation}
                                            snapshot = {this.state.photo}
                                            onPictureTaken={(image) => this.setState({photo: image, modified: true})}/>
                    </View>
                    <HorizontalLineWithText color={themeColor}
                                            text={LanguageManager.getInstance().getText("MEAL_GLUTEN")}/>
                    <FoodTrackerSymbolClassGroup color={themeColor} selectedID={this.state.selectedClassKey}
                                                 onChancedId={this.classChangedHandler}/>
                    <HorizontalLineWithText color={themeColor}
                                            text={LanguageManager.getInstance().getText("MEAL_NOTES")}
                                            style={{Top: 10}}/>
                    <NoteEdit color={themeColor}
                              ref={component => this._noteEdit = component}
                              note={this.state.foodEntryNote}
                              onTextChanged={this.noteEditedHandler}
                              style={{Top: 10}}
                              placeholderText={LanguageManager.getInstance().getText("MEAL_NOTES_PLACEHOLDER")}
                    />

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
                            {this.state.edit &&  <TouchableHighlight style={styles.buttonSaveAndCancel} onPress={this.handleDeleteButton}>
                                <Text style={{textAlign: 'center', color: '#707070'}}>Delete</Text>
                            </TouchableHighlight> }
                        </View>
                    </View>

                    {this.state.showFoodInformation &&
                    <FoodInformation color={themeColor} position={this.state.informationPosition}/>
                    }

                    <View>
                        <Dialog.Container visible={this.state.saveAsEmptyFoodDialogVisible}>
                            <Dialog.Title>{LanguageManager.getInstance().getText("SAVE_EMPTY_FOOD")}</Dialog.Title>
                            <Dialog.Description>
                                {LanguageManager.getInstance().getText("WANT_TO_SAVE_EMPTY_FOOD")}
                            </Dialog.Description>
                            <Dialog.Button label={LanguageManager.getInstance().getText("CONTINUE_EDITING")}
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
                            <Dialog.Button label={LanguageManager.getInstance().getText("CONTINUE_EDITING")}
                                           onPress={() => this.handleBack()}/>
                            <Dialog.Button label={LanguageManager.getInstance().getText("DISCARD")}
                                           onPress={() => this.handleDiscard()}/>
                        </Dialog.Container>
                    </View>
                    <View>
                        <Dialog.Container visible={this.state.deleteDialogVisible}>
                            <Dialog.Title>{LanguageManager.getInstance().getText("DELETE")}</Dialog.Title>
                            <Dialog.Description>
                                {LanguageManager.getInstance().getText("DO_YOU_WANT_TO_DELETE")}
                            </Dialog.Description>
                            <Dialog.Button label={LanguageManager.getInstance().getText("No")}
                                           onPress={() => this.handleBack()}/>
                            <Dialog.Button label={LanguageManager.getInstance().getText("YES")}
                                           onPress={() => this.handleDelete()}/>
                        </Dialog.Container>
                    </View>
                </KeyboardAwareScrollView>
            </>
        )
    }
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
    },
    containerPadding: {
        paddingLeft: 20,
        paddingRight: 20,
    },
});