import React from 'react';
import { SafeAreaView, TouchableHighlight, StyleSheet, Image, ScrollView, View, Text, Button } from 'react-native';
import DatabaseManager from '../manager/DatabaseManager';
import GlutonManager from '../manager/GlutonManager';
import HeaderBanner from '../components/HeaderBanner';
import Layout from '../constants/Layout';
import moment from 'moment';

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
                        <SafeAreaView style={{ flex: 0, backgroundColor: 'red' }} />
                        <ScrollView style={{ backgroundColor: "#fff" }}>
                            <HeaderBanner color={'red'} imageSource={require('../assets/images/glutenfree.png')} />
                            <TopPart leftButtonClicked={this.navigateHome} rightButtonClicked={() => this.deleteEntry()} />
                            <View style={styles.container}>
                                <View style={styles.leftWrapper}>
                                    <Image source={Image.resolveAssetSource(image)} style={styles.iconImage}></Image>
                                </View>
                                <View style={styles.leftWrapper}>
                                    <View style={styles.textInfo}>
                                        <Text style={[styles.entryText, styles.entryTitle]}>{time}</Text>
                                        <Border color={color} />
                                        <Text style={[styles.entryText, styles.entrySubtitle]}>
                                            You register {objData.severity} {objData.symptomID} at {smallTime}. You noted: "{objData.note}"
                                            </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </>
                );

            }
            case Events.Food: {
                let color = '#3398DE';
                image = this.getFoodImageSource(objData.type);
                return (
                    <>
                        <SafeAreaView style={{ flex: 0, backgroundColor: 'red' }} />
                        <ScrollView style={{ backgroundColor: "#fff" }}>
                            <HeaderBanner color={'red'} imageSource={require('../assets/images/glutenfree.png')} />
                            <TopPart leftButtonClicked={this.navigateHome} rightButtonClicked={() => this.deleteEntry()} />
                            <View style={styles.container}>
                                <View style={styles.leftWrapper}>
                                    <Image source={Image.resolveAssetSource(image)} style={styles.iconImage}></Image>
                                </View>
                                <View style={styles.leftWrapper}>
                                    <View style={styles.textInfo}>
                                        <Text style={[styles.entryText, styles.entryTitle]}>{time}</Text>
                                        <Border color={color} />
                                        <Text style={[styles.entryText, styles.entrySubtitle]}>
                                            You ate a {objData.tag} named {objData.name} at {smallTime}. You think it contained {objData.type}. You noted: "{objData.note}"
                                            </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </>
                );
            }
            case Events.GIP: {
                let color = '#FF8D1E';
                image = this.getGipImageSource(objData.result);
                return (
                    <>
                        <SafeAreaView style={{ flex: 0, backgroundColor: 'red' }} />
                        <ScrollView style={{ backgroundColor: "#fff" }}>
                            <HeaderBanner color={'red'} imageSource={require('../assets/images/glutenfree.png')} />
                            <TopPart leftButtonClicked={this.navigateHome} rightButtonClicked={() => this.deleteEntry()} />
                            <View style={styles.container}>
                                <View style={styles.leftWrapper}>
                                    <Image source={Image.resolveAssetSource(image)} style={styles.iconImage}></Image>
                                </View>
                                <View style={styles.leftWrapper}>
                                    <View style={styles.textInfo}>
                                        <Text style={[styles.entryText, styles.entryTitle]}>{time}</Text>
                                        <Border color={color} />
                                        <Text style={[styles.entryText, styles.entrySubtitle]}>
                                            You uploaded a photo of your GIP stick at {smallTime} and according to you it said {objData.result} found. You noted: "{objData.note}"
                                            </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.photoContainer}>
                                <Image source={objData.photo} style={styles.photo}></Image>
                            </View>
                        </ScrollView>
                    </>
                );
            }
            case Events.Emotion: {
                let color = '#9958B7';
                let image = this.getEmotionImageSource(objData.type);
                return (
                    <>
                        <SafeAreaView style={{ flex: 0, backgroundColor: 'red' }} />
                        <ScrollView style={{ backgroundColor: "#fff" }}>
                            <HeaderBanner color={'red'} imageSource={require('../assets/images/glutenfree.png')} />
                            <TopPart leftButtonClicked={this.navigateHome} rightButtonClicked={() => this.deleteEntry()} />
                            <View style={styles.container}>
                                <View style={styles.leftWrapper}>
                                    <Image source={Image.resolveAssetSource(image)} style={styles.iconImage}></Image>
                                </View>
                                <View style={styles.leftWrapper}>
                                    <View style={styles.textInfo}>
                                        <Text style={[styles.entryText, styles.entryTitle]}>{time}</Text>
                                        <Border color={color} />
                                        <Text style={[styles.entryText, styles.entrySubtitle]}>
                                            You felt {objData.type} and your notes were {objData.note}.
                                            </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </>
                );
            }
        }
    }
}

const TopPart = ({ leftButtonClicked, rightButtonClicked }) =>
    <View>
        <View style={styles.informationContainer}>
            <View style={styles.informationSubContainer}>
                <Text style={styles.bigText}>Are your sure you want to delete this entry?</Text>
                <Text style={styles.text}>This will effect your daily goals and weekly report.</Text>
            </View>
        </View>

        <View style={styles.buttonContainer}>
            <View style={styles.buttonSubContainer}>
                <TouchableHighlight style={styles.button} onPress={leftButtonClicked}>
                    <Text style={{ textAlign: 'center', color: '#707070' }}>cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={rightButtonClicked}>
                    <Text style={{ textAlign: 'center', color: '#707070' }}>save</Text>
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
            height: window.height * 0.12,
            //backgroundColor: '#f7f7f7',
            marginBottom: 5
        },
        leftWrapper:
        {
            marginLeft: 20
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
            height: '50%',
            width: '50%',
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
            borderColor: 'red',
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
            marginTop:20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        photo: {
            width:150,
            aspectRatio: 1,
            resizeMode: 'contain',
        }
    });