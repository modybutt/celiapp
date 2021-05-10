import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native'

//deprecated
export default class BackgroundButton extends React.Component {

  render() {
    const styles = this.makeStyles()
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
        <View style={styles.view}>
          {this.makeImageIfAny(styles)}
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

makeImageIfAny(styles) {
    if (this.props.showImage) {
      return <Image style={styles.image} source={require('../../assets/images/check.png')} />
    }
  }

makeStyles() {
    return StyleSheet.create({
      view: {
        flexDirection: 'row',
        borderRadius: 3,
        borderColor: this.props.borderColor,
        borderWidth: 2,
        backgroundColor: this.props.backgroundColor,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16
      },
      touchable: {
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 8
      },
      image: {
        marginRight: 8,
        width: 15, 
        height: 15
      },
      text: {
        fontSize: 18,
        textAlign: 'center',
        color: this.props.textColor,
        fontSize: 16
      }
    })
  }
}