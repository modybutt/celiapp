
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Icon from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class HeaderSaveButton extends React.Component{
    render() {
        let iconName = 'md-save';

        if (this.props.type == 1) {
            iconName = 'md-checkbox-outline'
        } else if (this.props.type == 2) {
            iconName = 'md-today'
        }

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Icon.Ionicons name={iconName} size={40} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        borderWidth: 1,
        alignItems: 'center',
        width: 45
    },
})