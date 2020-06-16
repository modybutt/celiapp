// TODEL!
import React, { Component } from 'react';
import {StyleSheet, Alert} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';




export default class HomeScreenNavButton extends Component{
    AlertFunction=()=>{
        Alert.alert("Currently not available");
    }
    render(){

        return (
            <ActionButton buttonColor="#64B2CA" style={styles.navButton} verticalOrientation="down">
                <ActionButton.Item title="Achievements" onPress={()=>this.props.navigation.navigate('Achievements')}>
                    <Icon name="grade" style={styles.actionButtonIcon}></Icon>
                </ActionButton.Item>
                <ActionButton.Item title="Challenges" onPress={()=>this.props.navigation.navigate('Challenges')}>
                    <Icon name="flag" style={styles.actionButtonIcon}></Icon>
                </ActionButton.Item>
                <ActionButton.Item title="Wardrobe" onPress={()=>this.props.navigation.navigate('Wardrobe')}>
                    <Icon name="palette" style={styles.actionButtonIcon}></Icon>
                </ActionButton.Item>
                <ActionButton.Item title="Quiz" onPress={this.AlertFunction}> 
                    <Icon name="help" style={styles.actionButtonIcon}></Icon>
                </ActionButton.Item>
                <ActionButton.Item title="ChallengesTest" onPress={()=>this.props.navigation.navigate('ChallengesTest')}> 
                    <Icon name="build" style={styles.actionButtonIcon}></Icon>
                </ActionButton.Item>
            </ActionButton>
        );
    }

}

const styles = StyleSheet.create({
    actionButtonIcon:{
        fontSize: 20,
        height: 22,
        color: 'white',
        
    },
    navButton: {
        position: 'absolute',
        right: 300,
    },
});