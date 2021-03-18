
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';


export default class HeaderBanner extends React.Component{

    colorStyle = {
        backgroundColor: this.props.color,
    }

    render() {
        return (
            <View style={this.props.color?[styles.container,this.colorStyle]:[styles.container]}>
                <Image source={this.props.imageSource} style={styles.image} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:100,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        /*width: '80%',*/
        height: '50%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
})