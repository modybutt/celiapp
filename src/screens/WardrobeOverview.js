import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import MenuButton from "../components/MenuButton";
import InitWardrobeNavigator from "../components/Glutenbuddy/screens/WardrobeComponents/wardrobeNavigation/InitWardrobeNavigator";
import {
  Avatar,
  Piece,
} from "../components/Glutenbuddy/avataaars-lib/react-native-avataaars/dist";
import styled from "styled-components/native";
import { createStackNavigator, createAppContainer } from "react-navigation";

//import WardrobeTabCategories from "./WardrobeComponents/WardrobeTabCategories";
//import { Avatar } from "./../avataaars-lib/react-native-avataaars";
import { observer } from "mobx-react";
import store from "../components/Glutenbuddy/manager/GlutenBuddyStore";
import emotionStore from "../components/Glutenbuddy/manager/EmotionStore";
import Wardrobe from "./AvatarScreen";
import LanguageManager from "../manager/LanguageManager";
//import TODEL from './WTODEL';
//import ActionButton from 'react-native-circular-action-menu';
import Icon from "react-native-vector-icons/Ionicons";

// Screens:
import Challenges from "../components/Glutenbuddy/screens/Challenges";
import Achievements from "../components/Glutenbuddy/screens/Achievements";
import ChallengesTest from "../components/Glutenbuddy/screens/ChallengesTest";

tickle = 0;

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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  wardrobe: {
    flex: 1,
    /*width: '100%', 
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',*/
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  parent: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",

  },
  touchable: {
    width: "34%",
    margin: "4%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#669933",
  },
  child: {
    //flex:1,
    width: "100%",
    height: "100%",
  },
  images: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundimage: {
    width: '100%', height: '100%',
    resizeMode: "cover",
    //backgroundColor:'rgba(255,0,0,0.5)', //
    //opacity: 0.5
  },
  centerComponent: {
    alignItems: "center",
    justifyContent: "center",
  },
});

@observer
class WardrobeOverview extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Avatar Menu", //LanguageManager.getInstance().getText("TRACKINGS")
  });

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/avatar_menu/landscape_background.png")}
          style={styles.backgroundimage}
          imageStyle={{ opacity: 0.3 }}
        >
          <TouchableOpacity style={styles.centerComponent}
            onPress={() => this.props.navigation.navigate("Wardrobe")}
          >
            <Avatar
              size={store.size}
              avatarStyle="Transparent"
              topType={store.topType}
              hairColor={store.hairColor}
              facialHairType={store.facialHairType}
              clotheType={store.clotheType}
              clotheColor={store.clotheColor}
              skinColor={store.skinColor}
              accessoriesType={store.accessoriesType}
              eyeType={emotionStore.eyeType}
              eyebrowType={emotionStore.eyebrowType}
              mouthType={emotionStore.mouthType}
            />
          </TouchableOpacity>

          <Button
            title="Go to Avatar screen"
            onPress={() => this.props.navigation.navigate("Wardrobe")}
          />
          <View style={styles.centerComponent}>
          <View style={styles.parent}>
            <TouchableOpacity
              style={[styles.touchable]}
              onPress={() => this.props.navigation.navigate("Wardrobe")}
            >
              <Image
                style={styles.images}
                source={require("../assets/images/avatar_menu/wardrobe.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touchable]}
              onPress={() => this.props.navigation.navigate("Challenges")}
            >
              <Image
                style={styles.images}
                source={require("../assets/images/avatar_menu/challenges.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touchable]}
              onPress={() => this.props.navigation.navigate("Achievements")}
            >
              <Image
                style={styles.images}
                source={require("../assets/images/avatar_menu/trophy.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touchable]}
              onPress={() => this.props.navigation.navigate("ChallengesTest")}
            >
              <Image
                style={styles.images}
                source={require("../assets/images/avatar_menu/tests.png")}
              />
            </TouchableOpacity>
          </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  /*
     {/** backgroundColor: "#339966" */
  /** backgroundColor: "#996633" */
  /** backgroundColor: "#669933" */
  /*onAvatarClick() {
    
    // TODO: open Avatar Wardrobe!!!
    console.log("open avatar wardrobe!!");
    if (tickle % 5 == 0) {
      emotionStore.setSuperHappy();
    } else if (tickle % 5 == 1) {
      emotionStore.setHappy();
    } else if (tickle % 5 == 2) {
      emotionStore.setNeutral();
    } else if (tickle % 5 == 3) {
      emotionStore.setSad();
    } else if (tickle % 5 == 4) {
      emotionStore.setSuperSad();
    }
    // for more options visit https://getavataaars.com/
    tickle++;
  }*/
}

class DisplayWardrobe extends React.Component {
  render() {
    return (
      <View style={styles.wardrobe}>
        <Wardrobe style={styles.wardrobe} />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Overview: WardrobeOverview,
    Wardrobe: DisplayWardrobe,
    Challenges: Challenges,
    Achievements: Achievements,
    ChallengesTest: ChallengesTest,
  },
  {
    initialRouteName: "Overview",
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
