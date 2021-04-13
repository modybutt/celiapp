import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import infoIcon from './InfoIcon';
export default class HorizontalLineWithText extends React.Component {

    colorStyle = {
        borderBottomColor: this.props.color,
    }
    colorBackgroundStyle = {
        backgroundColor: this.props.color,
    }

    render() {
        if (this.props.iconClickEvent == null) {
            return (
                <View style={this.props.color ? [styles.container, this.colorStyle] : [styles.container]}>
                    <Text style={styles.TextStyle}>{this.props.text}</Text>
                </View>
            );
        } else {
            return (
                <View style={this.props.color ? [styles.container, this.colorStyle] : [styles.container]}>
                    <Text style={styles.TextStyle}>{this.props.text}</Text>
                    <View style={[this.colorBackgroundStyle, styles.informationBackground]}>
                        <TouchableOpacity onPress={this.props.iconClickEvent}
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                >
                                <Text style={styles.informationForeground}>i</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
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
        textAlign: 'center',
        marginBottom: 4,
    },
    informationBackground:
    {
        right: 5,
        bottom: 5,
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    informationForeground:
    {
        textAlign: 'center',
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold'
    }
});