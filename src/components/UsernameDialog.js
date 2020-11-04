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
import { createStyles, maxHeight } from 'react-native-media-queries'; 
export default class UsernameDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = { email: '', password:'', displayName:'' };
  }

  userNameIsValid = () => !!this.state.email && (this.state.email.length > 3)

  buttonDisabled = () => !this.userNameIsValid()

  //updateUsername = (name) => this.setState({username: name})

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
          <Text>Welcome the 21-day challenge!</Text>
          <Text>Please provide your user data to get started:</Text>
          <TextInput
            value={this.state.email}
            placeholder="email"
            ref={(input) => { this.emailInput = input; }}
            style={styles.emailInput}
            onChangeText={(email) => this.setState({email})} />
{/* 
          <TextInput
            placeholder="nickname"
            ref={(input) => { this.usernameInput = input; }}
            style={styles.nicknameInput}
            onChangeText={(displayName) => this.setState({ displayName })} /> */}

  	      <TextInput
            secureTextEntry={true}
            placeholder="password"
            ref={(input) => { this.nicknameInput = input; }}
            style={styles.passwordInput}
            onChangeText={(password) => this.setState({password})} />

          </View>
          <Button
            buttonStyle={styles.button}
            titleStyle={{ color: 'black' }}
            title=" Sign Up "
            type="outline"
            onPress = { () => this.props.onUsername(this.state)}
                            style = {this.buttonDisabled() ? styles.buttonDisabled : ''}
                            disabled = {this.buttonDisabled() }
          />
          <View></View>
          <View></View>
      </View>
    );
  }
}

var base = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    marginTop: '10%',
    marginBottom: 0,
    fontSize: 32,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    margin: '10%',
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
  nicknameInput: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },

  passwordInput: {
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

 const styles = createStyles(
    base,
     maxHeight(700, {
        title: {
            marginTop: '6%',
            marginBottom: 0,
            fontSize: 20,
            fontWeight: 'bold',
          },
          logo: {
            width: 100,
            height: 100,
            margin: '3%',
            borderColor: '#000',
            borderWidth: 1,
          }
     })
 );