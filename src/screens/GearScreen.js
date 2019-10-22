import React from 'react';
import { View, StyleSheet, } from 'react-native';
import MenuButton from '../components/MenuButton';
import EntryList from '../components/EntryList';
import LanguageManager from '../manager/LanguageManager';

export default class GearScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: LanguageManager.getInstance().getText("GEAR"),
  });

  render() {

    
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});