import React from 'react';
import { View, Text, Button, StyleSheet, } from 'react-native';
import LanguageManager from '../manager/LanguageManager';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import TextInputSingleLine from '../components/TextInputSingleLine';

export default class GearScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: LanguageManager.getInstance().getText("GEAR"),
  });

  state = {
    wsHost: "ws://192.168.1.125:8080",
    wsConnected: false,
    gearHost: "192.168.1.199:20000",
    gearLinked: false,
  }

  componentDidMount() {
    
  }

  toggleWsConnect() {
    if (this.state.wsConnected == true) {
      this.ws.send('unlink');
      this.ws.close(1000, "Work complete");
      return;
    }

    this.ws = new WebSocket(this.state.wsHost);

    this.ws.onopen = e => {
      this.setState({wsConnected: true});
    };

    this.ws.onmessage = e => {
      if (e.data == "linked") {
        this.setState({gearLinked: true});
      } else if (e.data == "unlinked") {
        this.setState({gearLinked: false});
      } else {
        alert("unknown message: " + e.data);
      }
    };

    this.ws.onerror = e => {
      alert(e.message)
    };

    this.ws.onclose = e => {
      this.setState({wsConnected: false});
    };
  }

  toggleGearLink() {
    if (this.state.gearLinked == true) {
      this.ws.send('unlink');
      return;
    }

    this.ws.send('link ' + this.state.gearHost);
  }

  render() {
    return (
      <View style={styles.container}>
        <HorizontalLineWithText text={LanguageManager.getInstance().getText("WEB_SERVICE")}/>
        <Text>{this.state.wsConnected ? "Connected" : "Disconnected"}</Text>
        <TextInputSingleLine ref={component => this._name = component} defaultValue={this.state.wsHost} onTextChanged={(host) => this.setState({wsHost: host})} />
        <HorizontalLineWithText />
        <Button title={this.state.wsConnected ? "Disconnect" : "Connect"} onPress={() => this.toggleWsConnect()} />
        <Button title="TestSocket" onPress={() => this.ws.send('Hallo Welt!')} />
        <HorizontalLineWithText text={LanguageManager.getInstance().getText("CELI_GEAR")}/>
        <Text>{this.state.gearLinked ? "Linked" : "Unlinked"}</Text>
        <TextInputSingleLine ref={component => this._name = component} defaultValue={this.state.gearHost} onTextChanged={(host) => this.setState({gearHost: host})} />
        <HorizontalLineWithText />
        <Button title={this.state.gearLinked ? "Unlink" : "Link"} onPress={() => this.toggleGearLink()} />
        <Button title="TestUdp" onPress={() => this.ws.send('msg 1')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});