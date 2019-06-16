import React from 'react';
import { StyleSheet, Text, View, AppRegistry, TextInput } from 'react-native';

export default class TextInputSingleLine extends React.Component {
 render() {
      return (
        <View style={{top:10, bottom: 15}}>
            <View style={styles.Text}>
                <TextInput
                {...this.props}
                maxLength = {30}
                style={{marginRight: 20}}
                onChangeText={(text) => this.setState({text})}
                value={this.props.preText}
                />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text:{
            borderWidth: 2,
            borderColor: 'grey',
            borderRadius: 20,
            marginLeft: 10,
            marginRight: 10,
            alignContent: 'space-around'
        }
});
