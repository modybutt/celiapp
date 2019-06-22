import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Camera, Permissions, Icon } from 'expo';
import LanguageManager from '../manager/LanguageManager';
import Colors from '../constants/Colors';


export default class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: LanguageManager.getInstance().getText("CAMERA"),
  });
  
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    computing: false,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapShot() {
    let photo = await this.camera.takePictureAsync();
    let callback = this.props.navigation.getParam("cb");

    if (callback != null) {
      callback(photo);
      this.props.navigation.goBack();
    }
    
    // DatabaseManager.getInstance().createMealEvent("Example MealEvent", 0, 0, 3, "Image", photo, Date.now(), (error) => { alert(error)}, null);
    // The local image URI is temporary. Use Expo.FileSystem.copyAsync to make a permanent copy of the image.
  }

  takeSnapshot() {
    this.setState({computing: true});
    this.snapShot();
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera ref={cam => this.camera = cam} style={styles.camera} type={this.state.type}>
            <View style={styles.overlay}>
              <TouchableOpacity style={styles.flip}
                onPress={() => {
                  this.setState({type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}
              >
                <Icon.Ionicons name='md-swap' color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault} size={40} />
              </TouchableOpacity>
              <View style={styles.triggerContainer}>
                {this.state.computing == false 
                  ? <TouchableOpacity style={styles.trigger} onPress={() => this.takeSnapshot()}>
                      <Icon.Ionicons name='md-camera' color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault} size={80} />
                    </TouchableOpacity>
                  : <ActivityIndicator size='large' color='lightblue' />
                }
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1, 
    backgroundColor: 'transparent'
  },
  camera: {
    flex: 1,
  },
  flip: {
    position: 'absolute',
    top: 40,
    right: 40,
    width: 45,
    alignItems: 'center',
    backgroundColor: Colors.tabBar,
    borderRadius: 15,
    borderWidth: 1,
  },
  triggerContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  trigger: {
    backgroundColor: Colors.tabBar,
    alignItems: 'center',    
    width: 100,
    borderRadius: 30,
    borderWidth: 1,
  }
});