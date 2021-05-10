import React from "react";
import {
  createStackNavigator
} from "react-navigation-stack";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from "../components/TabBarIcon";
import TabBarCustomIcon from "../components/TabBarCustomIcon";
import { SvgXml } from 'react-native-svg';
import ReportIcon from '../Assets/Images/heartbeat.svg';
import MainScreenIcon from '../Assets/Images/glutenfree.svg';
import EvaluationScreen from "../screens/EvaluationScreen";
import CalendarScreen from "../screens/CalendarScreen";
import ReportScreen from "../screens/ReportScreen";
import DebugScreen from "../screens/DebugScreen";
import SymptomTrackerScreen from "../screens/SymptomTrackerScreen";
import FoodDiaryScreen from "../screens/FoodDiaryScreen";
import GIPScreen from "../screens/GIPScreen";
import EmoteTrackerScreen from "../screens/EmoteTrackerScreen";
import DeleteScreen from "../screens/DeleteScreen";
import SymptomViewScreen from "../screens/SymptomViewScreen";
import FoodViewScreen from "../screens/FoodViewScreen";
import GIPViewScreen from "../screens/GIPViewScreen";
import EmoteViewScreen from "../screens/EmoteViewScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CameraScreen from "../screens/CameraScreen";
import GearScreen from "../screens/GearScreen";
import SymptomTrackerMoreSymptomsScreen from "../screens/SymptomTrackerMoreSymptomsScreen";
import SymptomTrackerAddNewScreen from "../screens/SymptomTrackerAddNewScreen";
import GlutenbuddyRoot from "../screens/GlutenbuddyRoot";
import Wardrobe from "../components/Glutenbuddy/screens/Wardrobe";
import Challenges from "../components/Glutenbuddy/screens/Challenges";
import Achievements from "../components/Glutenbuddy/screens/Achievements";
import ChallengesTest from "../components/Glutenbuddy/screens/ChallengesTest";
import Colors from '../constants/Colors';
import MainScreen from "../screens/MainScreen";
import OnBoardingScreen from "../screens/OnboardingScreen";
import GoalSettingScreen from "../screens/GoalSettingScreen";

/*const EvaluationStack = createStackNavigator({
  Evaluation: EvaluationScreen,
});*/

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

const MainScreenStack = createStackNavigator({
	Mainscreen: MainScreen,
});

const OnBoardingScreenStack = createStackNavigator({
	OnBoardingscreen: OnBoardingScreen
});

// const GlutenStack = createStackNavigator({
//   Glutenbuddy: GlutenbuddyRoot,
// });

const ReportStack = createStackNavigator({
  Report: ReportScreen,
});

const TabNavStack = createMaterialTopTabNavigator(
  {
    /*Evaluation: {
      screen: EvaluationStack,
      navigationOptions: {
        //tabBarLabel: 'Evaluation',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"md-pulse"} />
        ),
      },
    },*/
    Calendar: {
      screen: CalendarStack,
      navigationOptions: {
        //tabBarLabel: 'Calendar',
        tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name={"md-calendar"} />
        ),
      },
    },

    Glutenbuddy: {
      screen: MainScreenStack,
      navigationOptions: {		  
        //tabBarLabel: 'Calendar',
        tabBarIcon: ({ focused }) => (
            <SvgXml width="26" height="26" fill= {focused? Colors.tabIconSelected : Colors.tabIconDefault} xml={MainScreenIcon} />
        ),
      },
    },

    Report: {
      screen: ReportStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <SvgXml width="26" height="26" fill= {focused? Colors.tabIconSelected : Colors.tabIconDefault} xml={ReportIcon} />
        ),
      },
    },

 // Screen for x-Day-challenge:
    // Home: {
    //   screen: HomeScreen, //Note for Oisin: replace this with your component
    //   navigationOptions: {
    //     tabBarLabel: 'Home',
    //     tabBarIcon: ({ focused }) => (
    //       <TabBarIcon focused={focused} name={"md-paw"} />
    //     ),
    //   },
    // },

  },
  {
    initialRouteName: "Glutenbuddy",
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: "transparent",
      },
      indicatorStyle: {
        backgroundColor: "lightblue",
      },
    },
    lazy: false,
  }
);

export default createStackNavigator({
  TabBar: {
    screen: TabNavStack,
    navigationOptions: {
      headerShown: false,
      title: ''
    },
  },
  AddSymptom: {
    screen: SymptomTrackerScreen,
    navigationOptions: {
      headerShown: false,
      title: ''
    },
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
    navigationOptions: {
      headerShown: false,
      title: ''
    },
  },
  ViewMeal: {
    screen: FoodViewScreen,
  },
  AddEmote: {
    screen: EmoteTrackerScreen,
    navigationOptions: {
      headerShown: false,
      title: ''
    },
  },
  AddGIP: {
    screen: GIPScreen,
    navigationOptions: {
      headerShown: false,
      title: ''
    },
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
  GoalSetting: {
	  screen: GoalSettingScreen,
	  navigationOptions: {
		headerShown: false,
		title: ''
	  },
  },
  Gear: {
    screen: GearScreen,
  },

  Wardrobe: Wardrobe,
  Challenges: Challenges,
  Achievements: {
    screen: Achievements,
  },
  ChallengesTest: ChallengesTest,
  DeleteScreen: {
    screen: DeleteScreen,
    navigationOptions: {
      headerShown: false,
      title: ''
    },
  },
});
