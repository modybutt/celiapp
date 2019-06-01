import React from 'react';
import { View, Text } from 'react-native';


export default class FoodViewScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.props.navigation.getParam("event"))}</Text>
            </View>
        )
    }
}
