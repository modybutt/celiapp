import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AddNavigator from './AddNavigator';
import AddNavigatorEmoteTracker from '../screens/EmoteTrackerScreen';
import AddNavigatorFoodDiary from '../screens/FoodDiaryScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    AddSymptom: AddNavigator,
    AddFood: AddNavigatorFoodDiary,
    AddEmote: AddNavigatorEmoteTracker
  })
);