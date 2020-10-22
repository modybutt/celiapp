import React from 'react';
import { View, Text, Button, StyleSheet, Image  } from 'react-native';
import WardrobeInitTiles from './../WardrobeInitTiles';
import CeliLogger from '../../../../../analytics/analyticsManager';


const WardrobeCategoryHairstyle = ({navigation}) => {
    return (
      <View style={styles.container}>
        <WardrobeInitTiles category={2}></WardrobeInitTiles>
      </View>
    );
};

export default WardrobeCategoryHairstyle;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
});


import Icon from 'react-native-vector-icons/Ionicons';

WardrobeCategoryHairstyle.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => {
    return (
      <Image
        source={require("./CategoryImages/haircut.png")}
        style={{ height: focused ? 32 : 21 , width: focused ? 32 : 21, tintColor: tintColor }}
      />
    );
  },
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    CeliLogger.addLog(navigation.state.routeName, "switched to");
    defaultHandler()
  }
};
