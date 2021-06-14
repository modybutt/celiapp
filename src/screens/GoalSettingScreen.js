import React from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { SvgXml } from "react-native-svg";
import celiAppLogo from '../assets/images/celiapp-logo.svg';
import goalsettingSpeechBubble from '../assets/images/goalsetting_speechbubble.svg';
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import avatarAndy from "../assets/images/avatar_menu/avatar_lincy.png";
import { TouchableOpacity } from "react-native-gesture-handler";

import InfoIcon from '../components/InfoIcon';

import symptomImage from '../assets/images/stethoscope_white.svg';
import emotionImage from '../assets/images/smiley_face_white.svg';
import mealImage from '../assets/images/cutlery_white.svg';
import gipImage from '../assets/images/gip.svg';
import * as Icon from '@expo/vector-icons';
import DatabaseManager from "../manager/DatabaseManager";

export default class GoalSettingScreen extends React.Component
{
	state =
	{
		minNoMeals: 3,
		minNoSymptoms: 3,
		minNoEmotions: 3,
		minNoGips: 1,
	}

	render()
	{
		return <View style={styles.container}>
			<Header />
			<Text style={{
				color: 'white',
				fontSize: 20				
			}}>Set your daily goals!</Text>
			<View style={{
					marginTop: window.height * .02,
					backgroundColor: 'white',
					height: window.height * 0.7,
					width: window.width * 0.95
				}}>
					<Avatar />
					
					<View style={styles.goalsContainer}>
						<Goal color={Colors.symptom} image={symptomImage} 
							text={<LogText 
								text1='I want to register ' 
								noItems={this.state.noSymptoms} 
								text2='symptoms ' 
								text3='each day.' 
								color={Colors.symptom}
								upPressed={() => {this.setState({noSymptoms: this.state.noSymptoms + 1})}}
								downPressed={() => {this.setState({noSymptoms: Math.max(this.state.minNoSymptoms, this.state.noSymptoms - 1)})}}
								/>}/>

						<Goal color={Colors.meal} image={mealImage} 
							text={<LogText 
								text1='I want to register ' 
								noItems={this.state.noMeals} 
								text2='meals ' 
								text3='each day.' 
								color={Colors.meal}
								upPressed={() => {this.setState({noMeals: this.state.noMeals + 1})}}
								downPressed={() => {this.setState({noMeals: Math.max(this.state.minNoMeals, this.state.noMeals - 1)})}}
								/>}/>

						<Goal color={Colors.emotion} image={emotionImage} 
							text={<LogText 
								text1='I want to register ' 
								noItems={this.state.noEmotions} 
								text2='energy levels ' 
								text3='each day.' 
								color={Colors.emotion}
								upPressed={() => {this.setState({noEmotions: this.state.noEmotions + 1})}}
								downPressed={() => {this.setState({noEmotions: Math.max(this.state.minNoEmotions, this.state.noEmotions - 1)})}}
								/>}/>

						<Goal color={Colors.gip} image={gipImage}
							text={<LogText 
								text1='I want to register ' 
								noItems={this.state.noGips} 
								text2={this.state.noGips === 1 ? 'GIP result ' : 'GIP results '}
								text3='each day.' 
								color={Colors.gip}
								upPressed={() => {this.setState({noGips: this.state.noGips + 1})}}
								downPressed={() => {this.setState({noGips: Math.max(this.state.minNoGips, this.state.noGips - 1)})}}
								/>}/>
					</View>

				</View>
			
				<View style={[styles.buttonContainer, styles.buttonDropShadow]}>
					<TouchableOpacity style={[styles.buttonOutline]}
						onPress={() =>
						{
							DatabaseManager.getInstance().saveSettings('noSymptoms', this.state.noSymptoms, (error) => { alert(error) }, null);
							DatabaseManager.getInstance().saveSettings('noEmotions', this.state.noEmotions, (error) => { alert(error) }, null);
							DatabaseManager.getInstance().saveSettings('noMeals', this.state.noMeals, (error) => { alert(error) }, null);
							DatabaseManager.getInstance().saveSettings('noGips', this.state.noGips, (error) => { alert(error) }, null);
							if (this.props.onSaveButtonPressed)
							{
								this.props.onSaveButtonPressed();
							} else this.props.navigation.goBack();
						}}>
						<Text style={styles.buttonText}>Save</Text>
					</TouchableOpacity>
				</View>
		</View> ;
	}

