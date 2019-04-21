
import React from 'react';
import {Text, View} from 'react-native';
import RoundPictureButton from '../RoundPictureButton';

export default class SymptomColorChooserItem extends React.Component{
    render(){
        return(
            <View>
                <Text>SymptomColorChooserItem {this.props.type} </Text>
                <RoundPictureButton/>
            </View>
        )
    }
}