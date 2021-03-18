import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';

export default class TextInputSingleLine extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    textChanged = (t) => {
        this.setState({
            text: t
        })
        this.props.onTextChanged(t)
    }

    colorStyle = {
        borderColor: this.props.color,
        borderWidth: StyleSheet.hairlineWidth,
    }

    render() {
        return (
            
                <View style = {this.props.color ? [styles.container, this.colorStyle] : [styles.container]}>
                    <TextInput
                        {...this.props}
                        maxLength={60}
                        style={{ marginRight: 20 }}
                        onChangeText={(text) => { this.textChanged(text) }}
                        value={this.props.preText}
                        placeholder={this.props.placeholderText || ""}
                    />
                </View>
        
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingLeft:5,
    },
    
});
