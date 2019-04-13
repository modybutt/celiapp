import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default class EvaluationScreen extends React.Component {
  static navigationOptions = {
    title: 'Evaluation_2',
  };

  render() {
    return (
        <View style={this.styles}>
          <Button title="prev" onPress={() => this.props.navigation.goBack()} />
          <Button title="home" onPress={() => this.props.navigation.navigate('Evaluation')} />
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
