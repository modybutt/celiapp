import React from 'react';
import { View, Text, FlatList, ActivityIndicator,StyleSheet,TouchableHighlight,Image,Alert,TouchableOpacity } from "react-native";
import { ListItem, SearchBar } from 'react-native-elements';
import { NavigationEvents, withNavigationFocus } from 'react-navigation';

import DatabaseManager from '../persistance/DatabaseManager';

export default class EntryList extends React.Component {
  state = {
    loading: true,
    events: null,
    //error: null,
  }

  componentDidMount() {
    this.updateList(this.props.selectedDate)
  }

  updateList(timestamp) {
    this.setState({ loading: true });
  
    DatabaseManager.getInstance().fetchEvents(timestamp, 
      (_, error) => { alert(error)}, 
      (_, {rows: { _array }}) => this.setState(
      {
        events: _array,
        //error: res.error || null,
        loading: false,
      }));
  }
  
  onPressTouchable(item) {
    alert(item.note)
    //Alert.alert("You selected the symptom")
  }

  onLongPressTouchable(){
    Alert.alert("You opened the severity chooser")
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 15,
          width: 3,
          marginLeft: 35,
          backgroundColor: 'grey',
        }}
      />
    );
  };

  renderItem(item) {
    let objData  = JSON.parse(item.objData);
    
    switch(item.eventType) {
      case 0: {
        let color = 'transparent';
        switch (objData.severity) {
          case 1: color = 'yellow'; break;
          case 2: color = 'orange'; break;
          case 3: color = 'red'; break;
        }
        
        return (
          <ListItem
            title={objData.name}
            subtitle={new Date(item.created).toUTCString()}
            leftAvatar={{
              source: objData.icon,
              overlayContainerStyle: {
                backgroundColor: color
              }
            }}
          />
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

  renderEventList() {
    if (this.state.loading) {
      return (
        <ActivityIndicator size='large' color='lightblue' />
      );
    } else if (this.state.events.length == 0) {
      return (
        <Image source={require('../assets/images/nothing.gif')} />
      );
    } else {
      return (
        <FlatList
          data={this.state.events}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}) => this.renderItem(item)}
          ItemSeparatorComponent={this.renderSeparator}
        />
      );
    }
  }

  render() {
    return (
      <View>
        {/* <NavigationEvents
          onDidFocus={() => alert("once")}
        /> */}
        {this.renderEventList()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60
  },
  outerCircle: {
    borderRadius: 40,
    width: 80,
    height: 80,
    backgroundColor: 'red',
  },
});


