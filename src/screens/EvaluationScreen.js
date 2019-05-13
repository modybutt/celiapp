import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import DatabaseManager from '../brokers/DatabaseManager';
import MenuButton from '../components/MenuButton';

export default class EvaluationScreen extends React.Component {
  static navigationOptions = {
    title: 'Evaluation',
  };

  state = {
    history: {
      loading: true,
      data: null,
    }
  }

  refreshData() {
    this.setState({ history: { loading: true } });
    DatabaseManager.getInstance().fetchHistory(
      () => { alert("ERROR")}, 
      (_, {rows: { _array }}) => this.setState({
        history: {
          loading: false,
          data: _array
        }
      }));
  }

  renderItem(item) {
    return (
      <View>
        <Image source={item.icon} style={{ width: 50, height: 50 }}/>
        <Text>{item.name}</Text>
        <Text>{new Date(item.created).toUTCString()}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={this.styles}>
          <NavigationEvents
            onWillFocus={() => this.refreshData()}
          />
          <FlatList
            data={this.state.history.data}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item}) => this.renderItem(item)}
          />
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
