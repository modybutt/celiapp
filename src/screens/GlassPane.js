import React from 'react';
import {
  View,
  Text,
  Button,
  //StyleSheet,
  //Platform  
} from 'react-native';

export default class GlassPane extends React.Component {
  static navigationOptions = {
    title: 'GlassPane',
    //headerVisible: false,
  };

  render() {
    return (
        <View>
            <Text>
                This is the true shit, Baby!
            </Text>
            <Button title="Back" onPress={() => this.props.navigation.goBack()} />
            <Button title="Oops!" onPress={() => this.props.navigation.navigate('Main')} />
            <Button title="Foo" onPress={() => this.props.navigation.navigate('Calendar')} />
        </View>
	);
  }  
}
