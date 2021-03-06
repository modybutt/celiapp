import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import Background from "../assets/images/wiesecut.png";
import Gluton from "../components/Gluton";
import MenuButton from '../components/MenuButton';
import PopUpMenu from '../components/PopUpMenu';
import LanguageManager from '../manager/LanguageManager';

export default class HomeScreen extends React.Component {
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
    let popupNames = [
      LanguageManager.getInstance().getText("SETTINGS"),
      //LanguageManager.getInstance().getText("CAMERA"),
      //LanguageManager.getInstance().getText("DEBUG"),
      LanguageManager.getInstance().getText("GEAR"),
    ];

    return (
      <ImageBackground source={Background} style={styles.background}>
        <Gluton style={styles.gluton}/>
        <PopUpMenu style={styles.popup} actions={popupNames} onPress={(name, index) => this.onPopupEvent(name, index)} />
        <MenuButton navigation={this.props.navigation}/>
      </ImageBackground>
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

