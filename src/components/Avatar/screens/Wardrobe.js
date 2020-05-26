import React, { Component } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";
import WardrobeTabCategories from "./WardrobeComponents/WardrobeTabCategories";
import { Avatar } from "./../avataaars-lib/react-native-avataaars";
import { observer } from "mobx-react";
import store from "../manager/GlutenBuddyStore";
import AchievementManager from "./../manager/AchievementManager";
import * as Progress from "react-native-progress";
import FlashMessage from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
  padding: 0px 20px;
  backgroundcolor: #7fff00;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 23px;
  font-weight: bold;
`;

const SlideScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  horizontal: false,
})``;

tickle = 0;

@observer
class Wardrobe extends Component {
  constructor(props) {
    super(props);
    this.state = { showAlert: false };
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

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  render() {
    const { showAlert } = this.state;
    return (
      <NavigationContainer
        independent={true}
        style={{ backgroundColor: "blue" }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>
            Score: {store.score} / {store.thisLevelEnd}
          </Text>
          <Progress.Bar
            progress={store.progressBarProgress}
            width={200}
            height={15}
          />
          <TouchableOpacity onPress={() => this.onAvatarClick()}>
            <Avatar
              size={store.size}
              avatarStyle="Transparent"
              topType={store.topType}
              accessoriesType={store.accessoriesType}
              hairColor={store.hairColor}
              facialHairType={store.facialHairType}
              clotheType={store.clotheType}
              clotheColor={store.clotheColor}
              eyeType={store.eyeType}
              eyebrowType={store.eyebrowType}
              mouthType={store.mouthType}
              skinColor={store.skinColor}
            />
          </TouchableOpacity>
        </View>
        <WardrobeTabCategories></WardrobeTabCategories>
        <FlashMessage position="bottom" />
      </NavigationContainer>
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

export default Wardrobe;
