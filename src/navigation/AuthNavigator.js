import React from "react";
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation";

import SignUpScreen from '../components/SignUp';
import SignInScreen from '../components/SignIn';



export default createStackNavigator({
  SignUp: SignUpScreen,
  SignIn: SignInScreen,
});