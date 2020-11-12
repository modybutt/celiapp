import React from 'react';
import { View, StyleSheet, } from 'react-native';
import MenuButton from '../components/MenuButton';
import EntryList from '../components/EntryList';
import LanguageManager from '../manager/LanguageManager';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';

export default class EvaluationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: LanguageManager.getInstance().getText("TRACKINGS"),
  });
 
  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      CeliLogger.addLog(this.props.navigation.state.routeName, Interactions.OPEN);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <EntryList navigation={this.props.navigation} />
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