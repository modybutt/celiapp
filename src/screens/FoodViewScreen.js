import React from 'react';
import { View, Text } from 'react-native';
import LanguageManager from '../manager/LanguageManager';


export default class FoodViewScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("VIEW_MEAL"),
    })

    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.props.navigation.getParam("event"))}</Text>
            </View>
        )
    }
}