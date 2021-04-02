import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ImageHeader from './ImageHeader';
import Colors from '../constants/Colors'

import symptomImage from '../assets/images/stethoscope_white.svg';
import emotionImage from '../assets/images/smiley_face_white.svg';
import mealImage from '../assets/images/cutlery_white.svg';
import gipImage from '../assets/images/heartbeat.svg';

import Layout from '../constants/Layout';
import InfoIcon from '../components/InfoIcon';
import * as Icon from '@expo/vector-icons';
import { color } from 'react-native-reanimated';

export default class MainScreen extends React.Component {
	
	static navigationOptions = ({ navigation }) => ({
    	headerTitle:<ImageHeader color={Color.mainscreenColor}/>
	});
	
	render() {
		//TODO: add avatar here.
		//TODO: add i button here.
		//TODO: add this week you have logged here.
		return (
			<View style={styles.container}>
				<Text style={styles.week}>Week Placeholder</Text>
				<Text style={styles.avatar}>Avatar Placeholder</Text>

				<LoggedEntry text={'2 symptoms'} color={Colors.symptom} image={symptomImage}/>
				<LoggedEntry text={'7 meals'} color={Colors.meal} image={mealImage}/>
				<LoggedEntry text={'3 energy levels'} color={Colors.emotion} image={emotionImage}/>
				<LoggedEntry text={'4 GIP results'} color={Colors.gip} image={gipImage}/>
			
			</View>	
		);
	}
}

const LoggedEntry = ({text, image, color}) =>
<View style={styles.entryContainer}>	
	<View style={styles.leftWrapper}>
		<InfoIcon style={styles.infoIcon} color={color} image={image} width={50}/>
	</View>

	<View style={styles.centerWrapper}>
		<View style={styles.textInfo}>
			<Text style={[styles.text, styles.entryTitle]}>{text}</Text>
			<Border color={color}/>			
			<Text style={[styles.text, styles.entrySubtitle]}>Last entry: Friday Oct 8th.</Text>
		</View>		
	</View>
	
	<View style={styles.rightWrapper}>
		<Icon.Ionicons style={styles.addIcon} color={color} size={35} name={"md-add"}/>
	</View>
</View>

const Border = ({color}) =>
<View style=
	{{
		marginTop: 8,
		marginBottom: 8,
		borderBottomWidth: 2,
		alignSelf: 'stretch',
		borderColor: color
	}}>
</View>

const window = Layout.window;
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
	},

	entryContainer:
	{		
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: window.width,
		height: window.height * 0.12,
		backgroundColor: '#f7f7f7',
		marginBottom: 5,

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 1,  
		elevation: 5
	},

	leftWrapper:
	{
		marginLeft: 20
	},

	centerWrapper:
	{
		marginLeft: 20
	},

	rightWrapper:
	{
		marginLeft: 'auto',
		marginRight: 20
	},

	textInfo:
	{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: window.width * 0.6
	},

	text:
	{
		color: '#707070'
	},

	entryTitle:
	{
		fontSize: 22
	},

	entrySubtitle:
	{
		fontSize: 16
	},

	week:
	{
		backgroundColor: 'blue',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: window.width,
		height: window.height * 0.08
	},

	avatar:
	{
		backgroundColor: 'red',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: window.width,
		height: window.height * 0.25
	},

	infoBoxRow:
	{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});