import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import TextInputMultiLine from './TextInputMultiLine';
import HorizontalLineWithText from './HorizontalLineWithText';
import HorizontalLine from "./HorizontalLine";

export default class NoteEdit extends React.Component {

    constructor(props) {
        super(props);
        this.noteEditedHandled = this.noteEditedHandled.bind(this);
        this.state = {
            note: this.props.note
        }
    }


    deleteNote() {
        this._textInputMultiLine.deleteText();
    }


    noteEditedHandled(newNote) {
        this.props.onTextChanged(newNote)
        this.setState({
            note: newNote
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props.note !== prevProps.note ) {
            this.setState({note: this.props.note});
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <TextInputMultiLine
                    ref={component => this._textInputMultiLine = component}
                    text={this.state.note}
                    onTextChanged={this.noteEditedHandled}
                    placeholderText={this.props.placeholderText || ""}
                    color={this.props.color}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        paddingLeft: 20,
        paddingRight: 20,
    },

});