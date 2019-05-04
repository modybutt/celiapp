import React from 'react';
import {
  StyleSheet,
  ImageBackground,
} from 'react-native';

import Background from "../assets/images/wiesecut.png";
import Gluton from "../components/Gluton";
import MenuButton from '../components/MenuButton';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <ImageBackground source={Background} style={styles.scene}>
        <Gluton style={styles.gluton}/>
        <MenuButton navigation={this.props.navigation}/>
      </ImageBackground>
	  );
  }  
}

const styles = StyleSheet.create({
  scene: {
    width: '100%', 
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


