import React from 'react';
import { ScrollView, View, Text, Button, Dimensions} from 'react-native';
import LanguageManager from '../manager/LanguageManager';
import HeaderMenuButton from '../components/HeaderMenuButton';
import Dialog from "react-native-dialog";

export default class QuizScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: navigation.state.params ? navigation.state.params.headerRight : null
    })

    state = {
        screen: this.props.navigation.getParam("screen"),
        question: this.props.navigation.getParam("question"),
        A: this.props.navigation.getParam("A"),
        B: this.props.navigation.getParam("B"),
        C: this.props.navigation.getParam("C"),
        D: this.props.navigation.getParam("D"),
        correct: this.props.navigation.getParam("correct"),
    }

    render() {
      let { question, A, B, C, D, correct} = this.state;

        return (
          <View style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>Quiz Question</Text>
            <Text style={{fontSize: 16, color: 'green'}}>{question}</Text>
            <Text style={{fontSize: 16, color: 'green'}}>{A}</Text>
            <Text style={{fontSize: 16, color: 'green'}}>{B}</Text>
            <Text style={{fontSize: 16, color: 'green'}}>{C}</Text>
            <Text style={{fontSize: 16, color: 'green'}}>{D}</Text>
            <Button onPress={() => this.props.navigation.goBack()} title="Cancel" />
          </View>
        )
    }
}
