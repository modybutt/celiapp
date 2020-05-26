import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
