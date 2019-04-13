import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import GlassPaneScreen from '../screens/GlassPane';

export default createStackNavigator({
  GlassPane: GlassPaneScreen,
}, {
  headerMode: 'none',
})
