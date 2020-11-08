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
import TokenManager from './src/manager/TokenManager';

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
        console.log("appsettings-->",settings)
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
      userId: settings.userId,
      password: settings.password,
      loggedIn: false
    });

    if(this.state.hasUserId){
      TokenManager.getInstance().refreshToken(this.state.userId, this.state.password, this.doNotLogMeIn, this.logMeIn /*null,null*/);
    }

    setTimeout(() =>  this.setState({isAppReady: true}), 3000);
  }


  handleUserLogin = (userName, password) => {
    loggedIn = TokenManager.getInstance().login(userName, password, this.doNotLogMeIn, this.logMeIn /*null,null*/); // Use callback to set varable!

    DatabaseManager.getInstance().saveSettings('userId', userName, (error) => {alert(error)}, null);
    DatabaseManager.getInstance().saveSettings('password', password, (error) => {alert(error)}, null);
    this.setState({ 
      hasUserId : true,
      userId: userName,
      password : password,
    })
    //TokenManager.getInstance().login(this.state.userId, this.state.password, null, null)
  }

  logMeIn = (obj) => {
    console.log("%%%%%% LOGIN SUCCESSFUL! %%%%%%%%%");
    console.log("thatstheobject: -->", obj)
  }

  doNotLogMeIn = () => {
    console.log("!!!!!!!!!!!!!!!111 LOGIN FAILED!!!!!!!!!!!!!!!!!")
  }
  

  getUploadServiceAuthToken = () => this.state.userId

  uploadFreshData() {
    token = this.getUploadServiceAuthToken()
    //TODO get new auth token
    if (token) {
      UploadManager.getInstance().setToken(token);
      DatabaseManager.getInstance().fetchUnrecordedData((_, error) => console.error(error), (_, data) => {
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
            : <UsernameDialog onSubmit={this.handleUserLogin} />
        }

        {/**console.log("try to renew token here:")
        //tkn = TokenManager.getInstance().fetchNewToken(this.state.userId, this.state.password, null, null),
        //console.log("--> new token:",tkn)
      **/}
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