import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import WardrobeMain from "./../WardrobeInitTiles";
import CeliLogger from '../../../../../analytics/analyticsManager';

var onTabbarPress = true;
const WardrobeCategoryGlasses = ({ navigation }) => {
  // this body is be for tab switches via swipes only!
  /*this.focusListener = */
  navigation.addListener("didFocus", () => {
    if (onTabbarPress === false) {
      CeliLogger.addLog(navigation.state.routeName, "focussed via swipe");
    }
    onTabbarPress = false;
  });
    //this.focusListener.remove();
  
  return (
    <View style={styles.container}>
      <WardrobeMain category={3}></WardrobeMain>
    </View>
  );
};

export default WardrobeCategoryGlasses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import Icon from "react-native-vector-icons/Ionicons";

WardrobeCategoryGlasses.navigationOptions = {

  tabBarIcon: ({ tintColor, focused }) => {
    return (
      <Image
        source={require("./CategoryImages/glasses.png")}
        style={{ height: focused ? 32 : 21, width: focused ? 32 : 21, tintColor: tintColor }}
      />
    );
  },
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    onTabbarPress = true;
    console.log("tabbaronpress")
    CeliLogger.addLog(navigation.state.routeName, "focussed via tap");
    defaultHandler()
  },
};
