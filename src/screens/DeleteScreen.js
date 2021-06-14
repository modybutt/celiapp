import React from 'react';
import { SafeAreaView, TouchableHighlight, StyleSheet, Image, ScrollView, View, Text, Button } from 'react-native';
import DatabaseManager from '../manager/DatabaseManager';
import GlutonManager from '../manager/GlutonManager';
import HeaderBanner from '../components/HeaderBanner';
import Layout from '../constants/Layout';
import moment from 'moment';
import avatarAndy from "../assets/images/avatar_menu/avatar_lincy.png";
import { Emotion, Severity, Symptoms } from '../../constants/Events';

import {
    images as symptom_images
} from '../components/SymptomTracker/SymptomIconButtonConstants';

import {
    images as food_images
} from '../components/FoodDiary/FoodTrackerClassConstants';

import {
    images as emotion_images
} from '../components/EmoteTracker/EmoteTrackerConstants';

import {
    images as gip_images
} from '../components/GipTracker/GipTrackerClassConstants';

const specialColor = "#E91F64";

export default class DeleteScreen extends React.Component {

    state = {
        event: this.props.navigation.getParam("event"),
    }


    deleteEntry() {
        DatabaseManager.getInstance().deleteEvent(this.state.event.id,
            (error) => { alert(error) },
            () => {
                GlutonManager.getInstance().setMessage(4);
                this.props.navigation.goBack();
            }
        );
    }

    navigateHome = () => {
        this.props.navigation.goBack();
    }

    getFoodImageSource(id) {
        switch (id) {
            case 0:
                return food_images.gluten.uri;
            case 1:
                return food_images.nogluten.uri;
            case 2:
                return food_images.noidea.uri;
        }
    }

    getGipImageSource(id) {
        switch (id) {
            case 0:
                return gip_images.gluten.uri;
            case 1:
                return gip_images.nogluten.uri;
            case 2:
                return gip_images.noidea.uri;
        }
    }

    getEmotionImageSource(id) {
        switch (id) {
            case 1: return emotion_images.unhappy.uri;
            case 2: return emotion_images.slightlyUnhappy.uri;
            case 3: return emotion_images.neither.uri;
            case 4: return emotion_images.slightlyHappy.uri;
            case 5: return emotion_images.happy.uri;
        }

    }
    getSymptomImageSource(id) {
        let image = null;
        switch (id) {
            case 0:
                image = symptom_images.id0.uri
                break;
            case 1:
                image = symptom_images.id1.uri
                break;
            case 2:
                image = symptom_images.id2.uri
                break;
            case 3:
                image = symptom_images.id3.uri
                break;
            case 4:
                image = symptom_images.id4.uri
                break;
            case 5:
                image = symptom_images.id5.uri
                break;
            case 6:
                image = symptom_images.id6.uri
                break;
            case 7:
                image = symptom_images.id7.uri
                break;
            case 8:
                image = symptom_images.id8.uri
                break;
            case 9:
                image = symptom_images.id9.uri
                break;
            case 10:
                image = symptom_images.id10.uri
                break;
            case 11:
                image = symptom_images.id11.uri
                break;
            case 12:
                image = symptom_images.id12.uri
                break;
        }
        return image;
    }
    
    symptomToText(id) {
      switch (id) {
        case Symptoms.NO_SYMPTOMS.id: return "No Symptom";
        case Symptoms.BLOATING.id: return "Bloating";
        case Symptoms.DIARRHEA.id: return "Diarrhea";
        case Symptoms.HEADACHE.id: return "Headache";
        case Symptoms.IRRITABILITY.id: return "Irritability";
        case Symptoms.ABDOMINAL_DISCOMFORT.id: return "Abdominal Discomfort";
        case Symptoms.NAUSEA.id: return "Nausea";
        case Symptoms.LOSS_OF_APPETITE.id: return "Loss of Appetite";
        case Symptoms.RUMBLING_IN_STOMACH.id: return "Rumbling in Stomach";
        case Symptoms.TENESMUS.id: return "Tenesmus";
        case Symptoms.HUNGER_PAINS.id: return "Hunger Pains";
        case Symptoms.LOW_ENERGY.id: return "Low Energy";
        case Symptoms.FOOD_CRAVING.id: return "Food Craving";
      }
    }

    severityToText(id) {
      switch (id) {
        case Severity.LOW: return "Mild";
        case Severity.MODERATE: return "Moderate";
        case Severity.SEVERE: return "Severe";
      }
    }
    
