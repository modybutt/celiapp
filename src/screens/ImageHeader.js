// this is my component page
import { reduce } from 'lodash'
import React from 'react'
import Color from '../constants/Colors'
import { Image, StyleSheet, View, Text } from 'react-native'

export default class ImageHeader extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/glutenfree.png')}
                    resizeMode='contain'
                />
                <Text style={styles.text}>
            		Celiapp
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: 25,
        height: 25,
		tintColor: Color.tintColor,
        zIndex: 999
    },

    text: {
        fontSize: 15,
		color: Color.tintColor,
		marginHorizontal: 5
    }

})