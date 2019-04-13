import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet,
  Image,
} from 'react-native';

export default class DebugScreen extends React.Component {
  static navigationOptions = {
    title: 'Debug',
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView style = {styles.container}>
        {createStory("Image", <Image source = {__DEV__ ? require('../assets/images/robot-dev.png') : require('../assets/images/robot-prod.png')} style = {styles.image} />)}
        {createStory("RoundImage", <Image source = {__DEV__ ? require('../assets/images/robot-dev.png') : require('../assets/images/robot-prod.png')} style = {styles.roundImage} />)}
        {createStory("Foo", <Text>Bar</Text>)}
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
  roundImage: {
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 360,
  }
});