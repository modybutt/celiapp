import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Image,
  FlatList
} from 'react-native';

import TextInputSingleLine from '../components/TextInputSingleLine';
import TextInputMultiLine from '../components/TextInputMultiLine';

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
            {key: 'Image', value: <Image source = {image} style = {styles.image} />},
            {key: 'RoundImage', value: <Image source = {image} style = {styles.roundImage} />},
            {key: 'TextInputSingleLine', value: <TextInputSingleLine />},
            {key: 'TextInputMultiLine', value: <TextInputMultiLine />},
            {key: 'Foo', value: <Text>Bar</Text>},
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

// DEPRECATED
function createStory(title, comp) {
  return (
    <View style = {styles.story}>
      <Text style = {styles.text}>{title}</Text>
      {comp}
    </View>
  )
} // -- END DEPRECATED

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