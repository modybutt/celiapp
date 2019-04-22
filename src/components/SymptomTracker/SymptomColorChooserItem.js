
import React from 'react';
import {Text, View} from 'react-native';
import RoundPictureButton from '../RoundPictureButton';

export default class SymptomColorChooserItem extends React.Component{
    render(){
        return(
            <View>
                <RoundPictureButton radius = {20} isColorButton = {true} color={this.props.type}/>
            </View>
        )
    }
}