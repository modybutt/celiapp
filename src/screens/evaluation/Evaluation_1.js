import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default class Evaluation_1 extends React.Component {
  static navigationOptions = {
    title: 'Evaluation_1',
  };

  render() {
    return (
        <View style={this.styles}>
          <Button title="prev" onPress={() => this.props.navigation.goBack()} />
          <Button title="next" onPress={() => this.props.navigation.navigate('Evaluation_2')} />
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
