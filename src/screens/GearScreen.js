import React from 'react';
import { ScrollView, Text, Button, Keyboard } from 'react-native';
import LanguageManager from '../manager/LanguageManager';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import TextInputSingleLine from '../components/TextInputSingleLine';
import DatabaseManager from '../manager/DatabaseManager';
import { HeaderBackButton } from 'react-navigation'
import HeaderSaveButton from '../components/HeaderSaveButton';
import GearManager from '../manager/GearManager';

export default class GearScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: LanguageManager.getInstance().getText("GEAR"),
    headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
    headerRight: <HeaderSaveButton onPress={() => navigation.state.params.onOkPressed(true)}/>
  });

  state = {
    wsHost: GearManager.getInstance().getWsHost(),
    gearHost: GearManager.getInstance().getGearHost(),
    wsConnected: GearManager.getInstance().isConnected,
    gearLinked: GearManager.getInstance().isLinked,
    keyboardOpen: false,
  }

  componentDidMount() {
    this.props.navigation.setParams({ 
      onOkPressed: this.saveCurrentData.bind(this) ,
      onCancelPressed: this.handleCancelButton.bind(this) ,
    })

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );

    GearManager.getInstance().setListener(this);
  }

  saveCurrentData(goHome) {
    GearManager.getInstance().setWsHost(this.state.wsHost);
    GearManager.getInstance().setGearHost(this.state.gearHost);

    DatabaseManager.getInstance().saveSettings('wsHost', GearManager.getInstance().getWsHost(), (error) => {alert(error)}, null);
    DatabaseManager.getInstance().saveSettings('gearHost', GearManager.getInstance().getGearHost(), (error) => {alert(error)}, null);
    
    if (goHome) {
        setTimeout(() => this.props.navigation.goBack(), 100);
    }
  }

  handleCancelButton() {
    if (this.state.modified == true) {
        this.showBackDiscardDialog()
    } else {
        this.props.navigation.goBack()
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    GearManager.getInstance().setListener(null);
  }

  _keyboardDidShow = ()  => {
    this.setState({
        keyboardOpen: true,
    })
  }

  _keyboardDidHide = ()  => {
    this.setState({
        keyboardOpen: false,
    })
  }

  gearStateChanged() {
    this.setState({
      wsConnected: GearManager.getInstance().isConnected,
      gearLinked: GearManager.getInstance().isLinked,
    })
  }

  gearHandleMessage(msg) {
    // nothing here
  }

  toggleWsConnect() {
    if (this.state.wsConnected == true) {
      GearManager.getInstance().disconnect();
    } else {
      GearManager.getInstance().connect();
    }
  }

  toggleGearLink() {
    if (this.state.gearLinked == true) {
      GearManager.getInstance().unlink();
    } else {
      GearManager.getInstance().link();
    }
  }

  render() {
    const marginToUse = ((this.state.keyboardOpen) ? 300 : 0);
        
    return (
      <ScrollView style={{marginBottom: marginToUse}}>
        <HorizontalLineWithText text={LanguageManager.getInstance().getText("WEB_SERVICE")}/>
        <Text>{this.state.wsConnected ? "Connected" : "Disconnected"}</Text>
        <TextInputSingleLine ref={component => this._name = component} defaultValue={this.state.wsHost} onTextChanged={(host) => this.setState({wsHost: host})} />
        <HorizontalLineWithText />
        <Button title={this.state.wsConnected ? "Disconnect" : "Connect"} onPress={() => this.toggleWsConnect()} />
        <Button title="TestSocket" onPress={() => GearManager.getInstance().sendMessage("Hallo Welt!")} />
        <HorizontalLineWithText text={LanguageManager.getInstance().getText("CELI_GEAR")}/>
        <Text>{this.state.gearLinked ? "Linked" : "Unlinked"}</Text>
        <TextInputSingleLine ref={component => this._name = component} defaultValue={this.state.gearHost} onTextChanged={(host) => this.setState({gearHost: host})} />
        <HorizontalLineWithText />
        <Button title={this.state.gearLinked ? "Unlink" : "Link"} onPress={() => this.toggleGearLink()} />
        <Button title="TestUdp" onPress={() => GearManager.getInstance().sendMessage("msg 2")} />
      </ScrollView>
    );
  }
}