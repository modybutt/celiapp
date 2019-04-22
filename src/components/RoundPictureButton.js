import React from 'react';
import {Icon, TouchableOpacity, Text, View, Image, TouchableHighlight, StyleSheet, Alert } from 'react-native';

export default class RoundPictureButton extends React.Component {
    // props: 
    // radius: int
    // imageURI: string
    // isColorButton
    // color: string
    // onClickFunction

    onPressTouchable(){
      Alert.alert("You selected the symptom")
    }

    onLongPressTouchable(){
      Alert.alert("You opened the severity chooser")
    }


    render() {
      if(this.props.isColorButton){
        return (
         <View style={styles.container}>
          <View style={style = {borderRadius: this.props.radius, width: this.props.radius*2, height: this.props.radius*2, backgroundColor: this.props.color}} onPress={this.onPressTouchable} onLongPress={this.onLongPressTouchable}>
            <View style={style={width: this.props.radius*2, height: this.props.radius*2, borderRadius:this.props.radius, backgroundColor: this.props.color}} />
          </View>
        </View>
        )}
      return (
        <View style={styles.container}>
        <TouchableHighlight style={ style={height: this.props.radius*2, height: this.props.radius*2, borderRadius: this.props.radius}} onPress={this.onPressTouchable} onLongPress={this.onLongPressTouchable}>
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