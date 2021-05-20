import React from 'react';
import { Text, View, Image, Animated, StyleSheet, Easing , Dimensions } from 'react-native';
import Constants from 'expo-constants';
import {SvgXml} from "react-native-svg";
import celiAppLogo from  '../Assets/Images/glutenfree.svg';

export default class LoadingScreen extends React.Component {

  constructor() {
    super();
    this.RotateValueHolder = new Animated.Value(0);
  }

  componentDidMount() {
    //this.StartImageRotateFunction();
  }

  render() {
    if (this.props.hide == true) {
      return null;
    }

    return (
      <View style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Text style={{fontSize: 40, fontWeight: 'bold'}}>CeliApp</Text>
        <View>
          <SvgXml style={{

          }} width="150" height="150" fill='#e91f64' xml={celiAppLogo}/>
        </View>
        <Text style={{color: 'green'}}>Glutenfree is what you want to be</Text>
        <Text style={{fontSize: 12, color: 'gray'}}>Version {Constants.manifest.version}</Text>
      </View>
    );
  }
}

