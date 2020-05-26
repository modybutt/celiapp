import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import WardrobeInitTiles from './../WardrobeInitTiles';

const WardrobeCategoryShirt = ({navigation}) => {
    return (
      <View style={styles.container}>
        <WardrobeInitTiles category={1}></WardrobeInitTiles>
      </View>
    );
};

export default WardrobeCategoryShirt;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
