import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { SvgXml } from "react-native-svg";
import celiAppLogo from '../assets/images/celiapp-logo.svg';
import WeekDisplay from '../components/WeekDisplay';
import Colors from "../constants/Colors";
import * as Icon from '@expo/vector-icons';
import avatarAndy from "../assets/images/avatar_menu/avatar_lincy.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import Layout from "../constants/Layout";

export default class OnBoardingFinalComponent extends React.Component
{
	render()
	{
		const fontsize = window.height / 33;
		return (
			<View style={styles.container}>
				<Header />

				<View style={{
					backgroundColor: 'white',
					height: window.height * 0.8,
					width: window.width * 0.95
				}}>
					<WeekDisplay dailyActivity={{}} />
					<Avatar />
					<Text style={{marginLeft: 25, fontSize: fontsize, lineHeight: fontsize * 1.8, color: '#707070'}} >
						Meet Andy, your gluten buddy! {"\n"}
						Get weekly stats   <Icon.Ionicons size={fontsize * 1.1} color={Colors.mainscreenColor} name={'md-pulse'}></Icon.Ionicons> {"\n"}
						Daily Views   <Icon.Feather size={fontsize * 1.1} color={Colors.mainscreenColor} name={'calendar'}></Icon.Feather> {"\n"}
						and updates while {"\n"}
						you enter your data! {"\n"}
						Tap Andy to set your goals!
					</Text>

					<View style={[styles.buttonContainer, styles.buttonDropShadow]}>
						<TouchableOpacity style={[styles.buttonOutline]}
							onPress={() => this.props.getStartedPressed()}>
							<Text style={styles.buttonText}>Get started!</Text>
						</TouchableOpacity>
					</View>
				</View>				
			</View>
		);
	}
}

const Header = () =>
{
	return <View style={styles.headerContainer}>
		<SvgXml width='25' xml={celiAppLogo}/>
		<Text style={styles.headerText}>
			Celiapp
		</Text>
	</View>
}

const Avatar = () =>
	<View style={styles.avatarContainer}>
		<Image style={styles.avatar} source={avatarAndy}/>
	</View>

const window = Layout.window;
const andyScheenHeight = 0.22;
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
		borderRadius: 10,
		
	},

	buttonText: 
	{
		color: '#707070',
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
		marginLeft: 10,
		marginTop: 25
	},

	avatarContainer:
	{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: window.width,
		height: window.height * 0.25
	},

	avatar:
	{
		width: 904 * ratio,
		height: window.height * andyScheenHeight
	}
});