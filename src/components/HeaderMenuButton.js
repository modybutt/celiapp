
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Icon from '@expo/vector-icons';
import PopUpMenu from '../components/PopUpMenu';
import LanguageManager from '../manager/LanguageManager';

export default class HeaderMenuButton extends React.Component{
    onPopupEvent(eventName, index) {
        if (eventName !== 'itemSelected') {
            return;
        }

        this.props.onHeaderMenuSelected(index);
    }

    render() {
        let popupNames = [
            LanguageManager.getInstance().getText("EDIT"),
            LanguageManager.getInstance().getText("DELETE"),
        ];

        return (
            <PopUpMenu style={styles.container} actions={popupNames} onPress={(name, index) => this.onPopupEvent(name, index)} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        alignItems: 'center',
    },
})