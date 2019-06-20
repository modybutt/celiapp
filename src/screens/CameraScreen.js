import React from 'react';
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import DatabaseManager from '../manager/DatabaseManager';
import LanguageManager from '../manager/LanguageManager';


export default class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: LanguageManager.getInstance().getText("CAMERA"),
  });
  
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    snapShot: null,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapShot() {
    let photo = await this.camera.takePictureAsync();
    //alert(JSON.stringify(photo));
    
    this.setState({snapShot: photo});
    DatabaseManager.getInstance().createMealEvent("Example MealEvent", 0, 0, 3, "Image", photo, Date.now(), (error) => { alert(error)}, null);
    // The local image URI is temporary. Use Expo.FileSystem.copyAsync to make a permanent copy of the image.
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={cam => this.camera = cam} style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <Button title='Cheese' onPress={() => this.snapShot()} />
          </Camera>
          <Image source={Image.resolveAssetSource(this.state.snapShot)} style={{width: 200, height: 200}} />
        </View>
      );
    }
  }
}
