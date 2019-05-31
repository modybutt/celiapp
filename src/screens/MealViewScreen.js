import React from 'react';
import { View, Text } from 'react-native';


export default class MealViewScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.props.navigation.getParam("event"))}</Text>
            </View>
        )
    }
}
