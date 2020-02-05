import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingScreen from './src/screens/LoadingScreen';
import DatabaseManager from './src/manager/DatabaseManager';
import LanguageManager from './src/manager/LanguageManager';
import GlutonManager from './src/manager/GlutonManager';
import GearManager from './src/manager/GearManager';
import UploadManager from './src/manager/UploadManager';
import Notifiationmanager from './src/manager/NotificationManager';
// import UsernameDialog from './src/components/UsernameDialog';

import { } from 'react-native-dotenv';

export default class App extends React.Component {
  state = {
    isSplashReady: false,
    isAppReady: false,
  }

  componentDidMount() {
    DatabaseManager.getInstance().loadSettings(null, 
      (_, error) => { alert(JSON.stringify(error)); }, 
      (_, {rows: { _array }}) => {
        let settings = {};

        for (var i in _array) {
          settings[_array[i].name] = JSON.parse(_array[i].objData);
        }
        
        this.initApplication(settings);
      }
    );
  }

  initApplication(settings) {
    LanguageManager.getInstance().setLanguage(settings.language);
    Notifiationmanager.getInstance(); //just to show the user the notification permission screen.
    GlutonManager.getInstance().setBuddy(settings.nickname);
    
    GearManager.getInstance().setWsHost(settings.wsHost);
    GearManager.getInstance().setGearHost(settings.gearHost);
    GearManager.getInstance().connect();
    
    UploadManager.getInstance().setToken(settings.nickname || 'unknownUser');
    
    DatabaseManager.getInstance().fetchUnrecordedData(
      (_, error) => console.error(error),
      (_, data) => {
        UploadManager.getInstance().uploadData(
          data,
          () => { DatabaseManager.getInstance().updateLastRecorded(); }
        );
      }
    );
    
    this.setState({
      isSplashReady: true,
      hasToken: !!settings.nickname
    });
    setTimeout(() =>  this.setState({isAppReady: true}), 3000);
  }

  
  handleNewUsername = (e) => {
    //TODO get new auth token
    //TODO persist user name to DB
    this.setState({hasToken: true})
  };

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       {this.state.isSplashReady == false
  //         ? null
  //         : this.state.hasToken
  //           ? <AppNavigator/>
  //           : <UsernameDialog onUsername ={this.handleNewUsername}/>
  //       }
  //       <LoadingScreen hide={this.state.isAppReady} style={styles.loading}/>
  //     </View>
  //   );
  // }
  
  render() {
      return (
        <View style={styles.container}>
          {this.state.isSplashReady == false ? null : <AppNavigator/>}
          <LoadingScreen hide={this.state.isAppReady} style={styles.loading}/>
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
