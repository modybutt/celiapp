import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import InitWardrobeNavigator from "./WardrobeComponents/wardrobeNavigation/InitWardrobeNavigator";
import { Avatar } from "../avataaars-lib/react-native-avataaars/dist";
import { observer } from "mobx-react";
import store from "../../../manager/buddyManager/GlutenBuddyStore";
import emotionStore from "../../../manager/buddyManager/EmotionStore";

import AchievementManager from "../../../manager/buddyManager/AchievementManager";
import FlashMessage from "react-native-flash-message";
import CeliLogger from '../../../analytics/analyticsManager';
import Interactions from '../../../constants/Interactions';

@observer
export default class Wardrobe extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Wardrobe",
  });
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    CeliLogger.addLog(this.constructor.name, Interactions.OPEN);
  }

  componentWillUnmount() {
    CeliLogger.addLog(this.constructor.name, Interactions.CLOSE);
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
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => this.props.navigation.navigate("Challenges")}
          >
            <Image
              style={styles.images}
              source={require("../assets/challenges_medium.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}
            style={styles.touchableAvatar}
            onPress={() => (CeliLogger.addLog(this.constructor.name, Interactions.TAP + " not supported"))}
          >
            <Avatar
              size={store.size}
              avatarStyle={store.avatarStyle}
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
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => this.props.navigation.navigate("Achievements")}
          >
            <Image
              style={styles.images}
              source={require("../assets/flag_medium.png")}
            />
          </TouchableOpacity>
        </View>
        <InitWardrobeNavigator
          style={styles.navigator}>
        </InitWardrobeNavigator>
        {/** <MenuButton navigation={this.props.navigation} />*/}
        <FlashMessage position="bottom" duration={5000} />
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
    flex: 0.75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  navigator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    width: 80,
    height: 80,
    resizeMode: "center",
    alignSelf: "center"
  },
});
