
import React from 'react';
import {Text, View} from 'react-native';
import TextInputMultiLine from './TextInputMultiLine';

export default class NoteEdit extends React.Component{
    render(){
        return(
            <View>
                <Text>NoteEdit</Text>
                <TextInputMultiLine/>
            </View>
        )
    }
}