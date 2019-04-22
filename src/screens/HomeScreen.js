import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button
  //Platform  
} from 'react-native';

import { Icon } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
		<View style = {styles.container}>
        <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Settings')}
      />


          <TouchableOpacity onPress={() => navigate('Settings')}>
              <Icon.Ionicons
                      name="md-add-circle"
                      size={50}
                      style={{ marginBottom: -3 }}
                    />
           </TouchableOpacity>  
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


