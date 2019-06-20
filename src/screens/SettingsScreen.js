import React from 'react';
import { Text, View, Button, Picker } from 'react-native';
import Dialog from "react-native-dialog";
import { HeaderBackButton } from 'react-navigation'
import LanguageManager from '../manager/LanguageManager';
import DatabaseManager from '../manager/DatabaseManager';


export default class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: LanguageManager.getInstance().getText("SETTINGS"),
    headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
    headerRight: <View style={{paddingRight: 10}}><Button title={LanguageManager.getInstance().getText("SAVE")} onPress={() => navigation.state.params.onOkPressed(true)}/></View>
  });
  
  state = {
    modified: true, // true for DEBUG now
    cancelSaveDialogVisible: false,
    language: LanguageManager.getInstance().getLanguage(),
  }

  componentDidMount() {        
    this.props.navigation.setParams({ 
        onOkPressed: this.saveCurrentData.bind(this) ,
        onCancelPressed: this.handleCancelButton.bind(this) ,
    })
  }

  saveCurrentData(goHome) {
    LanguageManager.getInstance().setLanguage(this.state.language);
    DatabaseManager.getInstance().saveSettings('language', LanguageManager.getInstance().getLanguage(), (error) => {alert(error)}, null);

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

  showBackDiscardDialog() {
    this.setState({ cancelSaveDialogVisible: true });
  };

  handleBack() {
    this.setState({ cancelSaveDialogVisible: false });
  };

  handleDiscard() {
    this.setState({ cancelSaveDialogVisible: false });
    this.props.navigation.goBack()
  };

  render() {
    return (
      <View>
        <Text>Language</Text>
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: '50%'}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          {Object.values(LanguageManager.getInstance().getAllLanguages()).map((lang) => (
            <Picker.Item key={lang.name} label={lang.name} value={lang.name} />
          ))}
        </Picker>


        <View>
            <Dialog.Container visible={this.state.cancelSaveDialogVisible}>
                <Dialog.Title>Cancel</Dialog.Title>
                <Dialog.Description>
                    Do you really want to discard the entries?
                </Dialog.Description>
                <Dialog.Button label="Back" onPress={() => this.handleBack()} />
                <Dialog.Button label="Discard" onPress={() => this.handleDiscard()} />
            </Dialog.Container>
        </View>
      </View>
    );
  }
}