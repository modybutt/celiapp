import React from 'react';
import { View, Text, Button, StyleSheet, Image  } from 'react-native';
import WardrobeMain from './../WardrobeInitTiles';

const WardrobeCategoryEyeColor = ({navigation}) => {
    return (
      <View style={styles.container}>
        <WardrobeMain category={6}></WardrobeMain>
      </View>
    );
};

export default WardrobeCategoryEyeColor;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
});


import Icon from 'react-native-vector-icons/Ionicons';

WardrobeCategoryEyeColor.navigationOptions = {
    tabBarIcon: ({tintColor, focused}) => (
        <Icon
            name={focused ? 'ios-planet': 'md-planet'}
            size={focused ? 28 : 22}
            color={tintColor}
            />
    )
}
