import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';

import Gluton_HAPPY from "../assets/images/vielfrass_org.png";
import Gluton_SAD from "../assets/images/vielfrass_sad.png";

export default class Gluton extends React.Component {
    state = {
        trust: 150,
        happy: true,
        message: 'Hello World!\nMy Name is Gluton.\n\nNice to meet you, Buddy!',
    }
    
    render() {
        return (
            <View>
                <Text style={styles.message}>{this.state.message}</Text>   
                <View style={styles.bubble} />
                <Image style={
                    {
                        width: this.state.trust, 
                        height: this.state.trust, 
                        resizeMode: 'contain',
                    }} source={this.state.happy ? Gluton_HAPPY : Gluton_SAD} />
            </View>
        );
    }  
}

const styles = StyleSheet.create({
    bubble: {
        width: 0,
        height: 0,
        marginLeft: 33,
        borderLeftWidth: 10,
        borderRightWidth: 25,
        borderBottomWidth: 10,
        //borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        //borderRightColor: 'transparent',
        //borderBottomColor: '#000',
        transform: [{ rotate: '45deg'}]
    },
    message: {
        backgroundColor: '#fff',
        borderWidth: 5, 
        borderRadius: 33, 
        textAlignVertical: 'center',
        padding: 10,
        paddingLeft: 20,
        width: '50%',
    },
});