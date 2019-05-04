import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'expo';

export default class MenuButton extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
        return (
            <View style={styles.container}>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                  <ActionButton.Item buttonColor='#9b59b6' title="Add Emotion" onPress={() => Alert.alert("Add Emotion Clicked")}>
                    <Icon.Ionicons name="md-create" style={styles.actionButtonIcon} />
                  </ActionButton.Item>
                  <ActionButton.Item buttonColor='#3498db' title="Add Meal" onPress={() => {Alert.alert("Add Meal Clicked")}}>
                    <Icon.Ionicons name="md-notifications-off" style={styles.actionButtonIcon} />
                  </ActionButton.Item>
                  <ActionButton.Item buttonColor='#1abc9c' title="Add Symptom" onPress={() => this.props.navigation.navigate('AddSymptom')}>
                    <Icon.Ionicons name="md-done-all" style={styles.actionButtonIcon} />
                  </ActionButton.Item>
                </ActionButton>                
            </View>
        );
    }  
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        //borderWidth: 1,
        position: 'absolute',
        //bottom: 0,
        //right: 0,
    },
    actionButtonIcon: {
      fontSize: 20,
      //height: 22,
      color: 'white',
    }
  });