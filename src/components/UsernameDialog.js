import React from 'react';
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import Dialog from "react-native-dialog";

import { Button } from 'react-native-elements';

import LOGO from '../assets/images/web_hi_res_512.png';

export default class UsernameDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = { username: '' };
  }

  userNameIsValid = () => !!this.state.username && (this.state.username.length > 3)

  buttonDisabled = () => !this.userNameIsValid()

  updateUsername = (name) => this.setState({username: name})

  componentDidMount(){
    this.emailInput.focus();
  }

  render() {
    return (
      <View style={{...styles.container,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height}}>
        <View></View>
        <Text style={styles.title}>CeliApp</Text>
        <Image style={styles.logo} source={LOGO} />
        <View style={styles.container}>
          <Text>Welcome to the CeliApp and the 21-day challenge!</Text>
          <Text>Please provide your email address to get started:</Text>
          <TextInput
            ref={(input) => { this.emailInput = input; }}
            style={styles.emailInput}
            onChangeText={(text) => this.updateUsername(text)} />

          </View>
          <Button
            buttonStyle={styles.button}
            titleStyle={{ color: 'black' }}
            title=" Sign Up "
            type="outline"
            onPress = { () => this.props.onUsername(this.state.username)}
                            style = {this.buttonDisabled() ? styles.buttonDisabled : ''}
                            disabled = {this.buttonDisabled() }
          />
          <View></View>
          <View></View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    marginTop: 75,
    fontSize: 32,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    margin: 50,
    borderColor: '#000',
    borderWidth: 1,
  },
  emailInput: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  button: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 2,
   },
   buttonDisabled: {
     color: "gray",
   },
 });
