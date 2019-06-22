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
import { Icon } from 'expo';
import DatabaseManager from '../manager/DatabaseManager';
import { images } from '../components/EmoteTracker/EmoteTrackerConstants';
import Colors from '../constants/Colors';
import LanguageManager from '../manager/LanguageManager';



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
              title={LanguageManager.getInstance().getText(objData.name)}
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
        if (objData.icon != null) {
          return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewMeal', {event: item})}>
              <ListItem
                title={objData.name + ' ' + objData.rating +'/5'}
                subtitle={new Date(item.created).toUTCString()}
                leftAvatar={{ source: Image.resolveAssetSource(objData.icon) }}
              />
            </TouchableOpacity>
          )
        } else {
          return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewMeal', {event: item})}>
              <ListItem
                title={objData.name + ' ' + objData.rating +'/5'}
                subtitle={new Date(item.created).toUTCString()}
                leftAvatar={{ icon: {name: 'camera'} }}
              />
            </TouchableOpacity>
          )
        }
      }
      case 2: {
        let picture = null;
        let name = '';
        switch (objData.type) {
          case 1: picture = images.unhappy; break;
          case 2: picture = images.slightlyUnhappy; break;
          case 3: picture = images.neither; break;
          case 4: picture = images.slightlyHappy; break;
          case 5: picture = images.happy; break;
        }

        return (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewEmote', {event: item})}>
             <ListItem
              title={picture.imgName}
              subtitle={new Date(item.created).toUTCString()}
              leftAvatar={{
                source: Image.resolveAssetSource(picture.uri)
              }}
            />
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


