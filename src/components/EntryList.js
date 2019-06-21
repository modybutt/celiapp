import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Button
} from "react-native";
import { ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import DatabaseManager from '../manager/DatabaseManager';

export default class EntryList extends React.Component {
  state = {
    loading: true,
    events: null,
    //error: null,
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
      })
    );
  }
  
  onPressTouchable(item) {
    alert(item.note)
    //Alert.alert("You selected the symptom")
  }

  onLongPressTouchable(){
    //Alert.alert("You opened the severity chooser")
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewSymptom', {event: item})}>
            <ListItem
              title={objData.name}
              subtitle={new Date(item.created).toUTCString()}
              leftAvatar={{
                source: Image.resolveAssetSource(objData.icon),
                overlayContainerStyle: {
                  backgroundColor: color
                }
              }}
            />
          </TouchableOpacity>
        )
      }
      case 1: {
        return (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewMeal', {event: item})}>
            <Text>{JSON.stringify(item)}</Text>
            <Image source={Image.resolveAssetSource(objData.icon)} style={{width: 200, height: 200}} />
          </TouchableOpacity>
        )
      }
      case 2: {
        return (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewEmote', {event: item})}>
            <Text>{JSON.stringify(item)}</Text>
          </TouchableOpacity>
        )
      }
      default: {
        return (
          <Text>{JSON.stringify(item)}</Text>
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
      <ScrollView>
        <NavigationEvents
          onDidFocus={() => this.updateList(this.props.selectedDate)}
        />
        {this.renderEventList()}
      </ScrollView>
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


