
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class EmoteTrackerScreen extends React.Component{
    static navigationOptions = {
        title: 'Add Emotion',
    };

    render(){
        return(
            <View>
                <Text style={styles.headText}>EmoteTracker</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
 headText:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10
 }
});