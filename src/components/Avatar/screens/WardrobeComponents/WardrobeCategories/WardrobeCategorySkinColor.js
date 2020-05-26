import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
