import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import SymptomTrackerScreen from '../screens/SymptomTrackerScreen';
import FoodDiaryScreen from '../screens/FoodDiaryScreen';
import EmoteTrackerScreen from '../screens/EmoteTrackerScreen';

export default createStackNavigator({
  SymptomTracker: SymptomTrackerScreen,
})
