import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import WardrobeMain from "./../WardrobeInitTiles";

const WardrobeCategoryGlasses = ({ navigation }) => {
  //console.log("Navigation (from WardrobeCategoryCap.js) ", navigation)
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
        style={{ height: focused ? 32 : 21 , width: focused ? 32 : 21, tintColor: tintColor }}
      />
    );
  },
};
