import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import MenuButton from "../../MenuButton";
import InitWardrobeNavigator from "./WardrobeComponents/wardrobeNavigation/InitWardrobeNavigator";
import {
  Avatar,
  Piece,
} from "../avataaars-lib/react-native-avataaars/dist";
import styled from "styled-components/native";

import { observer } from "mobx-react";
import store from "../manager/GlutenBuddyStore";
import emotionStore from "../../../manager/buddyManager/EmotionStore";

import AchievementManager from "../manager/AchievementManager";
import * as Progress from "react-native-progress";
import FlashMessage from "react-native-flash-message";


tickle = 0;

@observer
export default class Wardrobe extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Wardrobe",
  });
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    var score = await AchievementManager.getLevelPoints();
    var level = await AchievementManager.getCurrentLevel();
    store.setCurrentLevel(level);
    var levelBounds = await AchievementManager.getCurrentLevelBounds();
    levelBounds[0] = Math.round(levelBounds[0]);
    levelBounds[1] = Math.round(levelBounds[1]);
    store.setThisLevelBegin(levelBounds[0]);
    store.setThisLevelEnd(levelBounds[1]);
    let progressPercent = this.calcValuesForProgressBar(levelBounds, score);
    store.setProgressBarProgress(progressPercent);
    store.setScore(score);
  }

  onPopupEvent(eventName, index) {
    if (eventName !== "itemSelected") {
      return;
    }

    switch (index) {
      case 0:
        this.props.navigation.navigate("Settings");
        break;
      // case 1: this.props.navigation.navigate('Camera'); break;
      case 1:
        this.props.navigation.navigate("Gear");
        break;
      default:
        this.props.navigation.navigate("Debug");
        break;
    }
  }

  render() {
    return (
      <View style={styles.outerView}>
        <ImageBackground
          source={require("../../../assets/images/bg_celiac.png")}
          style={styles.backgroundimage}
          imageStyle={{ opacity: 0.1 }}
        >
          <View style={styles.innerView}>
            <Text>
              Score: {store.score} / {store.thisLevelEnd}
            </Text>
            <Progress.Bar
              style={styles.progressbar}
              progress={store.progressBarProgress}
              width={200}
              height={15}
            />
          </View>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => this.onAvatarClick()}
          >
            <Avatar
              style={styles.avatar}
              size={store.size}
              avatarStyle="Transparent"
              topType={store.topType}
              accessoriesType={store.accessoriesType}
              hairColor={store.hairColor}
              facialHairType={store.facialHairType}
              clotheType={store.clotheType}
              clotheColor={store.clotheColor}
              eyeType={emotionStore.eyeType}
              eyebrowType={emotionStore.eyebrowType}
              mouthType={emotionStore.mouthType}
              skinColor={store.skinColor}
            />
          </TouchableOpacity>
        </ImageBackground>
        <InitWardrobeNavigator
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></InitWardrobeNavigator>
        <MenuButton navigation={this.props.navigation} />
        <FlashMessage position="bottom" />
      </View>
    );
  }
  async getCurrentLevel() {
    AchievementManager.getCurrentLevel();
  }

  async getDBPoints() {
    var points = await AchievementManager.getLevelPoints();
    return points;
  }

  calcValuesForProgressBar(bounds, currentScore) {
    let progressThisLevel = currentScore - bounds[0];
    let progressPercent =
      Math.round(progressThisLevel + Number.EPSILON) / (bounds[1] - bounds[0]);
    return progressPercent;
  }
  onAvatarClick() {
    if (tickle % 3 == 0) {
      //console.log("Hey, Stop That!")
      store.setMouthType("Smile");
    } else if (tickle % 3 == 1) {
      store.setMouthType("Serious");
    } else if (tickle % 3 == 2) {
      store.setMouthType("Sad");
    }
    // for more options visit https://getavataaars.com/
    tickle++;
  }
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  popup: {
    position: "absolute",
    right: 40,
    top: 40,
  },
  gluton: {
    //position: 'absolute',
    top: "25%",
    //left: '25%',
    width: "100%",
    alignItems: "center",
  },
  outerView: {
    flex: 1,
  },
  avatar: {
    flex: 1,
  },
  innerView: {
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  progressbar: {
    width: "44%",
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundimage: {
    resizeMode: "cover",
    //backgroundColor:'rgba(255,0,0,0.5)', //
    //opacity: 0.5
  },
});
