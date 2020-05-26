import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import WardrobeMain from './../WardrobeInitTiles';

const WardrobeCategoryEyeColor = () => {
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
