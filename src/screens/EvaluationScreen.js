import React from 'react';
import { View, StyleSheet, } from 'react-native';
import MenuButton from '../components/MenuButton';
import EntryList from '../components/EntryList';
import LanguageManager from '../manager/LanguageManager';

export default class EvaluationScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: LanguageManager.getInstance().getText("TRACKINGS"),
  });

  render() {
    return (
      <View style={styles.container}>
        <EntryList  navigation={this.props.navigation} />
        <MenuButton navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});