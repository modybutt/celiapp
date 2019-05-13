import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    MainNav: MainTabNavigator,
  })
);