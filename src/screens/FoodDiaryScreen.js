
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class FoodDiaryScreen extends React.Component{
    static navigationOptions = {
        title: 'Add Meal',
    };

    render(){
        return(
            <View>
                <Text style={styles.headText}>FoodDiary</Text>
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