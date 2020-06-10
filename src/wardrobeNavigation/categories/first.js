import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>homescreen</Text>
        {console.log("in first screen")}
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
    tabBarIcon: ({tintColor, focused}) => (
        <Icon
            name={focused ? 'ios-planet': 'md-planet'}
            size={focused ? 28 : 22}
            color={tintColor}
            />
    )
}