import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import EvaluationScreen from '../screens/EvaluationScreen';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';

const EvaluationStack = createStackNavigator({
  Evaluation: EvaluationScreen,
});

EvaluationStack.navigationOptions = {
  tabBarLabel: 'Evaluation',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-trending-up'}
    />
  ),
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`    // TODO iOS: md-paw
          : 'md-paw'
      }
    />
  ),
};

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-calendar'}
    />
  ),
};

export default createBottomTabNavigator({
  EvaluationStack,
  HomeStack,
  CalendarStack,
}, {
  //tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: false,
    //swipeEnabled: true,
  }
});
