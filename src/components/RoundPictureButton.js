import React from 'react';
import {View, Image, TouchableHighlight, StyleSheet } from 'react-native';

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
          <View style={{borderRadius: this.props.radius, width: this.props.radius*2, height: this.props.radius*2, backgroundColor: this.props.color}} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
            <View style={{width: this.props.radius*2, height: this.props.radius*2, borderRadius:this.props.radius, backgroundColor: this.props.color}} />
          </View>
        </View>
        )}
      return (
        <View style={styles.container}>
        <TouchableHighlight style={{height: this.props.radius*2, height: this.props.radius*2, borderRadius: this.props.radius}} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
             <Image source={{ uri: this.props.imageURI }} style={{width: this.props.radius*2, height: this.props.radius*2, borderRadius:this.props.radius, backgroundColor: this.props.color}} />
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