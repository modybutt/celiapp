import React from 'react';
import { View, Text, Button, StyleSheet, Image  } from 'react-native';
import WardrobeInitTiles from '../WardrobeInitTiles';
import CeliLogger from '../../../../../analytics/analyticsManager';

var onTabbarPress = true;
const WardrobeCategorySkinColor = ({navigation}) => {
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
        <WardrobeInitTiles category={4}></WardrobeInitTiles>
      </View>
    );
};

export default WardrobeCategorySkinColor;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});



import Icon from 'react-native-vector-icons/Ionicons';

WardrobeCategorySkinColor.navigationOptions = {
  tabBarIcon: ({focused }) => {
    return (
      <Image
        source={require("./CategoryImages/skincolor1.png")}
        style={{ height: focused ? 32 : 21 , width: focused ? 32 : 21 }}
      />
    );
  },
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    onTabbarPress = true;
    CeliLogger.addLog(navigation.state.routeName, "focussed via tap");
    defaultHandler()
  },
};
