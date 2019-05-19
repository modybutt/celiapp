import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Alert, YellowBox} from "react-native";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";

export default class DropDownMenue extends Component {

  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);
   }

  render() {
    return (
      <MenuProvider style={styles.container}>
        <Menu onSelect={value => alert(`You Clicked : ${value}`)}>

          <MenuTrigger >
            <Text style={styles.headerText}>...</Text>
          </MenuTrigger >

          <MenuOptions>
            <MenuOption value={"Edit"}>
              <Text style={styles.menuContent}>Edit</Text>
            </MenuOption>
            <MenuOption value={"Delete"}>
              <Text style={styles.menuContent}>Delete</Text>
            </MenuOption>
            {/*<MenuOption value={3} disabled={true}>
              <Text style={styles.menuContent}>Disabled Menu</Text>
            </MenuOption>*/}
          </MenuOptions>

        </Menu>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
  }, 
  headerText: {
    fontSize: 20,
    //margin: 10,
    fontWeight: "bold"
  },
  menuContent: {
    color: "#000",
    fontWeight: "bold",
    //padding: 2,
    fontSize: 20
  }
});