import React from 'react';
import {View,  StyleSheet, Text} from 'react-native';
export default class HorizontalLineWithText extends React.Component{
    render(){
        return(
        <View style={{
            borderBottomColor: 'black',
            marginBottom: 8,
            marginTop: 20,
            borderBottomWidth: StyleSheet.hairlineWidth,
        }}>
            <Text style={styles.TextStyle}>{this.props.text}</Text>
        </View>

        )
    }
}


var styles = StyleSheet.create({
    TextStyle:{
       fontSize: 15,
       fontWeight: 'bold',
    }
   });