import React from 'react';
import { ScrollView, StyleSheet, View, Text, Button, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SvgXml } from "react-native-svg";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import LanguageManager from '../manager/LanguageManager';
import HeaderMenuButton from '../components/HeaderMenuButton';
import Dialog from "react-native-dialog";
import goalsettingSpeechBubble from '../assets/images/goalsetting_speechbubble.svg';
import avatarLincy from "../assets/images/avatar_menu/avatar_lincy.png";

const Avatar = (props) =>
	<View style={styles.avatarContainer}>
		<Image style={styles.avatar} source={avatarLincy}/>
		<SvgXml width={window.width * 0.65} height={window.width * 0.46} style={styles.speechBubble} xml={goalsettingSpeechBubble}/>
		<Text style={{
			position:'absolute',
			width: window.width * 0.4,
			left: window.width * 0.4,
			top: 50,
			textAlign: 'center',
			fontWeight: 'bold',
			fontSize: 20,
			color: '#bebebe'
		}}>
    {props.message}
		</Text>
  </View>;

const Answer = (props) => {
  if (props.selectedAnswer == null) {
    // nothing selected
    return <View style = {styles.unselectedAnswerContainer}>
      <TouchableOpacity style = {styles.touchableOpacityContainer} onPress={() => props.selectAnswer(props.answerLetter)}>
        <Text style = {styles.text}>
        {props.answer}
        </Text>
      </TouchableOpacity>
    </View>;
  } else {
    // something selected
    if (props.answerLetter == props.selectedAnswer && props.answerLetter == props.correctAnswer) {
      // this is selected and correct
      return <View style = {styles.selectedAnswerContainer}>
        <TouchableOpacity style = {styles.touchableOpacityContainer}>
          <Text style = {styles.correctText}>
            {props.answer}
          </Text>
        </TouchableOpacity>
      </View>;
    } else if (props.answerLetter == props.selectedAnswer && props.answerLetter != props.correctAnswer) {
      // this is selected and wrong
      return <View style = {styles.selectedAnswerContainer}>
        <TouchableOpacity style = {styles.touchableOpacityContainer}>
          <Text style = {styles.selectedAndIncorrectText}>
          {props.answer}
          </Text>
        </TouchableOpacity>
      </View>;
    } else if (props.answerLetter != props.selectedAnswer && props.answerLetter == props.correctAnswer) {
      // this is not selected but correct
      return <View style = {styles.unselectedAnswerContainer}>
        <TouchableOpacity style = {styles.touchableOpacityContainer}>
          <Text style = {styles.correctText}>
          {props.answer}
          </Text>
        </TouchableOpacity>
      </View>;
    } else {
      return <View style = {styles.unselectedAnswerContainer}>
        <TouchableOpacity style = {styles.touchableOpacityContainer}>
          <Text style = {styles.incorrectText}>
          {props.answer}
          </Text>
        </TouchableOpacity>
      </View>;
    }
  }
}
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
        comment_A: this.props.navigation.getParam("comment_A"),
        comment_B: this.props.navigation.getParam("comment_B"),
        comment_C: this.props.navigation.getParam("comment_C"),
        comment_D: this.props.navigation.getParam("comment_D"),
        selected: null
    }
    
    selectAnswer(userAnswer) {
      this.setState({selected: userAnswer});
    }

    render() {
      let { question, A, B, C, D, correct, comment_A, comment_B, comment_C, comment_D, selected} = this.state;
      let message = null;
      if (selected == null) {
        message = question;
      } else {
        switch(selected) {
          case 'A':
            message = comment_A;
            break;
          case 'B':
            message = comment_B;
            break;
          case 'C':
            message = comment_C;
            break;
          case 'D':
            message = comment_D;
            break;
        }
      }
      
      return <View style={styles.container}>
			<Text style={{
				color: 'white',
        marginTop: 20,
				fontSize: 20				
			}}>Quiz Question</Text>
			<View style={{
					marginTop: window.height * .02,
					backgroundColor: 'white',
					height: window.height * 0.7,
					width: window.width * 0.95
				}}>
  				<Avatar message={message} />
        
    			<View style={styles.answersContainer}>
            <Answer answerLetter='A' answer={A} selectAnswer={(x) => this.selectAnswer(x)}
              correctAnswer={correct} selectedAnswer={selected} />
            <Answer answerLetter='B' answer={B} selectAnswer={(x) => this.selectAnswer(x)}
              correctAnswer={correct} selectedAnswer={selected} />
            <Answer answerLetter='C' answer={C} selectAnswer={(x) => this.selectAnswer(x)}
              correctAnswer={correct} selectedAnswer={selected} />
            <Answer answerLetter='D' answer={D} selectAnswer={(x) => this.selectAnswer(x)}
              correctAnswer={correct} selectedAnswer={selected} />
          </View>
  				<View style={[styles.buttonContainer, styles.buttonDropShadow]}>
  					<TouchableOpacity style={[styles.buttonOutline]}
  						onPress={() => this.props.navigation.goBack()}>
  						<Text style={styles.cancelButtonText}>Close</Text>
  					</TouchableOpacity>
  				</View>
        </View>
      </View>
    }
}

const window = Layout.window;
const andyScheenHeight = 0.15;
const ratio = (window.height * andyScheenHeight) / 1086;
const styles = StyleSheet.create({
	container: 
	{
		fontSize: 26,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 13,
		fontWeight: "bold",
		backgroundColor: Colors.mainscreenColor,
		width: window.width,
		height: window.height
	},
	speechBubble:
	{
		marginTop: 10
	},
	avatarContainer:
	{
		marginLeft: 5,
		display: 'flex',
		flexDirection: 'row',
		width: window.width,
		height: window.height * 0.25
	},

	avatar:
	{
		marginTop: window.height * 0.16,
		width: 904 * ratio,
		height: window.height * andyScheenHeight
	},
	answersContainer:
	{
		backgroundColor: '#f7f7f7',
		marginLeft: 10,
		marginRight: 10,
		marginTop: window.height * .07,
		height: window.height * 0.37,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'space-evenly'
	},
	selectedAnswerContainer:
	{
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 5,
		marginRight: 20,
    width: '90%',
    borderWidth: 3,
    borderRadius: 50,
    borderColor: '#E91F64',
	},
	unselectedAnswerContainer:
	{
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 5,
		marginRight: 20,
    width: '90%',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'gray',
	},
  touchableOpacityContainer: {
    width: '100%',
  },
  text: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginVertical: 4,
  },
  correctText: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 4,
  },
  selectedAndIncorrectText: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 4,
  },
  incorrectText: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'lightgray',
    marginVertical: 4,
  },
	buttonContainer:
	{
		marginTop: window.height / 35, 
		display: 'flex', 
		width: window.width,
		alignItems: 'center'
	},
	buttonDropShadow: 
	{
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 50
	},
	buttonOutline:
	{
		backgroundColor: '#f7f7f7',
		width: 89,
		height: 42,
		borderRadius: 10
	},
	cancelButtonText: 
	{
		color: '#707070',
		textAlign: 'center',
		marginTop: 'auto',
		marginBottom: 'auto',
		fontSize: 16,
		fontWeight: 'bold'
	},
});
