import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Icon from '@expo/vector-icons';
import ReportIcon from '../../assets/images/heartbeat.svg';
import { SvgXml } from 'react-native-svg';

export default class FoodInformation extends React.Component {

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
                    <Text style={styles.text}>By entering your meals you can get better insight into your diet.</Text>
                    <Text style={styles.text}>In the weekly report screen <SvgXml style={{ marginBottom: -5 }} width="15" height="15" fill='#e91f64' xml={ReportIcon} /> you can see how well your are mastering it!</Text>
                    <Text style={styles.text}>Research has shown that people who are conscious of what they eat, feel better, are more confident and demonstrate improved mental health.</Text>
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