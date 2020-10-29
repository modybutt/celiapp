import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import WardrobeInitTiles from './../WardrobeInitTiles';
import CeliLogger from '../../../../../analytics/analyticsManager';

let myListener;
let firstFocus = true;
let onTabbarPress = false;

export default class WardrobeCategoryShirt extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() { }

  componentWillUnmount() {
    firstFocus = true;
  }

  static navigationOptions = ({ navigation }) => {
    if (myListener === undefined) {

      myListener = navigation.addListener("didFocus", () => {
        if (firstFocus === true) {
          console.log("surpressed didfocus");
          firstFocus = !firstFocus;
          return;
        }
        if (onTabbarPress === false) {
          CeliLogger.addLog(navigation.state.routeName, "focussed via swipe");
        } else {
          CeliLogger.addLog(navigation.state.routeName, "focussed via tap");
          onTabbarPress = false;
        }
      });
    }
    //const parent = navigation.dangerouslyGetParent();
    return {
      //title: "sometitle",
      tabBarIcon: ({ tintColor, focused }) => {
        return (
          <Image
            source={require("./CategoryImages/shirt.png")}
            style={{ height: focused ? 32 : 21, width: focused ? 32 : 21, tintColor: tintColor }}
          />
        );
      },
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        onTabbarPress = true;
        defaultHandler()
      },
    };
  }

  render() {
    console.log()
    return (
      <View style={styles.container}>
        <WardrobeInitTiles category={1}></WardrobeInitTiles>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});