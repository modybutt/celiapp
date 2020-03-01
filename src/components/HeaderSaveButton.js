
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Icon from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class HeaderSaveButton extends React.Component{

    constructor(props) {
        super(props);
        this.color = '#ddd';
        this.props.shareConfig.onSymptomsUpdated(this.updateColor.bind(this));
    }

    render() {
        let iconName = 'md-save';
        if (this.props.type == 1) {
            iconName = 'md-checkbox-outline'
        } else if (this.props.type == 2) {
            iconName = 'md-today'
        }

        return (
            <TouchableOpacity style={this.getStyle()} onPress={this.props.onPress}>
                <Icon.Ionicons name={iconName} size={40} color={this.color}/>
            </TouchableOpacity>
        )
    }

    getStyle()
    {
        return { 
            marginRight: 20,
            borderWidth: 1,
            alignItems: 'center',
            width: 45,
            borderColor: this.color
        }
    }

    updateColor(isSymptomSelected)
    {
        this.color = isSymptomSelected ? '#000' : '#ddd';
        this.forceUpdate();
    }
}