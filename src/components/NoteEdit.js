import React from 'react';
import {Text, View, Alert} from 'react-native';
import TextInputMultiLine from './TextInputMultiLine';
import HorizontalLineWithText from './HorizontalLineWithText';
import HorizontalLine from "./HorizontalLine";

export default class NoteEdit extends React.Component{

    constructor(props) {
        super(props);
        this.noteEditedHandled = this.noteEditedHandled.bind(this);
        this.state={
            note: this.props.note
        }
     }


     deleteNote(){
        this._textInputMultiLine.deleteText();
     }


     noteEditedHandled(newNote){
        this.props.onTextChanged(newNote)
        this.setState({
            note: newNote
        })
    }



    render(){
        return(
            <View>
                <View style={{height: 150}}>
                     <TextInputMultiLine
                        ref={component => this._textInputMultiLine = component}
                        text = {this.state.note}
                        onTextChanged={this.noteEditedHandled}/>
                </View>
                <HorizontalLine/>
            </View>
        )
    }
}