import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Icon from '@expo/vector-icons';

export default class EmotionInformation extends React.Component {

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
                    <Text style={styles.text}>By entering your energy level you can get insight into how your diet positively or negatively influences it.</Text>
                    <Text style={styles.text}>In the daily report screen <Icon.Ionicons
                        name={"md-calendar"}
                        size={26}
                        style={{ marginBottom: -3 }}
                        color={'#e91f64'}
                    /> you can see if there could have been a connection between your energy level and the food you ate.</Text>
                    <Text style={styles.text}>Research has proven that people in charge of their diet, feel more in control and energetic during the day.</Text>
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