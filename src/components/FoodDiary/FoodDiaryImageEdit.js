import React from 'react';
import {View, Text, Button} from 'react-native';
import LanguageManager from '../../manager/LanguageManager';



export default class FoodDiaryImageEdit extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <View>
                <Text>Hallo</Text>
                <Button title="kamera" onPress={() => this.props.navigation.navigate('Camera')}/>
            </View>       
    )}
}
