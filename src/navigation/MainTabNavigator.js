import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import EvaluationScreen from '../screens/EvaluationScreen';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import DebugScreen from '../screens/DebugScreen';
import SymptomTrackerScreen from '../screens/SymptomTrackerScreen';
import FoodDiaryScreen from '../screens/FoodDiaryScreen';
import EmoteTrackerScreen from '../screens/EmoteTrackerScreen';
import SymptomViewScreen from '../screens/SymptomViewScreen';
import FoodViewScreen from '../screens/FoodViewScreen';
import EmoteViewScreen from '../screens/EmoteViewScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CameraScreen from '../screens/CameraScreen';

const EvaluationStack = createStackNavigator({
  Evaluation: EvaluationScreen,
});

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

const TabNavStack = createMaterialTopTabNavigator({
    Evaluation: {
        screen: EvaluationStack,
        navigationOptions: {
          //tabBarLabel: 'Evaluation',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={'md-trending-up'}
            />
          ),
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
          //tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              name={'md-paw'}
            />
          )
      }
    },
    Calendar: {
        screen: CalendarStack,
        navigationOptions: {
          //tabBarLabel: 'Calendar',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={'md-calendar'}
            />
          )
        }
    }
}, {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        style: {
          backgroundColor: 'transparent',
        },
        indicatorStyle: {
          backgroundColor: 'lightblue',
        }
    }
});

export default createStackNavigator({
  TabBar: {
    screen: TabNavStack,
    navigationOptions: {
      header: null,
    }
  },
  AddSymptom: {
    screen: SymptomTrackerScreen,
    navigationOptions: {
      title: 'Symptomtracker'
    }
  },
  ViewSymptom: {
    screen: SymptomViewScreen,
    navigationOptions: {
      title: 'View Symptom'
    }
  },  
  AddMeal: {
    screen: FoodDiaryScreen,
    navigationOptions: {
      title: 'Food Diary',
    }
  },
  ViewMeal: {
    screen: FoodViewScreen,
    navigationOptions: {
      title: 'View Meal'
    }
  },    
  AddEmote: {
    screen: EmoteTrackerScreen,
    navigationOptions: {
      title: 'Emotions',
    }
  },
  ViewEmote: {
    screen: EmoteViewScreen,
    navigationOptions: {
      title: 'View Emote'
    }
  },   
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings'
    }
  },
  Debug: {
    screen: DebugScreen,
    navigationOptions: {
      title: 'Debug'
    }
  },
  Camera: {
    screen: CameraScreen,
    navigationOptions: {
      title: 'Cam'
    }
  } 
});
