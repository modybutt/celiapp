import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default class EvaluationScreen extends React.Component {
  static navigationOptions = {
    title: 'Evaluation',
  };

  render() {
    return (
        <View style={this.styles}>
          <Button title="next" onPress={() => this.props.navigation.navigate('Evaluation_1')} />
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
