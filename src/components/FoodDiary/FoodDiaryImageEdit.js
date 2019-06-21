import React from 'react';
import {View, Image, Button} from 'react-native';


export default class FoodDiaryImageEdit extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            snapShot: null,
        }
    }


    render(){
        return(
            <View>
                <Image source={Image.resolveAssetSource(this.state.snapShot)} style={{width: 100, height: 100}} />
                <Button title='Cheese' onPress={() => this.props.navigation.navigate('Camera')}/>
            </View>       
    )}
}