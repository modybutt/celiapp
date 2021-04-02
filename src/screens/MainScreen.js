import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import ImageHeader from './ImageHeader';
import Colors from '../constants/Colors'

import symptomImage from '../assets/images/stethoscope_white.svg';
import emotionImage from '../assets/images/smiley_face_white.svg';
import mealImage from '../assets/images/cutlery_white.svg';
import gipImage from '../assets/images/heartbeat.svg';

import Layout from '../constants/Layout';
import LoggedEntry from '../components/LoggedEntry';

export default class MainScreen extends React.Component {
	
	state = 
	{
		
	};

	static navigationOptions = ({ navigation }) => 
	({
    	headerTitle:<ImageHeader color={Colors.mainscreenColor}/>
	});
	
	

	slide(evt)
	{
		
		this._start();
	}

	render() {
		//TODO: add avatar here.
		//TODO: add i button here.
		//TODO: add this week you have logged here.
		return (
			<View style={styles.container}>
				<Text style={styles.week}>Week Placeholder</Text>
				<Text style={styles.avatar}>Avatar Placeholder</Text>
				
				<LoggedEntry 
					title={'2 symptoms'} 
					subtitle={'Last entry: Friday Oct 8th.'}
					viewallText={'view all symptom logs'}
				 	color={Colors.symptom} 
					image={symptomImage}/>

				<LoggedEntry 
					title={'7 meals'} 
					subtitle={'Last entry: Friday Oct 8th.'}
					viewallText={'view all meal logs'}
					color={Colors.meal}
					image={mealImage}/>

				<LoggedEntry
					title={'3 energy levels'} 
					subtitle={'Last entry: Friday Oct 8th.'}
					viewallText={'view all energy level logs'}
				 	color={Colors.emotion} 
					image={emotionImage}/>

				<LoggedEntry 
					title={'4 GIP results'} 
					subtitle={'Last entry: Friday Oct 8th.'}
					viewallText={'view all GIP results'}
				 	color={Colors.gip} 
					image={gipImage}/>			
			</View>	
		);
	}
}

const animationContainer = () =>
{
	
}

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
		marginBottom: 5				
	},

	dropShadow: 
	{
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

	viewAllContentWrapper:
	{
		display: 'flex',
		flexDirection: 'row',
		zIndex: -1,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: 120,
		height: window.height * 0.12
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