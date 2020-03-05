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
import { ListItem, Avatar, Badge } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import DatabaseManager from '../manager/DatabaseManager';
import { images } from '../components/EmoteTracker/EmoteTrackerConstants';
import FoodDiaryRatingBar from '../components/FoodDiary/FoodDiaryRatingBar';
import LanguageManager from '../manager/LanguageManager';
import Events from '../constants/Events';



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
      case Events.Symptom: {
        let color = 'transparent';
        switch (objData.severity) {
          case 1: color = 'yellow'; break;
          case 2: color = 'orange'; break;
          case 3: color = 'red'; break;
        }
        if (objData.symptomID === -1) objData.name = 'NO_SYMPTOMS'; //TODO: Temp solution. Needs to be an entry in the database
        return (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewSymptom', {event: item})}>
            <ListItem
              title={LanguageManager.getInstance().getText(objData.name)}
              subtitle={LanguageManager.getInstance().getDateAsText(item.created)}
              leftAvatar={{
                source: Image.resolveAssetSource(objData.icon),
                overlayContainerStyle: {
                  backgroundColor: color
                }
              }}
              chevron={true}
            />
          </TouchableOpacity>
        )
      }
      case Events.Food: {
          return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewMeal', {event: item})}>
              <ListItem
                title={objData.name}
                rightTitle={<FoodDiaryRatingBar active={false} rating={objData.rating} iconSize={5} />}
                subtitle={LanguageManager.getInstance().getDateAsText(item.created)}
                leftIcon={{ name: 'restaurant', containerStyle: {
                    margin: 10
                }}}
                chevron={true}
              />
            </TouchableOpacity>
          )
        
      }
      case Events.GIP: {        
          return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewGIP', {event: item})}>
              <ListItem 
                title={LanguageManager.getInstance().getText('GIP_RESULT')}
                subtitle={LanguageManager.getInstance().getDateAsText(item.created)}
                leftAvatar={{ source: Image.resolveAssetSource(require('../assets/images/GIP_icon.png')),
                overlayContainerStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: "rgba(255, 150, 10, 1)"
                  } }
                }
                chevron={true}
              />
            </TouchableOpacity>
          )        
      }
      
      case Events.Emotion: {
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
              title={LanguageManager.getInstance().getText(picture.imgName)}
              subtitle={LanguageManager.getInstance().getDateAsText(item.created)}
              leftAvatar={{
                source: Image.resolveAssetSource(picture.uri)
              }}
              chevron={true}
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
    } else if (this.state.events == null || this.state.events.length == 0) {
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


