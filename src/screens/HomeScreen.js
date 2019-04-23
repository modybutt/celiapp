import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import Background from "../assets/images/wiesecut.png";
import Gluton from "../components/Gluton";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style = {styles.container}>
        <ImageBackground source={Background} style={styles.scene}>
          <Gluton style={styles.gluton}/>
        </ImageBackground>
      </View>
	  );
  }  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
  },
  scene: {
    width: '100%', 
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


