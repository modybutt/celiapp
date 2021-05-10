import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

const blaat = createAppContainer(
  createSwitchNavigator({
    MainNav: MainTabNavigator
  })
);
export default blaat;