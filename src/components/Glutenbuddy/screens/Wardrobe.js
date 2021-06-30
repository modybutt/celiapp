import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import InitWardrobeNavigator from "./WardrobeComponents/wardrobeNavigation/InitWardrobeNavigator";
import WardrobeCustomizer from "./WardrobeComponents/WardrobeCustomizer";
import { Avatar } from "../avataaars-lib/react-native-avataaars/dist";
import { observer } from "mobx-react";
import store from "../../../manager/buddyManager/GlutenBuddyStore";
import emotionStore from "../../../manager/buddyManager/EmotionStore";
import Colors from "../../../constants/Colors";

import AchievementManager from "../../../manager/buddyManager/AchievementManager";
import FlashMessage from "react-native-flash-message";
import CeliLogger from '../../../analytics/analyticsManager';
import Interactions from '../../../constants/Interactions';

@observer
export default class Wardrobe extends React.Component {
  static navigationOptions = {
    title: 'Customize Andy',
    headerStyle: {
      backgroundColor: Colors.mainscreenColor,
    },
    headerTintColor: Colors.textOnMainScreenColor,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };


  constructor(props) {
    super(props);
    this.state = {currentPoints:0, levelPercentage:0};
    this.updatePoints();
  }

  async updatePoints() {
    let currentPoints = await AchievementManager.getLevelPoints();
    let currentLevelBounds = await AchievementManager.getCurrentLevelBounds();
    let currentLevelName = await AchievementManager.getCurrentLevelName();
    let span = currentLevelBounds[1]-currentLevelBounds[0];
    let percentage = span > 0 ? (currentPoints-currentLevelBounds[0])*100/span : 0;
    this.setState({points:currentPoints, levelBounds:currentLevelBounds, levelName:currentLevelName, levelPercentage:percentage});
    console.log(this.state);
  }

  componentDidMount() {
    CeliLogger.addLog("Wardrobe", Interactions.OPEN);
  }

  componentWillUnmount() {
    CeliLogger.addLog("Wardrobe", Interactions.CLOSE);
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

        <View style={styles.iconavatargroup}>
          {/** 
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => this.props.navigation.navigate("Challenges")}
          >
            <Image
              style={styles.images}
              source={require("../assets/challenges_medium.png")}
            />
          </TouchableOpacity> */}
            <TouchableOpacity activeOpacity={1}
              style={styles.touchableAvatar}
              onPress={() => (CeliLogger.addLog("Wardrobe", Interactions.TAP + " not supported"))}
            >
              <Avatar
                size={store.size}
                avatarStyle={store.avatarStyle}
                topType={store.topType}
                accessoriesType={store.accessoriesType}
                hairColor={store.hairColor}
                facialHairType={store.facialHairType}
                facialHairColor={store.facialHairColor}
                clotheType={store.clotheType}
                clotheColor={store.clotheColor}
                graphicType={store.graphicType}
                eyeType={emotionStore.eyeType}
                eyebrowType={emotionStore.eyebrowType}
                mouthType={emotionStore.mouthType}
                skinColor={store.skinColor}
              />
            </TouchableOpacity>
            {/** 
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => this.props.navigation.navigate("Achievements")}
          >
            <Image
              style={styles.images}
              source={require("../assets/flag_medium.png")}
            />
            </TouchableOpacity>*/}
        
        </View> 
        <View style={styles.avatarLevel}>
             {/**<Image source={require("../../../assets/images/experiencePoint.png")} style={styles.experiencePointStyle}/> */}
             <Text style={styles.avatarLevelText}>{this.state.levelName}</Text>
             <View style={styles.avatarLevelView}>
              <View style={[styles.avatarLevelBar, {width:this.state.levelPercentage}]} />
             </View>
        </View>
        <WardrobeCustomizer />
        { /** 
        <InitWardrobeNavigator
          style={styles.navigator}>
        </InitWardrobeNavigator>
        <MenuButton navigation={this.props.navigation} /> */ }
        <FlashMessage position="top" duration={5000} />
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
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    backgroundColor: 'white'
  },
  touchableButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.33,
    alignSelf: "center"
  },
  touchableAvatar: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.4,
  },
  iconavatargroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  avatarLevel: {
    height:28,
    marginBottom:15,
    marginTop: -10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  experiencePointStyle: {
    alignSelf: "center",
    backgroundColor: "white"
  },
  avatarLevelView: {
    margin:5,
    width:100,
    height: 14,
    borderColor: Colors.mainscreenColor,
    borderWidth: 1,
  },
  avatarLevelBar: {
    width:0,
    height: 12,
    backgroundColor: Colors.mainscreenColor,
    borderWidth: 0,
  },
  avatarLevelText: {
    color: Colors.mainscreenColor
  },
  navigator: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    width: 20,
    height: 20,
    resizeMode: "center",
    alignSelf: "center"
  },
});
