import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import DatabaseManager from '../persistance/DatabaseManager';
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


    //DatabaseManager.getInstance().createEvent(0, Date.now(), {name: "test", id: Date.now()}, (param) => alert(JSON.stringify(param)),  (param) => alert(JSON.stringify(param)));


    DatabaseManager.getInstance().fetchEvents(null,
      (_, error) => { alert(error)}, 
      (_, {rows: { _array }}) => this.setState({
        history: {
          loading: false,
          data: _array
        }
      }));
  }

  renderItem(item) {
    switch(item.eventType) {
      // case 0: {
      //   return (
      //     <View>
      //       <Image source={item.icon} style={{ width: 50, height: 50 }}/>
      //       <Text>{item.name}</Text>
      //       <Text>{new Date(item.created).toUTCString()}</Text>
      //     </View>
      //   )
      // }
      case 0: {
        return (
          <View>
            <Text>{item.objData}</Text>
            <Text>{JSON.parse(item.objData).severity}</Text>
            <Text>{new Date(item.created).toUTCString()}</Text>
          </View>
        )
      }
      default: {
        return (
          <View>
            <Text>{JSON.stringify(item)}</Text>
          </View>
        )
      }
    }
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
