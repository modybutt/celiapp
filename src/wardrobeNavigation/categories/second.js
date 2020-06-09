import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


export default class SecondScreen extends Component {
  render() {
    return (
      <View>
        <Text>second screen</Text>
      </View>
    );
  }
}

SecondScreen.navigationOptions = {
    tabBarIcon: ({tintColor, focused}) => (
        <Icon
            name={focused ? 'md-flame': 'ios-flame'}
            size={focused ? 28 : 22}
            color={tintColor}
            />
    )
}