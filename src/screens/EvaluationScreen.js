import React from 'react';
import { View, StyleSheet, } from 'react-native';
import MenuButton from '../components/MenuButton';
import EntryList from '../components/EntryList';

export default class EvaluationScreen extends React.Component {
  static navigationOptions = {
    title: 'Trackings',
  };

  render() {
    return (
      <View style={styles.container}>
        <EntryList />
        <MenuButton navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
