import React from 'react';
import { View, Text, Button, StyleSheet, Image  } from 'react-native';
import WardrobeMain from './../WardrobeInitTiles';
import CeliLogger from '../../../../../analytics/analyticsManager';


const WardrobeCategoryHairColor = ({navigation}) => {
    return (
      <View style={styles.container}>
        <WardrobeMain category={5}></WardrobeMain>
      </View>
    );
};

export default WardrobeCategoryHairColor;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

import Icon from 'react-native-vector-icons/Ionicons';

WardrobeCategoryHairColor.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => {
    return (
      <Image
        source={require("./CategoryImages/haircolor.png")}
        style={{ height: focused ? 32 : 21 , width: focused ? 32 : 21, tintColor: tintColor }}
      />
    );
  },
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    CeliLogger.addLog(navigation.state.routeName, "switched to");
    defaultHandler()
  }
};