    mealTypeToText(id) {
      switch (id) {
        case Severity.LOW: return "Mild";
        case Severity.MODERATE: return "Moderate";
        case Severity.SEVERE: return "Severe";
      }
    }
    
    energyLevelToText(id) {
      switch (id) {
        case Emotion.UNHAPPY: return "Very Low";
        case Emotion.SLIGHTLY_UNHAPPY: return "Low";
        case Emotion.NEUTRAL: return "Medium";
        case Emotion.SLIGHTLY_HAPPY: return "High";
        case Emotion.HAPPY: return "Very High";
      }
    }

    render() {
        let objData = JSON.parse(this.state.event.objData);
        let createdDate = moment(this.state.event.created);
        let time = createdDate.local().format('lll');
        let smallTime = createdDate.local().format('ll');
        switch (this.state.event.eventType) {
            case Events.Symptom: {
                const color = '#1DBBA0';
                image = this.getSymptomImageSource(objData.symptomID);

                return (
                    <>
                        <SafeAreaView style={{ flex: 0, backgroundColor: specialColor }} />
                        <HeaderBanner color={specialColor} imageSource={require('../assets/images/glutenfree.png')} />
                        <View style={styles.background}>
                            <ScrollView style={{ backgroundColor: "#fff" }}>
                                <TopPart />
                                <View style={styles.container}>
                                    <View style={styles.leftWrapper}>
                                        <Image source={Image.resolveAssetSource(image)} style={styles.iconImage}></Image>
                                    </View>
                                    <View style={styles.leftWrapper}>
                                        <View style={styles.textInfo}>
                                            <Text style={[styles.entryText, styles.entryTitle]}>{time}</Text>
                                            <Border color={color} />
                                            <Text style={[styles.entryText, styles.entrySubtitle]}>
                                                Symptom:{"\t"}{this.symptomToText(objData.symptomID)}{"\n"}
                                                Severity:{"\t"}{this.severityToText(objData.severity)}{"\n"}
                                                Note:{"\t\t"}{objData.note}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <BottomPart leftButtonClicked={this.navigateHome} rightButtonClicked={() => this.deleteEntry()} />
                            </ScrollView>
                        </View>
                    </>
                );

            }
            case Events.Food: {
                let color = '#3398DE';
                image = this.getFoodImageSource(objData.type);
                return (
                    <>
                        <SafeAreaView style={{ flex: 0, backgroundColor: specialColor }} />
                        <HeaderBanner color={specialColor} imageSource={require('../assets/images/glutenfree.png')} />
                        <View style={styles.background}>
                            <ScrollView style={{ backgroundColor: "#fff" }}>
                                <TopPart />
                                <View style={styles.container}>
                                    <View style={styles.leftWrapper}>
                                        <Image source={Image.resolveAssetSource(image)} style={styles.iconImage}></Image>
                                    </View>
                                    <View style={styles.leftWrapper}>
                                        <View style={styles.textInfo}>
                                            <Text style={[styles.entryText, styles.entryTitle]}>{time}</Text>
                                            <Border color={color} />
                                            <Text style={[styles.entryText, styles.entrySubtitle]}>
                                                Meal Name:{"\t"}{objData.name}{"\n"}
                                                Note:{"\t\t"}{objData.note}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <BottomPart leftButtonClicked={this.navigateHome} rightButtonClicked={() => this.deleteEntry()} />
                            </ScrollView>
                        </View>
                    </>
                );
            }
            case Events.GIP: {
                let color = '#FF8D1E';
                image = this.getGipImageSource(objData.result);
                return (
                    <>
                        <SafeAreaView style={{ flex: 0, backgroundColor: specialColor }} />
                        <HeaderBanner color={specialColor} imageSource={require('../assets/images/glutenfree.png')} />
                        <View style={styles.background}>
                            <ScrollView style={{ backgroundColor: "#fff" }}>
                                <TopPart />
                                <View style={styles.container}>
                                    <View style={styles.leftWrapper}>
                                        <Image source={Image.resolveAssetSource(image)} style={styles.iconImage}></Image>
                                    </View>
                                    <View style={styles.leftWrapper}>
                                        <View style={styles.textInfo}>
                                            <Text style={[styles.entryText, styles.entryTitle]}>{time}</Text>
                                            <Border color={color} />
                                            <Text style={[styles.entryText, styles.entrySubtitle]}>
                                              Note: {objData.note}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.photoContainer}>
                                        <Image source={objData.photo} style={styles.photo}></Image>
                                    </View>
                                </View>
                                <BottomPart leftButtonClicked={this.navigateHome} rightButtonClicked={() => this.deleteEntry()} />
                            </ScrollView>
                        </View>
                    </>
                );
            }
            case Events.Emotion: {
                let color = '#9958B7';
                let image = this.getEmotionImageSource(objData.type);
                return (
                    <>
                        <SafeAreaView style={{ flex: 0, backgroundColor: specialColor }} />
                        <HeaderBanner color={specialColor} imageSource={require('../assets/images/glutenfree.png')} />
                        <View style={styles.background}>
                            <ScrollView style={{ backgroundColor: "#fff" }}>
                                <TopPart />
                                <View style={styles.container}>
                                    <View style={styles.leftWrapper}>
                                        <Image source={Image.resolveAssetSource(image)} style={styles.iconImage}></Image>
                                    </View>
                                    <View style={styles.leftWrapper}>
                                        <View style={styles.textInfo}>
                                            <Text style={[styles.entryText, styles.entryTitle]}>{time}</Text>
                                            <Border color={color} />
                                            <Text style={[styles.entryText, styles.entrySubtitle]}>
                                                Energy Level:{"\t"}{this.energyLevelToText(objData.type)}{"\n"}
                                                Note:{"\t\t\t"}{objData.note}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <BottomPart leftButtonClicked={this.navigateHome} rightButtonClicked={() => this.deleteEntry()} />
                            </ScrollView>
                        </View>
                    </>
                );
            }
        }
    }
}

