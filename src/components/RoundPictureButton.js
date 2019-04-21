import React from 'react';
import {Icon, TouchableOpacity, Text, View, Image, TouchableHighlight, StyleSheet } from 'react-native';

export default class RoundPictureButton extends React.Component {
    // props: 
    // radius: int
    // imageURI: string
    // onClickFunction
    render() {
      return (
      <View style={styles.container}>
      <TouchableHighlight style={ style={height: this.props.radius*2, height: this.props.radius*2, borderRadius: this.props.radius} }>
           <Image style={ style = {width: this.props.radius*2, height: this.props.radius*2, borderRadius:this.props.radius}} source={{ uri: this.props.imageURI }} />
      </TouchableHighlight> 
     </View> 
      );
    }
  }

  var styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:60
    },
  });