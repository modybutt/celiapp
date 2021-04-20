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
import moment from 'moment';
import HistoryEntry from '../components/HistoryEntry';

import {
  images as food_images
} from '../components/FoodDiary/FoodTrackerClassConstants';

import {
  images as emotion_images
} from '../components/EmoteTracker/EmoteTrackerConstants';

import {
  images as gip_images
} from '../components/GipTracker/GipTrackerClassConstants';


export default class EntryList extends React.Component {
  state = {
    loading: true,
    events: null,
    //error: null,
  }

  updateList(timestamp) {
    this.setState({ loading: true });

    DatabaseManager.getInstance().fetchEvents(timestamp,
      (_, error) => { alert(error) },
      (_, { rows: { _array } }) => this.setState(
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

  onLongPressTouchable() {
    //Alert.alert("You opened the severity chooser")
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 3,
        }}
      />
    );
  };

  getFoodImageSource(id) {
    switch (id) {
      case 0:
        return food_images.gluten.uri;
      case 1:
        return food_images.nogluten.uri;
      case 2:
        return food_images.noidea.uri;
    }
  }

  getGipImageSource(id) {
    switch (id) {
      case 0:
        return gip_images.gluten.uri;
      case 1:
        return gip_images.nogluten.uri;
      case 2:
        return gip_images.noidea.uri;
    }
  }

  getEmotionImageSource(id) {
    switch (id) {
      case 1: return emotion_images.unhappy.uri;
      case 2: return emotion_images.slightlyUnhappy.uri;
      case 3: return emotion_images.neither.uri;
      case 4: return emotion_images.slightlyHappy.uri;
      case 5: return emotion_images.happy.uri;
    }

  }

  renderItem(item) {
    let objData = JSON.parse(item.objData);
    let createdDate = moment(item.created);

    let time = createdDate.local().format('lll');
    switch (item.eventType) {
      case Events.Symptom: {
        const color = '#1DBBA0';
        let severityText = 'no symptom';
        switch (objData.severity) {
          case 1: severityText = 'Mild'; break;
          case 2: severityText = 'Moderate'; break;
          case 3: severityText = 'Severe'; break;
        }
        if (objData.symptomID === 0) objData.name = 'NO_SYMPTOMS'; //TODO: Temp solution. Needs to be an entry in the database
        return (
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('ViewSymptom', { event: item })}>
            <HistoryEntry
              onAddButtonClicked={() => { }}
              navigationName={LanguageManager.getInstance().getText(objData.name)}
              title={time}
              subtitle={severityText + " " + LanguageManager.getInstance().getText(objData.name)}
              viewallText={'expand'}
              color={color}
              image={objData.icon} />
          </TouchableOpacity>
        )
      }

      case Events.Food: {
        let color = '#3398DE';
        image = this.getFoodImageSource(objData.type);
        return (
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('ViewMeal', { event: item })}>
            <HistoryEntry
              onAddButtonClicked={() => { }}
              navigationName={LanguageManager.getInstance().getText(objData.name)}
              title={time}
              subtitle={LanguageManager.getInstance().getText(objData.name)}
              viewallText={'expand'}
              color={color}
              image={image} />
          </TouchableOpacity>
        )

      }
      case Events.GIP: {
        let color = '#FF8D1E';
        image = this.getGipImageSource(objData.result);
        return (
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('ViewGIP', { event: item })}>
            < HistoryEntry
              onAddButtonClicked={() => { }}
              navigationName={LanguageManager.getInstance().getText(objData.name)}
              title={time}
              subtitle={LanguageManager.getInstance().getText(objData.note)}
              viewallText={'expand'}
              color={color}
              image={image} />
          </TouchableOpacity >
        )

      }

      case Events.Emotion: {
        let color = '#9958B7';
        let image = this.getEmotionImageSource(objData.type);
        return (
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('ViewEmote', { event: item })}>
            < HistoryEntry
              onAddButtonClicked={() => { }}
              navigationName={LanguageManager.getInstance().getText(objData.name)}
              title={time}
              subtitle={LanguageManager.getInstance().getText(objData.note)}
              viewallText={'expand'}
              color={color}
              image={image} />
          </TouchableOpacity>
        )
      }
      case Events.LogEvent: {
        // eaten up!
        break;
      }
      default: {
        return (
          <Text> { JSON.stringify(item)}</Text >
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
      // second ScrollView (horizontal) to avoid virtualised list warnings https://github.com/GeekyAnts/NativeBase/issues/2947
      return (
        <ScrollView horizontal={true}>
          <FlatList style={styles.items}
            data={(this.state.events).filter(x => x.eventType !== Events.LogEvent)}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => this.renderItem(item)}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </ScrollView>
      );
    }
  }
  //https://nyxo.app/fixing-virtualizedlists-should-never-be-nested-inside-plain-scrollviews
  render() {
    return (
      <ScrollView style={styles.items}>
        <NavigationEvents
          onDidFocus={() => this.updateList(this.props.selectedDate)}
        />
        {this.renderEventList()}
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({

});


