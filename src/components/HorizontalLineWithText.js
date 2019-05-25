import React from 'react';
import {View,  StyleSheet, Text} from 'react-native';
export default class HorizontalLineWithText extends React.Component{
    render(){
        return(
        <View style={{
            borderBottomColor: 'black',
            marginBottom: 8,
            borderBottomWidth: StyleSheet.hairlineWidth,
        }}>
            <Text>{this.props.text}</Text>
        </View>

        )
    }
}