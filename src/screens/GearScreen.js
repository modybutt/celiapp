import React from 'react';
import { View, StyleSheet, } from 'react-native';
import LanguageManager from '../manager/LanguageManager';

export default class GearScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: LanguageManager.getInstance().getText("GEAR"),
  });

  componentDidMount() {
    //var dgram = require('dgram')
    // OR, if not shimming via package.json "browser" field:
    var dgram = require('react-native-udp')
    var HOST = "192.168.1.125";
    var PORT = 8080;

    var socket = dgram.createSocket('udp4')
    
    socket.once('listening', function() {
      var buf = toByteArray('excellent!')
      socket.send(buf, 0, buf.length, remotePort, remoteHost, function(err) {
        if (err) throw err

        console.log('message was sent')
      })
    })

    socket.on('message', function(msg, rinfo) {
      console.log('message was received', msg)
    })

    socket.bind(HOST, PORT)
  }

  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});