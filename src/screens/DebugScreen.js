import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

import TextInputSingleLine from '../components/TextInputSingleLine';
import TextInputMultiLine from '../components/TextInputMultiLine';
import { Icon } from 'expo';
import RoundPictureButton from '../components/RoundPictureButton';
import ActionButton from 'react-native-action-button';
import SymptomTrackerScreen from './SymptomTrackerScreen';
import CustomButton from '../components/CustomButton'
import SearchSymptom from '../components/SearchSymptom';
import EntryList from '../components/EntryList';
import DayChooser from '../components/DayChooser';
import SymptomTimePicker from  '../components/SymptomTimePicker';

export default class DebugScreen extends React.Component {
  static navigationOptions = {
    title: 'Debug',
  };
  

  render() {
    const {navigate} = this.props.navigation;
    const image = __DEV__ ? require('../assets/images/robot-dev.png') : require('../assets/images/robot-prod.png');
    
    return (
      <View style = {styles.container}>
        <FlatList
          data={[
	          {key: 'EntryList', value: <EntryList/>},
            {key: 'Image', value: <Image source = {image} style = {styles.image} />},
            {key: 'RoundImage', value: <Image source = {image} style = {styles.roundImage} />},
            {key: 'TextInputSingleLine', value: <TextInputSingleLine />},
            {key: 'TextInputMultiLine', value: 
              <View style={{height: 200}}>
                <TextInputMultiLine/>
              </View>
            },
            {key: 'HoverButton', value: 
              <TouchableOpacity onPress={() => navigate('Settings')}>
                <Icon.Ionicons
                      name="md-add-circle"
                      size={50}
                      style={{ marginBottom: -3 }}
                    />
              </TouchableOpacity>
            },
            {key: 'SymptomTracker', value: <SymptomTrackerScreen date = {getTodayDate()}/>},
            {key: 'CustomButton', value: <CustomButton />},
            {key: 'RoundPictureButton', value:
              <RoundPictureButton 
                imageURI = "http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg"
                radius = {60}
              />
            },
            {key: 'ActionButton', value: 
              <View style={{width: '100%', height: 200}}>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                  <ActionButton.Item buttonColor='#9b59b6' title="Add Emotion" onPress={() => Alert.alert("Add Emotion Clicked")}>
                  <Icon.Ionicons name="md-create" style={styles.actionButtonIcon} />
                  </ActionButton.Item>
                  <ActionButton.Item buttonColor='#3498db' title="Add Meal" onPress={() => {Alert.alert("Add Meal Clicked")}}>
                    <Icon.Ionicons name="md-notifications-off" style={styles.actionButtonIcon} />
                  </ActionButton.Item>
                  <ActionButton.Item buttonColor='#1abc9c' title="Add Symptom" onPress={() => {Alert.alert("Add Symptom Clicked")}}>
                    <Icon.Ionicons name="md-done-all" style={styles.actionButtonIcon} />
                  </ActionButton.Item>
                </ActionButton>
              </View>
            },
			      {key: 'SearchSymptom', value: <SearchSymptom />},
            {key: 'DayChooser', value: <DayChooser date = {getTodayDate()}/>},
            {key: 'TimePicker', value: <SymptomTimePicker/>},
             
          ]}

          renderItem={({item}) => this.renderItem(item)}
        />       
      </View>
	  );
  }  

  renderItem(item) {
    return (
      <View style = {styles.story}>
        <Text style = {styles.text}>{item.key}</Text>
        {item.value}
      </View>
    )
  }
}

function getTodayDate(){
  return new Date()
}


const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  story: {
    borderColor: '#DDD',
    borderWidth: 5,
    padding: 10,
  },
  text: {
    backgroundColor: '#666',
    color: '#DDD',
    fontSize: 22,
    textAlign: 'center',
  },
  image: {
    borderColor: '#000',
    borderWidth: 3,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  roundImage: {
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 360,
  }
});