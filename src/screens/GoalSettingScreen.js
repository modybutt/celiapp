import React from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { SvgXml } from "react-native-svg";
import celiAppLogo from '../assets/images/celiapp-logo.svg';
import goalsettingSpeechBubble from '../assets/images/goalsetting_speechbubble.svg';
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import andyPlaceholder from "../assets/images/avatar_menu/placeholder_andy.png";
import { TouchableOpacity } from "react-native-gesture-handler";

import InfoIcon from '../components/InfoIcon';

import symptomImage from '../assets/images/stethoscope_white.svg';
import emotionImage from '../assets/images/smiley_face_white.svg';
import mealImage from '../assets/images/cutlery_white.svg';
import gipImage from '../assets/images/heartbeat.svg';
import * as Icon from '@expo/vector-icons';

export default class GoalSettingScreen extends React.Component
{
	

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
					<Goals />
				</View>
			
				<View style={[styles.buttonContainer, styles.buttonDropShadow]}>
					<TouchableOpacity style={[styles.buttonOutline]}
						onPress={() => this.props.getStartedPressed()}>
						<Text style={styles.buttonText}>Save</Text>
					</TouchableOpacity>
				</View>
		</View> ;
	}
}

const Goals = () =>
{
	return <View style={styles.goalsContainer}>
		<Goal color={Colors.symptom} image={symptomImage} 
			text={<LogText text1='I want to register ' text2='3 symptoms ' text3='each day.' color={Colors.symptom}/>}/>

		<Goal color={Colors.meal} image={mealImage} 
			text={<LogText text1='I want to register ' text2='3 meals ' text3='each day, including snacks.' color={Colors.meal}/>}/>

		<Goal color={Colors.emotion} image={emotionImage} 
			text={<LogText text1='I want to register ' text2='3 energy levels ' text3='each day.' color={Colors.emotion}/>}/>

		<Goal color={Colors.gip} image={gipImage}
			text={<LogText text1='I want to register ' text2='3 GIP results ' text3='each day.' color={Colors.gip}/>}/>
	</View>
}

const ChevronsAndText = ({text, color}) =>
{
	return <View style={{alignSelf: 'flex-start', marginTop: -26}}>
		<TouchableOpacity onPress={() => console.log('up up up')}>
			<Icon.EvilIcons style={{
				textAlign: 'center',
				marginBottom: -4
			}} name='chevron-up' size={30} color={color}/>
		</TouchableOpacity>

		<Text style={{ color: color, fontWeight: 'bold' }}>
			{text}
		</Text>

		<TouchableOpacity onPress={() => console.log('down down down')}>
			<Icon.EvilIcons style={{
				textAlign: 'center'
			}} name='chevron-down' size={30} color={color}/>
		</TouchableOpacity>
	</View>
}

const LogText = ({text1, text2, text3, color}) =>
{
return <Text style={{marginLeft: 14.3, marginTop: 5, fontSize: 16, width: 270, marginTop: -18}}>
		<Text style={{color:'#707070' }}>{text1}</Text>
		<ChevronsAndText color={color} text={text2}/>
		<Text style={{color:'#707070' }}>{text3}</Text>
	</Text>
}

const Goal = ({color, image, text}) =>
{
	return <View style={styles.goalContainer}>
		<InfoIcon style={styles.infoIcon} color={color} image={image} width={50}/>
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
		<Image style={styles.avatar} source={andyPlaceholder}/>
		<SvgXml width='250' height='250' style={styles.goalsettingSpeechBubble} xml={goalsettingSpeechBubble}/>
		<Text style={{
			position:'absolute',
			width: 190,
			left: 150,
			top: 75,
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

	buttonContainer:
	{
		marginTop: window.height / 66, 
		display: 'flex', 
		width: window.width,
		alignItems: 'center'
	},

	buttonOutline:
	{
		backgroundColor: '#f7f7f7',
		width: 130,
		height: 60,
		borderRadius: 10		
	},

	buttonText: 
	{
		color: '#b7b7b7',
		textAlign: 'center',
		marginTop: 'auto',
		marginBottom: 'auto',
		fontSize: 20,
		fontWeight: 'bold'
	},

	buttonDropShadow: 
	{
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.15,
		shadowRadius: 5,
		elevation: 5
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
		marginLeft: 20,
		marginRight: 10,
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
		fontSize: 18,
		marginLeft: 10
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