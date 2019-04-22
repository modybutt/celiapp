
import React from 'react';
import {Icon, View, Text} from 'react-native';
import RoundPictureButton from '../RoundPictureButton';

export default class MoreSymptomsButton extends React.Component{
    render(){
        return(
            <View>
                <RoundPictureButton imageURI=".../assets/images/robot-prod.png"/>
                <Text>MoreSymptomsButton</Text>
            </View>
 
        )
    }
}