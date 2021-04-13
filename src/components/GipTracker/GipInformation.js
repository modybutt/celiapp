import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class GipInformation extends React.Component {

    constructor(props) {
        super(props);

    }

    colorStyle = {
        borderColor: this.props.color,
    }

    render() {


        return (
            <View style={
                [styles.containerInformation,
                {
                    top: this.props.position.y,
                    left: this.props.position.x,
                    width: this.props.position.width,
                },
                ]
            } >
                <View style={[styles.subContainer, this.colorStyle]}>
                    <Text style={styles.text}>Uploading your GIP test is the only way to be sure of the fact whether your diet contained Gluten or not in an easy way.</Text>
                    <Text style={styles.text}>By uploading a photo of your test, it will save you time and effort of making appointments with your practicician in the future.</Text>
                    <Text style={styles.text}>You can indicate your interpretation of the outcome of the test. This will give the doctors insight into your understanding of this innoative tool!</Text>
                </View>

            </View>
        );


    }
}

const styles = StyleSheet.create({
    containerInformation: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        display: 'flex',
        alignItems: 'center',
    },
    subContainer: {
        width: '80%',
        padding: 10,
        backgroundColor: 'rgba(100,100,100,0.5)',
        borderWidth: 2,
        borderRadius: 3,
    },
    text: {
        color: '#FFF',
        paddingTop: 5,
        paddingBottom: 5,
    },
    


});