import React from 'react';
import { ScrollView, StyleSheet, View, Text, Button, Dimensions, TouchableOpacity} from 'react-native';
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
        selected: null
    }
    
    selectAnswer(userAnswer) {
      this.setState({selected: userAnswer});
    }

    render() {
      let { question, A, B, C, D, correct, selected} = this.state;
      
      if (selected == null) {
        return (
          <View style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>Quiz Question</Text>
            <Text style={{fontSize: 16, color: 'gray'}}>{question}</Text>
            <View style = {styles.container}>
              <TouchableOpacity onPress={() => this.selectAnswer('A')}>
                <Text style = {styles.text}>
                {A}
                </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.container}>
              <TouchableOpacity onPress={() => this.selectAnswer('B')}>
                <Text style = {styles.text}>
                {B}
                </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.container}>
              <TouchableOpacity onPress={() => this.selectAnswer('C')}>
                <Text style = {styles.text}>
                {C}
                </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.container}>
              <TouchableOpacity onPress={() => this.selectAnswer('D')}>
                <Text style = {styles.text}>
                {D}
                </Text>
              </TouchableOpacity>
            </View>

            <Button onPress={() => this.props.navigation.goBack()} title="Back" />
          </View>
        ) 
      } else {
        return (
          <View style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>Quiz Question</Text>
            <Text style={{fontSize: 16, color: 'gray'}}>{question}</Text>
            <View style = {styles.container}>
              <TouchableOpacity>
              <Text style = {correct == 'A' ? styles.correctText : (selected == 'A' ? styles.incorrectText : styles.text)}>
                {A}
                </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.container}>
              <TouchableOpacity>
                <Text style = {correct == 'B' ? styles.correctText : (selected == 'B' ? styles.incorrectText : styles.text)}>
                {B}
                </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.container}>
              <TouchableOpacity>
                <Text style = {correct == 'C' ? styles.correctText : (selected == 'C' ? styles.incorrectText : styles.text)}>
                {C}
                </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.container}>
              <TouchableOpacity>
                <Text style = {correct == 'D' ? styles.correctText : (selected == 'D' ? styles.incorrectText : styles.text)}>
                {D}
                </Text>
              </TouchableOpacity>
            </View>

            <Button onPress={() => this.props.navigation.goBack()} title="Back" />
          </View>
        )
      }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginVertical: 4,
  },
  correctText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'green',
    marginVertical: 4,
  },
  incorrectText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginVertical: 4,
  }
});
