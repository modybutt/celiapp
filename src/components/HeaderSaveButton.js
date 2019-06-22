
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'expo';
import Colors from '../constants/Colors';

export default class HeaderSaveButton extends React.Component{
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Icon.Ionicons name='md-save' size={40} />
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