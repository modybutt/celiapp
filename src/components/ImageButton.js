
import React from 'react';
import { View, StyleSheet, TouchableHighlight, Image, Text } from 'react-native';



export default class ImageButton extends React.Component {

    constructor(props) {
        super(props);
    }

    onPressed = () => {
        this.props.onPressed(this.props.id);
    }

    colorStyle = {
        backgroundColor: this.props.color,
        color: '#fff',
    }

    render() {
        if (this.props.displayText) {
            if (!this.props.isActive) {
                return (
                    <View style={styles.container}>
                        <TouchableHighlight style={styles.button} onPress={this.onPressed}>
                            <View style={styles.subContainer}>
                                <Image source={this.props.image.imgSource} style={styles.image} />
                                <Text style={styles.text} >{this.props.image.imgName}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                )
            } else {
                if (this.props.image.imgSourceActive) {
                    return (
                        <View style={styles.container}>
                            <TouchableHighlight style={this.props.color ? [styles.button, this.colorStyle] : [styles.button]} onPress={this.onPressed}>
                                <View style={styles.subContainer}>
                                    <Image source={this.props.image.imgSourceActive} style={styles.image} />
                                    <Text style={[styles.text, this.colorStyle]} >{this.props.image.imgName}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    )
                } else {
                    return (
                        <View style={styles.container}>
                            <TouchableHighlight style={this.props.color ? [styles.button, this.colorStyle] : [styles.button]} onPress={this.onPressed}>
                                <View>
                                    <Image source={this.props.image.imgSource} style={styles.image} />
                                    <Text style={styles.text} >{this.props.image.imgName}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    )
                }
            }
        } else {
            if (!this.props.isActive) {
                return (
                    <View style={styles.container}>
                        <TouchableHighlight style={styles.button} onPress={this.onPressed}>
                            <Image source={this.props.image.imgSource} style={styles.image} />
                        </TouchableHighlight>
                    </View>
                )
            } else {
                if (this.props.image.imgSourceActive) {
                    return (
                        <View style={styles.container}>
                            <TouchableHighlight style={this.props.color ? [styles.button, this.colorStyle] : [styles.button]} onPress={this.onPressed}>
                                <Image source={this.props.image.imgSourceActive} style={styles.image} />
                            </TouchableHighlight>
                        </View>
                    )
                } else {
                    return (
                        <View style={styles.container}>
                            <TouchableHighlight style={this.props.color ? [styles.button, this.colorStyle] : [styles.button]} onPress={this.onPressed}>
                                <Image source={this.props.image.imgSource} style={styles.image} />
                            </TouchableHighlight>
                        </View>
                    )
                }
            }
        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        aspectRatio: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    subContainer: {
        padding: 5,
    },
    image: {
        height: '80%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    button: {
        borderRadius: 3,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        paddingTop: 3,
        fontSize: 10,
        textAlign: 'center',
    },
});