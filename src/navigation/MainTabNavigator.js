import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import EvaluationScreen from '../screens/EvaluationScreen';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';

import Evaluation_1 from '../screens/evaluation/Evaluation_1';
import Evaluation_2 from '../screens/evaluation/Evaluation_2';
import DebugScreen from '../screens/DebugScreen';

const EvaluationStack = createStackNavigator({
  Evaluation: EvaluationScreen,
  Evaluation_1: Evaluation_1,
  Evaluation_2: Evaluation_2,
});

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

export default createBottomTabNavigator({
    Evaluation: {
        screen: EvaluationStack,
        navigationOptions: {
          //tabBarLabel: 'Evaluation',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'ios-link' : 'md-trending-up'}
            />
          ),
        }
    },
    Home: {
        screen: HomeStack,
        navigationOptions: {
          //tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={
                Platform.OS === 'ios'
                  ? `ios-information-circle${focused ? '' : '-outline'}`    // TODO iOS: md-paw
                  : 'md-paw'
              }
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
              name={Platform.OS === 'ios' ? 'ios-options' : 'md-calendar'}    // TODO iOS: md-calendar
            />
          )
        }
    },
    Debug: { 
      screen: createStackNavigator({Debug: DebugScreen}),
      navigationOptions: {
        //tabBarLabel: 'Debug',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-hammer'}    // TODO iOS: md-calendar
          />
        )
      }
    }
}, {
    initialRouteName: 'Home',
    tabBarOptions: {
        showLabel: false,
    }
});
