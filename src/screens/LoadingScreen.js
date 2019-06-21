import React from 'react';
import { Text, View, Image } from 'react-native';

export default class LoadingScreen extends React.Component {
  render() {
    if (this.props.hide == true) {
      return null;
    }

    return (
      <View style={this.props.style}>
        <Image source={require('../assets/images/splash.png')} style={{width: '100%', height: '50%'}}/>
        <Text>CeliApp</Text>
        <Text>- All You Could Eat -</Text>
      </View>
    );
  }
}
