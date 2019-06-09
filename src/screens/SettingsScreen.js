import React from 'react';
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import LanguageManager from '../manager/LanguageManager';


export default class SettingsScreen extends React.Component {
  doIt() {
    LanguageManager.getInstance().setLanguage('deutsch');
    alert(LanguageManager.getInstance().getLanguage());
  }

  render() {
    return (
      <View>
        <Text>Hi</Text>
        <Button title={LanguageManager.getInstance().getText('LANGUAGE')} onPress={() => this.doIt()} />
      </View>
    );
  }
}
