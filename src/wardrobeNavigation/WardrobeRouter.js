import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import { StyleSheet, Text, View } from "react-native";

import HomeScreen from "./categories/first";
import SecondScreen from "./categories/second";
import ThirdScreen from "./categories/third";

const AppNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Second: SecondScreen,
    Third: ThirdScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "tomato",
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: "red",
      },
    },
  }
);
export default AppNavigator;
