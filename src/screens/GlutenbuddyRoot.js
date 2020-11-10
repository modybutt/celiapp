import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import * as Progress from "react-native-progress";
import AchievementManager from "../manager/buddyManager/AchievementManager";

import MenuButton from "../components/MenuButton";
import { Avatar } from "../components/Glutenbuddy/avataaars-lib/react-native-avataaars/dist";
import {
  createStackNavigator,
  createAppContainer,
  NavigationEvents,
} from "react-navigation";

import { observer } from "mobx-react";
import store from "../manager/buddyManager/GlutenBuddyStore";
import emotionStore from "..//manager/buddyManager/EmotionStore";
import Wardrobe from "../components/Glutenbuddy/screens/Wardrobe";

// Screens:
import Challenges from "../components/Glutenbuddy/screens/Challenges";
import Achievements from "../components/Glutenbuddy/screens/Achievements";
import ChallengesTest from "../components/Glutenbuddy/screens/ChallengesTest";

// required for Navigation:
import EvaluationScreen from "../screens/EvaluationScreen";
import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import DebugScreen from "../screens/DebugScreen";
import SymptomTrackerScreen from "../screens/SymptomTrackerScreen";
import FoodDiaryScreen from "../screens/FoodDiaryScreen";
import GIPScreen from "../screens/GIPScreen";
import EmoteTrackerScreen from "../screens/EmoteTrackerScreen";
import SymptomViewScreen from "../screens/SymptomViewScreen";
import FoodViewScreen from "../screens/FoodViewScreen";
import GIPViewScreen from "../screens/GIPViewScreen";
import EmoteViewScreen from "../screens/EmoteViewScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CameraScreen from "../screens/CameraScreen";
import GearScreen from "../screens/GearScreen";
import SymptomTrackerMoreSymptomsScreen from "../screens/SymptomTrackerMoreSymptomsScreen";
import SymptomTrackerAddNewScreen from "../screens/SymptomTrackerAddNewScreen";
import EmoteTrackerSymbol from "../components/EmoteTracker/EmoteTrackerSymbol";
import EmotionDisplayIcon from "../components/EmotionDisplayIcon";
import loggingStore from "../../src/manager/buddyManager/LoggingStore";
import CeliLogger from '../analytics/analyticsManager';
import { showMessage } from "react-native-flash-message";

@observer
export default class GlutenbuddyRoot extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Glutenbuddy",
  });

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      CeliLogger.addLog(this.constructor.name, "tapped");
    });
  }

  async refreshState() {
    var score = await AchievementManager.getLevelPoints();
    var level = await AchievementManager.getCurrentLevel();
    store.setCurrentLevel(level);
    store.setScore(score);
    var levelBounds = await AchievementManager.getCurrentLevelBounds();
    levelBounds[0] = Math.round(levelBounds[0]);
    levelBounds[1] = Math.round(levelBounds[1]);
    store.setThisLevelBegin(levelBounds[0]);
    store.setThisLevelEnd(levelBounds[1]);
    let progressPercent = this.calcValuesForProgressBar(levelBounds, score);
    store.setProgressBarProgress(progressPercent);
  }


  render() {
    var barstyle = {
      opacity: 0.0,
      paddingTop: 20,
      alignItems: "center",
      justifyContent: "center",
    };
    if (loggingStore.gamificationFlag) {
      barstyle.opacity = 1;
    };
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.refreshState()} />
        <ImageBackground
          source={require("../assets/images/avatar_menu/landscape_background.png")}
          style={styles.backgroundimage}
          imageStyle={{ opacity: 0.3 }}
        >
          <View style={styles.innerView, barstyle}>
            <Text>
              Level {store.currentLevel}
              {/** {"\n"} {store.score} / {store.thisLevelEnd} */}
            </Text>
            <Progress.Bar
              style={styles.progressbar}
              progress={store.progressBarProgress}
              width={200}
              height={15}
            />
          </View>
          <TouchableOpacity
            style={styles.centerComponent}
            delayLongPress={5000}
            onPress={() => {
              if (loggingStore.gamificationFlag) {
                this.props.navigation.navigate("Wardrobe")
              }
            }}
            onLongPress={() => {
              if (!loggingStore.gamificationFlag) {
                loggingStore.changeGamificationFlag();
                showMessage({
                  message: "Gamification activated!",
                  description: "You have just activated Gamification!",
                  type: "success"
                });
                CeliLogger.addLog(this.constructor.name, "gamification enabled!");
              } else {
                loggingStore.changeGamificationFlag();
                showMessage({
                  message: "Gamification deactivated!",
                  description: "You have just deactivated Gamification!",
                  type: "success"
                });
                CeliLogger.addLog(this.constructor.name, "gamification disabled!");
              }
            }}
          >
            <Avatar
              size={store.size}
              style={styles.avatar}
              avatarStyle={store.avatarStyle}
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
            <EmotionDisplayIcon style={styles.emotiondisplay} emotionId={emotionStore.getCurrentEmotion()}></EmotionDisplayIcon>
          </TouchableOpacity>
          <MenuButton navigation={this.props.navigation} />
        </ImageBackground>
      </View>
    );
  }
  calcValuesForProgressBar(bounds, currentScore) {
    let progressThisLevel = currentScore - bounds[0];
    let progressPercent =
      Math.round(progressThisLevel + Number.EPSILON) / (bounds[1] - bounds[0]);
    return progressPercent;
  }
}

// reuse of existing stackNavigator (MainTabNavigator) results in error msg
const RootStack = createStackNavigator({
  GlutenbuddyRoot: GlutenbuddyRoot,
  Wardrobe: Wardrobe,
  Challenges: Challenges,
  ChallengesTest: ChallengesTest,
  Achievements: {
    screen: Achievements,
  },
  AddSymptom: {
    screen: SymptomTrackerScreen,
  },
  MoreSymptoms: {
    screen: SymptomTrackerMoreSymptomsScreen,
  },
  AddNewSymptom: {
    screen: SymptomTrackerAddNewScreen,
  },
  ViewSymptom: {
    screen: SymptomViewScreen,
  },
  AddMeal: {
    screen: FoodDiaryScreen,
  },
  ViewMeal: {
    screen: FoodViewScreen,
  },
  AddEmote: {
    screen: EmoteTrackerScreen,
  },
  AddGIP: {
    screen: GIPScreen,
  },
  ViewGIP: {
    screen: GIPViewScreen,
  },
  ViewEmote: {
    screen: EmoteViewScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
  Debug: {
    screen: DebugScreen,
  },
  Camera: {
    screen: CameraScreen,
  },
  Gear: {
    screen: GearScreen,
  },
});

const AppContainer = createAppContainer(RootStack);

export class App extends React.Component {
  render() {
    return <AppContainer />;
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  wardrobe: {
    flex: 1,
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
    backgroundColor: "transparent",
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
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    //backgroundColor:'rgba(255,0,0,0.5)', //
    //opacity: 0.5
  },
  centerComponent: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressbar: {
    width: "44%",
  },
  innerView: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    flex: 0.8
  },
  emotiondisplay: {
    flex: 0.2
  }
});
