
import React from 'react';
import {Button, View, StyleSheet, Alert} from 'react-native';

export default class CustomButton extends React.Component{
    render(){
        return(
            <View>
                <Button title='CustomButton' onPress={()=>{Alert.alert("You tapped the button")}} />
            </View>
        )
    }
}



var styles = StyleSheet.create({
    button: {
      flex: 1,
      marginTop:60
    },
  });