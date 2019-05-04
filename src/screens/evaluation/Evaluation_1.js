import React from 'react';
import { View, Button, StyleSheet, FlatList, Text } from 'react-native';
import DatabaseManager from '../../brokers/DatabaseManager';

export default class Evaluation_1 extends React.Component {
  static navigationOptions = {
    title: 'Evaluation_1',
  };

  constructor(props) {
    super(props);
    //DatabaseManager.getInstance().connect();
    DatabaseManager.getInstance().getAll(true, () => { alert("ERROR")}, (_, {rows: { _array }}) => this.setState({entries: _array}));
  }

  state = {
    entries: null,
  };

  render() {
    return (
        <View style={this.styles}>
          <Button title="next" onPress={() => this.props.navigation.navigate('Evaluation_2')} />
          <FlatList data={this.state.entries} renderItem={({item}) => this.renderItem(item)} keyExtractor={item => '{item.id}'} /> 
        </View>
    );
  }

  renderItem(item) {
    return (
      <View>
        <Text>{item.id}: {item.value}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
