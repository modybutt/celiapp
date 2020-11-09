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
import LoggingStore from './src/manager/buddyManager/LoggingStore';

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
      (_, { rows: { _array } }) => {
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
    this.setState({ appState: nextAppState });
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
      loggedIn: false,
      gamify: settings.gamify
    });

    if (this.state.hasUserId) {
      TokenManager.getInstance().refreshToken(this.state.userId, this.state.password, this.loginFailedExternally, this.onLoginFailed, this.onLoginSuccess);
    }

    setTimeout(() => this.setState({ isAppReady: true }), 3000);
  }

  handleUserLogin = (userName, password) => {
    loggedIn = TokenManager.getInstance().login(userName, password, this.loginFailedExternally, this.onLoginFailed, this.onLoginSuccess);
  }

  // returned statuscode is 200:
  onLoginSuccess = (res, userData) => {
    const { statusCode, data } = res;
    console.log("LOGIN SUCCESSFUL!");
    this.setState({
      hasUserId: true,
      userId: userData.username,
      password: userData.pw,
      gamify: data.gamify
    })
    DatabaseManager.getInstance().saveSettings('userId', userData.username, (error) => { alert(error) }, null);
    DatabaseManager.getInstance().saveSettings('password', userData.pw, (error) => { alert(error) }, null);
    DatabaseManager.getInstance().saveSettings('gamify', data.gamify === true ? 1 : -1, (error) => { alert(error) }, null);

    // set gamification flag in Store:
    if (data.gamify !== LoggingStore.gamificationFlag) {
      LoggingStore.setGamificationFlag(data.gamify);
    }
  }

  onLoginFailed = (res, userData) => {
    const { statusCode, data } = res;

    console.log("LOGIN FAILED! " + data.message + "TODO: display error msg!");
  }


  loginFailedExternally = (res, userData) => {
    // no internet connection? server offline? etc. --> set gamify-flag randomly!
    console.log("No internet connection?", Math.random());
    if (!this.state.hasUserId && !(this.state.gamify === 1 || this.state.gamify === -1)) {
      if (Math.random() < 0.5) {
        DatabaseManager.getInstance().saveSettings('gamify', 1, (error) => { alert(error) }, null);
        LoggingStore.setGamificationFlag(true)
      } else {
        LoggingStore.setGamificationFlag(false);
        DatabaseManager.getInstance().saveSettings('gamify', -1, (error) => { alert(error) }, null);
      }
    }

    // log in without internet connection:
    this.setState({
      hasUserId: true,
      userId: userData.userName,
      password: userData.pw
    })
    console.warn("LOGGED IN WITHOUT VALID USER!")
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
            ? <AppNavigator />
            : <UsernameDialog onSubmit={this.handleUserLogin} />
        }
        <LoadingScreen hide={this.state.isAppReady} style={styles.loading} />
        <FlashMessage position="bottom" duration={5000} />
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