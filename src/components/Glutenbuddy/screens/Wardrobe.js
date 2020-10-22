import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import InitWardrobeNavigator from "./WardrobeComponents/wardrobeNavigation/InitWardrobeNavigator";
import { Avatar } from "../avataaars-lib/react-native-avataaars/dist";
import { observer } from "mobx-react";
import store from "../../../manager/buddyManager/GlutenBuddyStore";
import emotionStore from "../../../manager/buddyManager/EmotionStore";

import AchievementManager from "../../../manager/buddyManager/AchievementManager";
import FlashMessage from "react-native-flash-message";
import CeliLogger from '../../../analytics/analyticsManager';

@observer
export default class Wardrobe extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Wardrobe",
  });
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    CeliLogger.addLog(this.constructor.name, "opened");
  }

  componentWillUnmount() {
    CeliLogger.addLog(this.constructor.name, "closed");
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
          <TouchableOpacity
            style={styles.touchable}
            //onPress={() => this.onAvatarClick()}
          >
            <Avatar
              style={styles.avatar}
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
        </ImageBackground>
        <InitWardrobeNavigator
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></InitWardrobeNavigator>
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
