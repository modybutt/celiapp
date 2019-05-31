import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import EvaluationScreen from '../screens/EvaluationScreen';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
// import DebugScreen from '../screens/DebugScreen';

import SymptomTrackerScreen from '../screens/SymptomTrackerScreen';
import SymptomViewScreen from '../screens/SymptomViewScreen';
import FoodDiaryScreen from '../screens/FoodDiaryScreen';
import EmoteTrackerScreen from '../screens/EmoteTrackerScreen';

const EvaluationStack = createStackNavigator({
  Evaluation: EvaluationScreen,
});

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

const AddSymptomStack = createStackNavigator({
  AddSymptom: SymptomTrackerScreen,
  ViewSymptom: SymptomViewScreen,
}, {
  headerMode: 'none',
});

const AddMealStack = createStackNavigator({
  AddMeal: FoodDiaryScreen,
}, {
  headerMode: 'none',
});

const AddEmoteStack = createStackNavigator({
  AddEmote: EmoteTrackerScreen,
}, {
  headerMode: 'none',
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
    },
    /* Debug: { 
      screen: createStackNavigator({Debug: DebugScreen}),
      navigationOptions: {
        //tabBarLabel: 'Debug',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={'md-hammer'}
          />
        )
      }
    } */
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
      title: 'Add Symptom'
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
      title: 'Add Meal',
    }
  },
  AddEmote: {
    screen: EmoteTrackerScreen,
    navigationOptions: {
      title: 'Add Emotion',
    }
  }
});