const TopPart = () =>
    <View>
        <View style={styles.avatarAndInformationContainer}>
            <Image style={styles.avatar} source={avatarAndy} />
            <View style={styles.informationContainer}>
                <View style={styles.informationSubContainer}>
                    <Text style={styles.bigText}>Are your sure you want to delete this entry?</Text>
                    <Text style={styles.text}>This will effect your daily goals and weekly report.</Text>
                </View>
            </View>
        </View>
    </View>

const BottomPart = ({ leftButtonClicked, rightButtonClicked }) =>
    <View>
        <View style={styles.buttonContainer}>
            <View style={styles.buttonSubContainer}>
                <TouchableHighlight style={styles.button} onPress={leftButtonClicked}>
                    <Text style={{ textAlign: 'center', color: '#707070' }}>cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={rightButtonClicked}>
                    <Text style={{ textAlign: 'center', color: '#707070' }}>delete</Text>
                </TouchableHighlight>
            </View>
        </View>
    </View>

const Border = ({ color }) =>
    <View style=
        {{
            marginTop: 8,
            marginBottom: 8,
            borderBottomWidth: 2,
            alignSelf: 'stretch',
            borderColor: color
        }}>
    </View>

const window = Layout.window;

const styles = StyleSheet.create
    ({
        container:
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: window.width,
            height: '40%',
            //backgroundColor: '#f7f7f7',
            marginBottom: 5,
        },
        leftWrapper:
        {
            marginLeft: 20,
        },
        textInfo:
        {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: window.width * 0.6
        },

        entryText:
        {
            color: '#000'
        },

        entryTitle:
        {
            fontSize: 22
        },

        entrySubtitle:
        {
            fontSize: 16
        },
        iconImage: {
            height: '15%',
            aspectRatio: 1,
            resizeMode: 'contain',
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
        button: {
            width: 90,
            height: 50,
            borderRadius: 3,
            backgroundColor: '#F7F7F7',
            justifyContent: 'center',
            alignItems: 'center'
        },
        informationContainer: {
            marginTop: 50,
            display: 'flex',
            alignItems: 'center',
        },
        informationSubContainer: {
            width: '80%',
            padding: 10,
            backgroundColor: '#AAA',
            borderWidth: 2,
            borderRadius: 3,
            borderColor: specialColor,
        },
        bigText: {
            fontSize: 22,
            color: '#FFF',
            paddingTop: 5,
            paddingBottom: 5,
        },
        text: {
            color: '#FFF',
            paddingTop: 5,
            paddingBottom: 5,
        },
        photoContainer: {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        photo: {
            width: '30%',
            aspectRatio: 1,
            resizeMode: 'contain',
        },
        background: {
            height: '90%',
            padding: 10,
            paddingBottom: 30,
            backgroundColor: specialColor,
        },
        avatar: {
            height: '20%',
            width: '20%',
            aspectRatio: 1,
            resizeMode: 'contain',
        },
        avatarAndInformationContainer:{
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
        }
    });