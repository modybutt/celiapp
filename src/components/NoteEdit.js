
import React from 'react';
import {Text, View} from 'react-native';
import TextInputMultiLine from './TextInputMultiLine';
import HorizontalLineWithText from './HorizontalLineWithText';
import HorizontalLine from "./HorizontalLine";

export default class NoteEdit extends React.Component{

    constructor(props) {
        super(props);
        this.noteEditedHandled = this.noteEditedHandled.bind(this);
     }


     noteEditedHandled(note){
        this.props.onTextChanged(note)
    }



    render(){
        return(
            <View>
                <View style={{height: 150}}>
                     <TextInputMultiLine onTextChanged={this.noteEditedHandled}/>
                </View>
                <HorizontalLine/>
            </View>
        )
    }
}