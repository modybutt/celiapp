import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import WardrobeMain from './../WardrobeInitTiles';       

const WardrobeCategoryHairColor = () => {
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
