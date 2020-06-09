

import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./WardrobeRouter";
import Icon from "react-native-vector-icons/Ionicons";

const Router = createAppContainer(AppNavigator);

export default class InitWardrobeNavigator extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="red" barStyle="light-content" />
    <Text>{"\n\n\n"}</Text>
        <Text>Glutenbuddy with navigation v3 </Text>
        <Router />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});
