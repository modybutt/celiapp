import React from 'react';
import { View, Text, FlatList, ActivityIndicator,StyleSheet,TouchableHighlight,Image,Alert,TouchableOpacity } from "react-native";
import { ListItem, SearchBar } from 'react-native-elements';

import { NavigationEvents } from 'react-navigation';

import DatabaseManager from '../persistance/DatabaseManager';

export default class EntryList extends React.Component {
	

  state = {
    
    loading: true,
    data: [],
    events: null,
    error: null,
  }

  componentDidMount() {
    //this.makeRemoteRequest();
  }

  makeRemoteRequest() {
    //const url = `https://randomuser.me/api/?&results=20`;
    //this.setState({ loading: true });
  
    DatabaseManager.getInstance().fetchEvents(Date.now(), 
      (_, error) => { alert(error)}, 
      (_, {rows: { _array }}) => this.setState(
      {
        events: _array,
        //error: res.error || null,
        loading: false,
      }));

    // fetch(url)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       data: res.results,
    //       error: res.error || null,
    //       loading: false,
    //     });
    //     this.arrayholder = res.results;
    //   })
    //   .catch(error => {
    //     this.setState({ error, loading: false });
    //   });
  }
  
    onPressTouchable(item) {
      alert(item.note)
      //Alert.alert("You selected the symptom")
    }

    onLongPressTouchable(){
      Alert.alert("You opened the severity chooser")
    }

  renderItem(item) {
    return (
        <TouchableHighlight onPress={() => this.onPressTouchable(item)} onLongPress={this.onLongPressTouchable}> 
			<View>
        
			  <ListItem
          title={JSON.parse(item.objData).name}
          subtitle={new Date(item.created).toUTCString()}
          // "../assets/images/SymptomTracker/headache.png"
          leftAvatar={{source: JSON.parse(item.objData).icon}}
          //containerStyle={{backgroundColor: 'red'}}
				
			  />
			  
			</View>
        </TouchableHighlight> 
    );
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

  render() {
    return (
      <View>
        <NavigationEvents
          onWillFocus={(payload) => this.makeRemoteRequest()}
        />
        <FlatList
          //data={this.state.data}
          data={this.state.events}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
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

