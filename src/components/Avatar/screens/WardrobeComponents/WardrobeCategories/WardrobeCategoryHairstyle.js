import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import WardrobeInitTiles from './../WardrobeInitTiles';

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
