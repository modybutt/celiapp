import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import MenuButton from '../components/MenuButton';
import InitWardrobeNavigator from '../wardrobeNavigation/InitWardrobeNavigator';

export default class AvatarScreen extends React.Component {
  onPopupEvent(eventName, index) {
    if (eventName !== 'itemSelected') {
      return;
    }

    switch (index) {
      case 0: this.props.navigation.navigate('Settings'); break;
      // case 1: this.props.navigation.navigate('Camera'); break;
      case 1: this.props.navigation.navigate('Gear'); break;
      default: this.props.navigation.navigate('Debug'); break;
    }
  }
  
  render() {
    return (
      <View style={styles.background}>
         <InitWardrobeNavigator></InitWardrobeNavigator>
         <MenuButton navigation={this.props.navigation}/>
      </View>
	  );
  }  
}

const styles = StyleSheet.create({
  background: {
    width: '100%', 
    height: '100%',
  },
  popup: {
    position: 'absolute',
    right: 40,
    top: 40,
  },
  gluton: {
    //position: 'absolute',
    top: '25%',
    //left: '25%',
    width: '100%',
    alignItems: 'center'
  },
});