	componentDidMount() {
		DatabaseManager.getInstance().loadSettings(null,
		  (_, error) => { alert("error loading settings" + JSON.stringify(error)); },
		  (_, { rows: { _array } }) => {
			let settings = {};		
			for (var i in _array) {			
			  settings[_array[i].name] = JSON.parse(_array[i].objData);
			}		
			this.setState({
				noSymptoms: settings.noSymptoms || 3,
				noEmotions: settings.noEmotions || 3,
				noMeals: settings.noMeals || 3,
				noGips: settings.noGips || 1
			});
		  }
		);
	  }
}

const ChevronsAndText = ({text, noItems, color, upPressed, downPressed}) =>
{
	return <View style={[{flexDirection: 'column'}, Platform.OS === 'android' ? styles.chevronsAndroid : '']}>
			<TouchableOpacity onPress={() => upPressed()}>
				<Icon.EvilIcons style={{
					textAlign: 'center',
					marginBottom: -4
				}} name='chevron-up' size={30} color={color}/>
			</TouchableOpacity>
			
			<Text style={{ color: color, fontWeight: 'bold' }}>
				{noItems} {text}
			</Text>

			<TouchableOpacity onPress={() => downPressed()}>
				<Icon.EvilIcons style={{
					textAlign: 'center'
				}} name='chevron-down' size={30} color={color}/>
			</TouchableOpacity>
		</View>
}

const LogText = ({text1, text2, noItems, text3, color, upPressed, downPressed}) =>
{
	return <View style={{marginTop: Platform.OS === 'android' ? 0 : -18, marginLeft: window.width * .05}}> 
			<Text style={{fontSize: 16, width: window.width * 0.7}}>
			<Text style={{color:'#707070' }}>{text1}</Text>
			<View style={{display: 'flex', marginTop: -26}} >
				<ChevronsAndText color={color} noItems={noItems} text={text2} upPressed={upPressed} downPressed={downPressed}/>
			</View>
			{'\n'}
			<Text style={{color:'#707070'}}>{text3}</Text>
		</Text>
	</View>
}

const Goal = ({color, image, text}) =>
{
	return <View style={styles.goalContainer}>
		<InfoIcon color={color} image={image} width={40}/>
		{text}
	</View>
}

const Header = () =>
{
	return <View style={styles.headerContainer}>
		<SvgXml width='25' height='25' xml={celiAppLogo}/>
		<Text style={styles.headerText}>
			Celiapp
		</Text>
	</View>
}

const Avatar = () =>
	<View style={styles.avatarContainer}>
		<Image style={styles.avatar} source={avatarAndy}/>
		<SvgXml width={window.width * 0.65} height={window.width * 0.46} style={styles.speechBubble} xml={goalsettingSpeechBubble}/>
		<Text style={{
			position:'absolute',
			width: window.width * 0.5,
			left: window.width * 0.4,
			top: 50,
			textAlign: 'center',
			fontWeight: 'bold',
			fontSize: 20,
			color: '#bebebe'
		}}>
			The more you log each day, the healthier you will probably stay!
		</Text>
	</View>

const window = Layout.window;
const andyScheenHeight = 0.15;
const ratio = (window.height * andyScheenHeight) / 1086;
const styles = StyleSheet.create
({
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

	buttonContainer:
	{
		marginTop: window.height / 35, 
		display: 'flex', 
		width: window.width,
		alignItems: 'center'
	},

	chevronsAndroid:
	{
		position: 'absolute',
		top: -window.height * 0.05
	},

	buttonOutline:
	{
		backgroundColor: '#f7f7f7',
		width: 89,
		height: 42,
		borderRadius: 10
	},

	buttonText: 
	{
		color: '#707070',
		textAlign: 'center',
		marginTop: 'auto',
		marginBottom: 'auto',
		fontSize: 16,
		fontWeight: 'bold'
	},

	buttonDropShadow: 
	{
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 50
	},

	goalsContainer:
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

	goalContainer:
	{
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 15,
		marginRight: 20,
	},

	headerContainer: 
	{
		marginTop: window.height * 0.03,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginLeft: 100,
		marginRight: 100,
	},

	headerText:
	{
		color: 'white',
		fontSize: 14,
		marginLeft: 7,
		marginTop: 3
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
	}
});