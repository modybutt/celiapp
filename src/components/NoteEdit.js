
import React from 'react';
import {Text, View} from 'react-native';
import TextInputMultiLine from './TextInputMultiLine';
import HorizontalLineWithText from './HorizontalLineWithText';
import HorizontalLine from "./HorizontalLine";

export default class NoteEdit extends React.Component{
    render(){
        return(
            <View>
                <HorizontalLineWithText  text = "Note"/>
                <View style={{height: 200}}>
                     <TextInputMultiLine/>
                </View>
                <HorizontalLine/>
            </View>
        )
    }
}