import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./WardrobeRouter";

const Router = createAppContainer(AppNavigator);

export default () => (
  <View style={{ flex: 1 }}>
    <Router />
  </View>
);
