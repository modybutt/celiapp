import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ImageHeader from './ImageHeader';
import Colors from '../constants/Colors'

import symptomImage from '../assets/images/stethoscope_white.svg';
import emotionImage from '../assets/images/smiley_face_white.svg';
import mealImage from '../assets/images/cutlery_white.svg';
import gipImage from '../assets/images/heartbeat.svg';
import andyPlaceholder from "../assets/images/avatar_menu/placeholder_andy.png";

import Layout from '../constants/Layout';
import LoggedEntry from '../components/LoggedEntry';
import ReportManager from '../manager/ReportManager';
import WeekDisplay from '../components/WeekDisplay';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MainScreen extends React.Component {
	
	static navigationOptions = ({ navigation }) => 
	({
    	headerTitle:<ImageHeader color={Colors.mainscreenColor} title={"Celiapp"}/>
	});

	constructor(props) {
		super(props);
		this.state = { reportData: null };
	  }
	
	render() {
		if(!this.state.reportData) return (<View></View>)
    	reportData = this.state.reportData;
		//TODO: set text dynamically from reportmanager.
		return (
			<View style={styles.container}>
				<WeekDisplay dailyActivity={reportData.dailyActivity}/>
				<Avatar/>
				<LoggedEntry
					navigation={this.props.navigation}
					onAddButtonClicked={(navigationName) => this.props.navigation.navigate(navigationName, {'selectedDateAndTime' : new Date() })}
					onGoToDailySettingsButtonClicked={() => this.props.navigation.navigate("GoalSetting")}
					navigationName={'AddSymptom'}
					title={'2 symptoms'} 
					subtitle={'Last entry: Friday Oct 8th.'}					
				 	color={Colors.symptom} 
					image={symptomImage}/>

				<LoggedEntry
					navigation={this.props.navigation}
					onAddButtonClicked={(navigationName) => this.props.navigation.navigate(navigationName, {'selectedDateAndTime' : new Date() })}
					onGoToDailySettingsButtonClicked={() => this.props.navigation.navigate("GoalSetting")}
					navigationName={'AddMeal'}
					title={'7 meals'} 
					subtitle={'Last entry: Friday Oct 8th.'}
					viewallText={'view all meal logs'}
					color={Colors.meal}
					image={mealImage}/>

				<LoggedEntry
					navigation={this.props.navigation}
					onAddButtonClicked={(navigationName) => this.props.navigation.navigate(navigationName, {'selectedDateAndTime' : new Date() })}
					onGoToDailySettingsButtonClicked={() => this.props.navigation.navigate("GoalSetting")}
					navigationName={'AddEmote'}
					title={'3 energy levels'} 
					subtitle={'Last entry: Friday Oct 8th.'}
					viewallText={'view all energy level logs'}
				 	color={Colors.emotion} 
					image={emotionImage}/>

				<LoggedEntry
					navigation={this.props.navigation}
					onAddButtonClicked={(navigationName) => this.props.navigation.navigate(navigationName, {'selectedDateAndTime' : new Date() })}
					onGoToDailySettingsButtonClicked={() => this.props.navigation.navigate("GoalSetting")}
					navigationName={'AddGIP'}
					title={'4 GIP results'} 
					subtitle={'Last entry: Friday Oct 8th.'}
					viewallText={'view all GIP results'}
				 	color={Colors.gip} 
					image={gipImage}/>			
			</View>	
		);
	}

	componentDidMount() 
	{
		this.props.navigation.setParams({
      
		});

		this.props.navigation.addListener('willFocus', () => 
		{
			//CeliLogger.addLog("WeekReport", Interactions.OPEN);
			ReportManager.weeklyReport(this.receiveData);
		});
	}

	onAddButtonClicked(name)
	{
		console.log(`go to ${name} page.`);
	}

	receiveData = (data) => 
	{ 
		this.setState({ reportData : data });
		console.log("received report data mainscreen:", data);
	}
}

const Avatar = () =>
	<View style={styles.avatarContainer}>
		<Image style={styles.avatar} source={andyPlaceholder}/>
		<View style={styles.loggedInfoContainer}>
			<Text style={styles.loggedInfo}>This week you have logged</Text>
			<View style={styles.informationBackground}>
				<TouchableOpacity style={styles.touchableOpacityInfoButton} onPress={() => 
				console.log('clicky!')}>
					<Text style={styles.informationForeground}>i</Text>
				</TouchableOpacity>
			</View>
		</View>
	</View>

const window = Layout.window;
//TODO: make this scale with image width/height
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

	avatarContainer:
	{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: window.width,
		height: window.height * 0.25
	},

	loggedInfoContainer:
	{
		display: 'flex',
		flexDirection: 'row',
		justifyContent:'center',
		alignItems: 'center',
		width: window.width
	},

	avatar:
	{
		width: 904 * ratio,
		height: window.height * andyScheenHeight
	},

	loggedInfo:
	{
		color: '#707070',
		fontSize: 20
	},

	touchableOpacityInfoButton:
	{
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#e92065',
	},

	informationBackground:
	{		
		right: 20,
		bottom: 10,
		position: 'absolute',		
	},

	informationForeground:
	{
		textAlign: 'center',
		fontSize: 25,
		color: '#fff',
		fontWeight: 'bold'
	}
});