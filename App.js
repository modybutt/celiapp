import React from 'react';
import { View, StyleSheet, AppState } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingScreen from './src/screens/LoadingScreen';
import DatabaseManager from './src/manager/DatabaseManager';
import LanguageManager from './src/manager/LanguageManager';
import GlutonManager from './src/manager/GlutonManager';
import GearManager from './src/manager/GearManager';
import UploadManager from './src/manager/UploadManager';
import NotificationManager from './src/manager/NotificationManager';
import UsernameDialog from './src/components/UsernameDialog';


import { } from 'react-native-dotenv';
import FlashMessage from 'react-native-flash-message';

export default class App extends React.Component {
  state = {
    isSplashReady: false,
    isAppReady: false,
    appState: AppState.currentState
  }

  componentDidMount() {
    DatabaseManager.getInstance().loadSettings(null, 
      (_, error) => { alert("error loading settings" + JSON.stringify(error)); }, 
      (_, {rows: { _array }}) => {
        let settings = {};

        for (var i in _array) {
          settings[_array[i].name] = JSON.parse(_array[i].objData);
        }
        
        this.initApplication(settings);
      }
    );

    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    console.log("unmounting App")
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      nextAppState.match(/inactive|background/) &&
      this.state.appState === 'active'
    ) {
      this.uploadFreshData();
      console.log('App is going to background!');
    }
    this.setState({appState: nextAppState});
  };

  initApplication(settings) {
    LanguageManager.getInstance().setLanguage(settings.language);
    NotificationManager.getInstance(); //just to show the user the notification permission screen.
    GlutonManager.getInstance().setBuddy(settings.nickname);
    
    GearManager.getInstance().setWsHost(settings.wsHost);
    GearManager.getInstance().setGearHost(settings.gearHost);
    GearManager.getInstance().connect();
    
    this.uploadFreshData();
    
    this.setState({
      isSplashReady: true,
      hasUserId: !!settings.userId,
      userId: settings.userId
    });
    setTimeout(() =>  this.setState({isAppReady: true}), 3000);
  }

  
  handleNewUsername = (userName) => {
    //console.log("Saving username:" + JSON.stringify(userName.nickname));
    /*'''''''''''''''''''''''''''''''''*register a new User ****************************/
    //UploadManager.getInstance().registerNewUser(userName,(error)=>{alert(error),null});

    /***********************************save user to local DB************************ */
    DatabaseManager.getInstance().saveSettings(userId, userName, (error) => {alert(error)}, null);
    
    this.setState({ 
      hasUserId : true,
      userId: userName})
  };

  getUploadServiceAuthToken = () => this.state.userId

  uploadFreshData() {
    token = this.getUploadServiceAuthToken()
    //TODO get new auth token
    if (token) {
      console.log("User logged in -->", token);
      UploadManager.getInstance().setToken(token.email);
      DatabaseManager.getInstance().fetchUnrecordedData((_, error) => console.error(error), (_, data) => {console.log("--x>", JSON.stringify(data), "<x--")
      UploadManager.getInstance().uploadData(data, () => { DatabaseManager.getInstance().updateLastRecorded(); });
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.isSplashReady == false 
          ? null 
          : this.state.hasUserId 
            ? <AppNavigator/>
            : <UsernameDialog onUsername ={this.handleNewUsername}/>
        }
        <LoadingScreen hide={this.state.isAppReady} style={styles.loading}/>
        <FlashMessage position="bottom" duration={5000}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: '100%',
  },
  loading: {
    position: 'absolute',
    width: '100%', 
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
