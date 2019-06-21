import React from 'react';
import {View, Text} from 'react-native';


export default class ComponentBase extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <View>
                <Text>Hallo</Text>
            </View>       
    )}
}
