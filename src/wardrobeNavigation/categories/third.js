import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


export default class ThirdScreen extends Component {
  render() {
    return (
      <View>
        <Text>third screen</Text>
        {console.log("in thrid screen")}
      </View>
    );
  }
}

ThirdScreen.navigationOptions = {
    tabBarIcon: ({tintColor, focused}) => (
        <Icon
            name={focused ? 'md-flash': 'ios-flash'}
            size={focused ? 28 : 22}
            color={tintColor}
            />
    )
}