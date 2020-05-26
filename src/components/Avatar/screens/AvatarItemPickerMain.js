import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import WardrobeTabCategories from './WardrobeComponents/WardrobeTabCategories';

const AvatarItemPickerMain = () => {
  return (
    <NavigationContainer independent={true}>
      <WardrobeTabCategories ></WardrobeTabCategories>
    </NavigationContainer>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    //alignItems: 'center', 
    //justifyContent: 'center',
    //backgroundColor: 'orange'
  },
});
*/
