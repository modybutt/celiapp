import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  //Platform  
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
		<View style = {styles.container}>
			<Image source = {
				__DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
			} />
			
			<Image source = {
				__DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
			} style = {{
				borderWidth: 3,
				borderColor: '#000',
				borderRadius: 360,
			}} />
		</View>
	);
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#666',
  },
});


