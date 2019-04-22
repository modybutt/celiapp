import React from 'react';
import {View,  StyleSheet} from 'react-native';
export default class HorizontalLine extends React.Component{
    render(){
        return(
        <View style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
        }}/>

        )
    }
}