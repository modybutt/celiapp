import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet
} from 'react-native';
import Dialog from "react-native-dialog";

export default class UsernameDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = { username: '' };
  }

  userNameIsValid = () =>   !!this.state.username &&  (this.state.username.length > 2) 

  buttonDisabled = () => !this.userNameIsValid()

  udateUsername = (name) => this.setState({username: name})


  render() {
    return (
      <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, justifyContent: 'space-around', alignItems: 'center'}}>
          <View></View>
              <Dialog.Container visible={true}>
              <Dialog.Title>Username</Dialog.Title>
              <Dialog.Description>
                Please enter your username.
              </Dialog.Description>
              <Dialog.Input onChangeText={(text) => this.udateUsername(text)}></Dialog.Input>
              <Dialog.Button 
                label={"OK"} 
                onPress = { () => this.props.onUsername(this.state.username)}
                style = {this.buttonDisabled() ? styles.buttonDisabled : ''}
                disabled = {this.buttonDisabled()}/>
            </Dialog.Container>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  buttonDisabled: {
    color: "#ccc"
  }
 });
