import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import TextInputSingleLine from '../components/TextInputSingleLine';
import TextInputMultiLine from '../components/TextInputMultiLine';
import RoundPictureButton from '../components/RoundPictureButton';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import SymptomTracker from './SymptomTracker';
import CustomButton from '../components/CustomButton'

export default class DebugScreen extends React.Component {
  static navigationOptions = {
    title: 'Debug',
  };

  render() {
    const {navigate} = this.props.navigation;
    const image = __DEV__ ? require('../assets/images/robot-dev.png') : require('../assets/images/robot-prod.png');

    return (
      <ScrollView style = {styles.container}>
        {createStory("Image", <Image source = {image} style = {styles.image} />)}
        {createStory("RoundImage", <Image source = {image} style = {styles.roundImage} />)}
        {createStory("TextInputSingleLine", <TextInputSingleLine />)}
        {createStory("TextInputMultiLine", <TextInputMultiLine />)}
        {createStory("Foo", <Text>Bar</Text>)}
        {createStory("Round Picture Button", <RoundPictureButton 
                                                imageURI = "http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg"
                                                radius = {60}
                                                />
        )}
        {createStory("SymptomTracker", <SymptomTracker/>)}
        {createStory("CustomButton", <CustomButton/>)}

        <ActionButton buttonColor="rgba(231,76,60,1)">
           <ActionButton.Item buttonColor='#9b59b6' title="Add Emotion" onPress={() => Alert.alert("Add Emotion Clicked")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
           </ActionButton.Item>
           <ActionButton.Item buttonColor='#3498db' title="Add Meal" onPress={() => {Alert.alert("Add Meal Clicked")}}>
             <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
           </ActionButton.Item>
           <ActionButton.Item buttonColor='#1abc9c' title="Add Symptom" onPress={() => {Alert.alert("Add Symptom Clicked")}}>
             <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>    
      </ScrollView>
	  );
  }  
}

function createStory(title, comp) {
  return (
    <View style = {styles.story}>
      <Text style = {styles.text}>{title}</Text>
      {comp}
    </View>
  )
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