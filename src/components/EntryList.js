import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { NavigationEvents } from 'react-navigation';
import DatabaseManager from '../manager/DatabaseManager';

import LanguageManager from '../manager/LanguageManager';
import Events from '../constants/Events';
import moment from 'moment';
import HistoryEntry from '../components/HistoryEntry';

import {
  images as symptom_images
} from '../components/SymptomTracker/SymptomIconButtonConstants';

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
    events: []
  }

  itemHeights = [];
  flatListRef = null;

  updateList(timestamp) {
    this.setState({ loading: true });

    //use this when we can get flatlist scrolltoindex working
    // DatabaseManager.getInstance().fetchEventsCountAfterDate(
    //     timestamp,
    //       (_, error) => { alert(error) },
    //     (_, { rows: { _array } }) => {
    //       console.log("get num events():",_array);
    //       this.setState(
    //           {
    //             initialScrollIndex: _array[0].noEvents,
    //             //error: res.error || null,
    //             loading: false,
    //           });
    //       const numEventsToScrollPast = Math.min(_array[0].noEvents, this.state.events.length-1)
    //       if(this.flatListRef) {
    //         console.log("skip:", numEventsToScrollPast)
    //         this.flatListRef.scrollToIndex({
    //           animated: true,
    //           index: numEventsToScrollPast,
    //           viewOffset: 0,
    //           viewPosition: 0
    //         })
    //       }
    //     }
    // );

    DatabaseManager.getInstance().fetchEventsBeforeDate(timestamp,
      (_, error) => { alert(error) },
      (_, { rows: { _array } }) => {
        console.log("update list():",_array.length);
        this.setState(
            {
              events: _array.filter(x => x.eventType !== Events.LogEvent),
              //error: res.error || null,
              loading: false,
            })
        console.log("received: ", this.state.events.length)
      }
    );
  }
  
  toggleCulprit(item) {
      DatabaseManager.getInstance().toggleCulpritOnMealEvent(item,
          (error) => { alert(error) },
          () => {}
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
  getSymptomImageSource(id) {
    let image = null;
    switch (id) {
      case 0:
        image = symptom_images.id0.uri
        break;
      case 1:
        image = symptom_images.id1.uri
        break;
      case 2:
        image = symptom_images.id2.uri
        break;
      case 3:
        image = symptom_images.id3.uri
        break;
      case 4:
        image = symptom_images.id4.uri
        break;
      case 5:
        image = symptom_images.id5.uri
        break;
      case 6:
        image = symptom_images.id6.uri
        break;
      case 7:
        image = symptom_images.id7.uri
        break;
      case 8:
        image = symptom_images.id8.uri
        break;
      case 9:
        image = symptom_images.id9.uri
        break;
      case 10:
        image = symptom_images.id10.uri
        break;
      case 11:
        image = symptom_images.id11.uri
        break;
      case 12:
        image = symptom_images.id12.uri
        break;
    }
    return image;
  }

  renderItem(item, index) {
    let objData = JSON.parse(item.objData);
    let createdDate = moment(item.created);

    let time = createdDate.local().format('lll');
    switch (item.eventType) {

      case Events.Symptom: {
        const color = '#1DBBA0';
        let severityText = 'no symptom';
        switch (objData.severity) {
          case 1: severityText = 'Mild '; break;
          case 2: severityText = 'Moderate '; break;
          case 3: severityText = 'Severe '; break;
        }
        let image = this.getSymptomImageSource(objData.symptomID);
        if (objData.symptomID === 0){
          objData.name = 'NO_SYMPTOMS';
          severityText = '';
        } //TODO: Temp solution. Needs to be an entry in the database
        return (
          //<TouchableOpacity onPress={() => this.props.navigation.navigate('ViewSymptom', { event: item })}>
          <HistoryEntry
            onEditButtonClicked={() => this.props.navigation.navigate('AddSymptom', { event: item, edit: true })}
            onRightButtonClicked={() => this.props.navigation.navigate('DeleteScreen', { event: item })}
            navigationName={LanguageManager.getInstance().getText(objData.name)}
            title={time}
            subtitle={severityText + LanguageManager.getInstance().getText(objData.name)}
            viewMiddleButtonText={'View'}
            viewRightButtonText={'Delete'}
            color={color}
            image={image}
            onLayout={object => this.itemHeights[index] = object.nativeEvent.layout.height}
          />
          //</TouchableOpacity>
        )
      }

      case Events.Food: {
        let color = '#3398DE';
        const image = this.getFoodImageSource(objData.type);
        return (
          //<TouchableOpacity onPress={() => this.props.navigation.navigate('ViewMeal', { event: item })}>
          <HistoryEntry
            onLeftButtonClicked={() => { this.toggleCulprit(item); }}
            onEditButtonClicked={() => this.props.navigation.navigate('AddMeal', { event: item, edit: true })}
            onRightButtonClicked={() => this.props.navigation.navigate('DeleteScreen', { event: item })}
            navigationName={LanguageManager.getInstance().getText(objData.name)}
            title={time}
            subtitle={LanguageManager.getInstance().getText(objData.name)}
            //viewLeftButtonText={'culprit'}
            viewMiddleButtonText={'View'}
            viewRightButtonText={'Delete'}
            color={color}
            image={image}
            onLayout={object => this.itemHeights[index] = object.nativeEvent.layout.height}
          />
          //</TouchableOpacity>
        )

      }
      case Events.GIP: {
        let color = '#FF8D1E';
        const image = this.getGipImageSource(objData.result);
        return (
          //<TouchableOpacity onPress={() => this.props.navigation.navigate('ViewGIP', { event: item })}>
          <HistoryEntry
              onEditButtonClicked={() => this.props.navigation.navigate('AddGIP', { event: item, edit: true })}
            onRightButtonClicked={() => this.props.navigation.navigate('DeleteScreen', { event: item })}
            navigationName={LanguageManager.getInstance().getText(objData.name)}
            title={time}
            subtitle={LanguageManager.getInstance().getText(objData.note)}
            viewMiddleButtonText={'View'}
            viewRightButtonText={'Delete'}
            color={color}
            image={image}
            onLayout={object => this.itemHeights[index] = object.nativeEvent.layout.height}
          />
          //</TouchableOpacity >
        )

      }

      case Events.Emotion: {
        let color = '#9958B7';
        let image = this.getEmotionImageSource(objData.type);
        return (
          //<TouchableOpacity onPress={() => this.props.navigation.navigate('ViewEmote', { event: item })}>
          <HistoryEntry
              onEditButtonClicked={() => this.props.navigation.navigate('AddEmote', { event: item, edit: true })}
            onRightButtonClicked={() => this.props.navigation.navigate('DeleteScreen', { event: item })}
            navigationName={LanguageManager.getInstance().getText(objData.name)}
            title={time}
            subtitle={LanguageManager.getInstance().getText(objData.note)}
            viewMiddleButtonText={'View'}
            viewRightButtonText={'Delete'}
            color={color}
            image={image}
            onLayout={object => this.itemHeights[index] = object.nativeEvent.layout.height}
          />
          //</TouchableOpacity>
        )
      }
      case Events.LogEvent: {
        // eaten up!
        brwMiddle      }
      default: {
        return (
          <Text> { JSON.stringify(item)}</Text >
        )
      }
    }
  }

  getItemLayout = (data, index) => {
    const item_height = 100;
    //const length = this.itemHeights[index];
    const length = item_height;
    //const offset = this.itemHeights.slice(0,index).reduce((a, c) => a + c, 0)
    const offset = item_height * index;
    //console.log("layout:",{length, offset, index})
    return {length, offset, index}
  }

  renderEventList() {
    if (this.state.loading) {
      return (
        <ActivityIndicator size='large' color='lightblue' />
      );
    } else if (this.state.events == null || this.state.events.length === 0) {
      return (
        <View />
      );
    } else {
      // second ScrollView (horizontal) to avoid virtualised list warnings https://github.com/GeekyAnts/NativeBase/issues/2947
      return (

          <FlatList
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
            data={this.state.events}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => this.renderItem(item)}
            ItemSeparatorComponent={this.renderSeparator}
            getItemLayout={this.getItemLayout}
            initialScrollIndex = {this.initialScrollIndex}
            ref={(ref) => { this.flatListRef = ref; }}
            ListFooterComponent = {() => (<View><Text></Text></View>)}
            ListFooterComponentStyle = {{height: 600, flexGrow: 1}}

          />

      );
    }
  }
  //https://nyxo.app/fixing-virtualizedlists-should-never-be-nested-inside-plain-scrollviews
  render() {
    return (
      <View  horizontal={true}>
        <NavigationEvents
          onDidFocus={() => this.updateList(this.props.selectedDate)}
        />
        {this.renderEventList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


