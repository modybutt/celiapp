import React from 'react';
import { View, StyleSheet, } from 'react-native';
import MenuButton from '../components/MenuButton';
import EntryList from '../components/EntryList';

export default class EvaluationScreen extends React.Component {
  static navigationOptions = {
    title: 'Evaluation',
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={this.styles}>
          <EntryList />
        </View>
        <MenuButton navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
