import React from 'react';
import {Icon, TouchableOpacity, Text, View, Image, TouchableHighlight, StyleSheet, Alert } from 'react-native';

export default class RoundPictureButton extends React.Component {
    // props: 
    // radius: int
    // imageURI: string
    // isColorButton
    // color: string
    // onClickFunction

    //TODO: IsSelected



    render() {
      if(this.props.isColorButton){
        return (
         <View style={styles.container}>
          <View style={style = {borderRadius: this.props.radius, width: this.props.radius*2, height: this.props.radius*2, backgroundColor: this.props.color}} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
            <View style={style={width: this.props.radius*2, height: this.props.radius*2, borderRadius:this.props.radius, backgroundColor: this.props.color}} />
          </View>
        </View>
        )}
      return (
        <View style={styles.container}>
        <TouchableHighlight style={ style={height: this.props.radius*2, height: this.props.radius*2, borderRadius: this.props.radius}} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
             <Image style={ style = {width: this.props.radius*2, height: this.props.radius*2, borderRadius:this.props.radius, color: this.props.color}} source={{ uri: this.props.imageURI }} />
        </TouchableHighlight> 
       </View> 
      )
    }
  }

  var styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:60
    },
    outerCircle: {
      borderRadius: 40,
      width: 80,
      height: 80,
      backgroundColor: 'red',
    },
  });