import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import SymptomTrackerScreen from '../screens/SymptomTrackerScreen';

export default createStackNavigator({
  SymptomTracker: SymptomTrackerScreen,
})
