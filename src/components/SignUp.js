
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
import { ScrollView } from 'react-native-gesture-handler';


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', password2: '' };
  }

  userNameIsValid = () => !!this.state.username && (this.state.username.length > 3)
  pwIsValid = () => !!this.state.password && (this.state.password.length > 3)
  pwMatch = () => {
    !!this.state.password
    const { password, password2 } = this.state;
    // perform all neccassary validations
    if (password === password2) {
      console.log("Passwords match");
      return true;
    }
  }

  buttonDisabled = () => !(this.userNameIsValid() && this.pwIsValid() && this.pwMatch())

  updateUsername = (name) => this.setState({ username: name })

  updatePassword = (pw) => this.setState({ password: pw })
  updatePassword2 = (pw2) => this.setState({ password2: pw2 })

  componentDidMount() {
    //this.emailInput.focus();
  }

  render() {
    return (
      <ScrollView>
        <View style={{
          ...styles.container,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}>
          <View></View>
          <Text style={styles.title}>CeliApp</Text>
          <Image style={styles.logo} source={LOGO} />
          <View style={styles.container}>
            <Text>Welcome the 21-day challenge!</Text>
            <Text>Please provide your email address to get started:</Text>
            <TextInput
              placeholder="some@email.com"
              ref={(input) => { this.emailInput = input; }}
              autoCapitalize="none"
              textContentType="emailAddress"
              style={styles.emailInput}
              onChangeText={(text) => this.updateUsername(text)} />

            <TextInput
              secureTextEntry={true}
              placeholder="password"
              ref={(input) => { this.nicknameInput = input; }}
              textContentType="password"
              style={styles.passwordInput}
              onChangeText={(password) => this.updatePassword(password)} />

            <TextInput
              secureTextEntry={true}
              placeholder="repeat password"
              ref={(input) => { this.nicknameInput = input; }}
              style={styles.passwordInput}
              onChangeText={(password2) => this.updatePassword2(password2)} />

          </View>
          <Button
            buttonStyle={styles.button}
            titleStyle={{ color: 'black' }}
            title=" Sign Up "
            type="outline"
            onPress={() => this.props.onRegister("johnsmith", this.state.username, this.state.password)}
            style={this.buttonDisabled() ? styles.buttonDisabled : ''}
            disabled={this.buttonDisabled()}
          />
          <Button
            buttonStyle={styles.button}
            titleStyle={{ color: 'black' }}
            title={" You already have an Account?\n Login here! "}
            type="outline"
            onPress={() => this.props.switchGui()}
            style={this.buttonDisabled() ? styles.buttonDisabled : ''}
          />
          {/*</View> */}
          {/*</View>*/}
          <View></View>
          <View></View>
        </View>
      </ScrollView>
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
    padding: 5
  },
  passwordInput: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5
  },
  button: {
    width: 300,
    height: 40,
    margin: 10,
    marginBottom: 2,
    padding: 5,
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