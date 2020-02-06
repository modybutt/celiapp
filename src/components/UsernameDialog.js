import React from 'react';
import {
  View,
  Dimensions,
  Text
} from 'react-native';
import Dialog from "react-native-dialog";

export default class UsernameDialog extends React.Component {

  render() {
    return (
      <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, justifyContent: 'space-around', alignItems: 'center'}}>
          <View></View>
              <Dialog.Container visible={true}>
              <Dialog.Title>Username</Dialog.Title>
              <Dialog.Description>
                Please enter your username.
              </Dialog.Description>
              <Dialog.Input onChangeText={(text) => this.username = text}></Dialog.Input>
              <Dialog.Button label={"OK"} onPress = { () => this.props.onUsername(this.username)}/>
            </Dialog.Container>
      </View>
    );
  }
}
