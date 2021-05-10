
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
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class UsernameDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: false };
  }

  switchGui = () => {
    this.setState({ login: !this.state.login });
  }
  render() {
    return (
      this.state.login ?
        <SignIn switchGui={this.switchGui} onLogin={this.props.onLogin} /> :
        <SignUp switchGui={this.switchGui} onRegister={this.props.onRegister} />
    );
  }
}
