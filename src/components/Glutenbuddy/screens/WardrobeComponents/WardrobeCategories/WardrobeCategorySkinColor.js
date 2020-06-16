import React from 'react';
import { View, Text, Button, StyleSheet, Image  } from 'react-native';
import WardrobeInitTiles from '../WardrobeInitTiles';

const WardrobeCategorySkinColor = ({navigation}) => {
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
};
