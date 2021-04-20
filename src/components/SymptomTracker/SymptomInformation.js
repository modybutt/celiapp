import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class SymptomInformation extends React.Component {

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
                    <Text style={styles.text}>For each symptom, you can select the severity you are experiencing. The severity levels are:</Text>
                    <View style={styles.multipleBubbleDescriptionContainer}>
                        <View style={styles.bubbleDescriptionContainer}>
                            <View style={[styles.smallBubble,styles.smallBubbleMild]}></View>
                            <Text style={styles.textDescription}>mild</Text>
                        </View>
                        <View style={styles.bubbleDescriptionContainer}>
                            <View style={[styles.smallBubble,styles.smallBubbleModerate]}></View>
                            <Text style={styles.textDescription}>moderate</Text>
                        </View>
                        <View style={styles.bubbleDescriptionContainer}>
                            <View style={[styles.smallBubble,styles.smallBubbleSevere]}></View>
                            <Text style={styles.textDescription}>severe</Text>
                        </View>
                    </View>
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
    },
    textDescription: {
        color: '#FFF',
        paddingLeft: 5,
    },
    bubbleDescriptionContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 15,
    },
    smallBubble: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
    },
    smallBubbleMild: {
        backgroundColor: '#D9EEEA',
    },
    smallBubbleModerate: {
        backgroundColor: '#83E2D2',
    },
    smallBubbleSevere: {
        backgroundColor: '#1DBBA0',
    },


});