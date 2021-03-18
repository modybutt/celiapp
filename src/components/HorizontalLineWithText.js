import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
export default class HorizontalLineWithText extends React.Component {

    colorStyle = {
        borderBottomColor: this.props.color,
    }

    render() {
        return (
            <View style={this.props.color ? [styles.container,this.colorStyle]:[styles.container]}>
                <Text style={styles.TextStyle}>{this.props.text}</Text>
            </View>

        )
    }
}


var styles = StyleSheet.create({
    container: {
        borderBottomColor: 'black',
        marginBottom: 8,
        marginTop: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: 50,
        marginRight: 50,
        
        
    },
    TextStyle: {
        fontSize: 15,
        //fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
    }
});