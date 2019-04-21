//includes the call of 3 color chooser items.
//Normal press. Select Symptom
//Long press. Choose Severity

import React from 'react';
import {Icon, View, Text} from 'react-native';
import RoundPictureButton from '../RoundPictureButton';
import SymptomColorChooserItem from './SymptomColorChooserItem';

export default class SymptomIcon extends React.Component{
    render(){
        return(
            <View>
                <Text>SymptomIcon</Text>
                <RoundPictureButton/>
                <SymptomColorChooserItem type = "red"/>
                <SymptomColorChooserItem type = "orange"/>
                <SymptomColorChooserItem type = "yellow"/>
            </View>
        )
    }
}