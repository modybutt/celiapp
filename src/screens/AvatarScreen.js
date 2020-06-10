import React from "react";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
import MenuButton from "../components/MenuButton";
import InitWardrobeNavigator from "../wardrobeNavigation/InitWardrobeNavigator";
import { Avatar, Piece } from "../../avataaars-lib/react-native-avataaars";

export default class AvatarScreen extends React.Component {
  onPopupEvent(eventName, index) {
    if (eventName !== "itemSelected") {
      return;
    }

    switch (index) {
      case 0:
        this.props.navigation.navigate("Settings");
        break;
      // case 1: this.props.navigation.navigate('Camera'); break;
      case 1:
        this.props.navigation.navigate("Gear");
        break;
      default:
        this.props.navigation.navigate("Debug");
        break;
    }
  }

  render() {
    return (
      <View style={styles.background}>
        <Avatar
          size={300}
          avatarStyle="Circle"
          topType="LongHairMiaWallace"
          accessoriesType="Prescription01"
          hairColor="BrownDark"
          facialHairType="Blank"
          clotheType="Hoodie"
          clotheColor="PastelBlue"
          eyeType="Happy"
          eyebrowType="Default"
          mouthType="Smile"
          skinColor="Light"
        />
        <InitWardrobeNavigator></InitWardrobeNavigator>

        <Piece
          pieceType="top"
          pieceSize="100"
          topType="LongHairFro"
          hairColor="Red"
        />
        <Piece
          pieceType="facialHair"
          pieceSize="100"
          facialHairType="BeardMajestic"
        />
        <MenuButton navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  popup: {
    position: "absolute",
    right: 40,
    top: 40,
  },
  gluton: {
    //position: 'absolute',
    top: "25%",
    //left: '25%',
    width: "100%",
    alignItems: "center",
  },
});
