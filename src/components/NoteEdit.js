
import React from 'react';
import {Text, View} from 'react-native';
import TextInputMultiLine from './TextInputMultiLine';
import HorizontalLineWithText from './HorizontalLineWithText';
import HorizontalLine from "./HorizontalLine";

export default class NoteEdit extends React.Component{
    render(){
        return(
            <View>
                <View style={{height: 150}}>
                     <TextInputMultiLine/>
                </View>
                <HorizontalLine/>
            </View>
        )
    }
}