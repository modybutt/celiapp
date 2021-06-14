import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, Modal } from 'react-native';
import ImageHeader from './ImageHeader';
import Colors from '../constants/Colors'

import symptomImage from '../assets/images/stethoscope_white.svg';
import emotionImage from '../assets/images/smiley_face_white.svg';
import mealImage from '../assets/images/cutlery_white.svg';
import gipImage from '../assets/images/gip.svg';
import avatarAndy from "../assets/images/avatar_menu/avatar_lincy.png";
import mainscreenInfomodal from "../assets/images/mainscreen_infomodal.svg";
import halfwayprogress from "../assets/images/halfwayprogress.svg";

import Layout from '../constants/Layout';
import LoggedEntry from '../components/LoggedEntry';
import ReportManager from '../manager/ReportManager';
import WeekDisplay from '../components/WeekDisplay';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatabaseManager from '../manager/DatabaseManager';
import Events from '../constants/Events';
import { SvgXml } from 'react-native-svg';
import LanguageManager from '../manager/LanguageManager';

export default class MainScreen extends React.Component {
	
	static navigationOptions = ({ navigation }) => 
	({
    	headerTitle:<ImageHeader color={Colors.mainscreenColor} title={"Celiapp"}/>
	});

	constructor(props) {
		super(props);
	  }

	  state =
	  {
		  showInfoModal: false
	  };
	
	render() {
		if(!this.state.reportData || !this.state.dailyEventEntries || !this.state.dailyGoals) return (<View></View>)

    	const reportData = this.state.reportData;
		const dailyEventEntries = this.state.dailyEventEntries;
		const dailyGoals = this.state.dailyGoals;		

		//TODO: set text dynamically from reportmanager.
		return (
			<View>
					
				<View style={styles.container}>
					<WeekDisplay showToday={true} dailyActivity={reportData.dailyActivity}/>
					<Avatar showModal={this.state.showInfoModal} onShowModal={() => this.setState({showInfoModal: true})}/>
					<LoggedEntry
						navigation={this.props.navigation}
						onAddButtonClicked={(navigationName) => this.props.navigation.navigate(navigationName, {'selectedDateAndTime' : new Date() })}
						onGoToDailySettingsButtonClicked={() => this.props.navigation.navigate("GoalSetting")}
						navigationName={'AddSymptom'}
						title={'symptoms'} 
						color={Colors.symptom} 
						image={symptomImage}
						dailyGoal={dailyGoals.dailySymptoms}
						actual={dailyEventEntries.noSymptoms}
						/>

					<LoggedEntry
						navigation={this.props.navigation}
						onAddButtonClicked={(navigationName) => this.props.navigation.navigate(navigationName, {'selectedDateAndTime' : new Date() })}
						onGoToDailySettingsButtonClicked={() => this.props.navigation.navigate("GoalSetting")}
						navigationName={'AddMeal'}
						title={'meals'} 						
						viewallText={'view all meal logs'}
						color={Colors.meal}
						image={mealImage}
						dailyGoal={dailyGoals.dailyMeals}
						actual={dailyEventEntries.noMeals}
						/>

					<LoggedEntry
						navigation={this.props.navigation}
						onAddButtonClicked={(navigationName) => this.props.navigation.navigate(navigationName, {'selectedDateAndTime' : new Date() })}
						onGoToDailySettingsButtonClicked={() => this.props.navigation.navigate("GoalSetting")}
						navigationName={'AddEmote'}
						title={'energy levels'}
						viewallText={'view all energy level logs'}
						color={Colors.emotion} 
						image={emotionImage}
						dailyGoal={dailyGoals.dailyEmotions}
						actual={dailyEventEntries.noEmotions}
						/>

					{this.props.screenProps.usingGIP ?
					<LoggedEntry
						navigation={this.props.navigation}
						onAddButtonClicked={(navigationName) => this.props.navigation.navigate(navigationName, {'selectedDateAndTime' : new Date() })}
						onGoToDailySettingsButtonClicked={() => this.props.navigation.navigate("GoalSetting")}
						navigationName={'AddGIP'}
						title={'GIP results'} 						
						viewallText={'view all GIP results'}
						color={Colors.gip} 
						image={gipImage}
						dailyGoal={dailyGoals.dailyGips}
						actual={dailyEventEntries.noGips}
						/>
						:null}
					<MainScreenInfoModal showModal={this.state.showInfoModal} onModalPressed={() => this.setState({showInfoModal: false})}/>
				</View>				
			</View>			
		);
	}

	getDailyTrackerAndGoalInfo()
	{
		DatabaseManager.getInstance().loadSettings(null,
			(_, error) => { alert("error loading settings" + JSON.stringify(error)); },
			(_, { rows: { _array } }) => 
			{
				let settings = {};		
				for (var i in _array)
				{
					settings[_array[i].name] = JSON.parse(_array[i].objData);
				}		
				this.setState
				({
					dailyGoals:
					{
						dailySymptoms: settings.noSymptoms || 3,
						dailyEmotions: settings.noEmotions || 3,
						dailyMeals: settings.noMeals || 3,
						dailyGips: settings.noGips || 1
					}					
				});
			}
		);

		DatabaseManager.getInstance().fetchEvents(new Date(),
			(_, error) => { alert(error) },
			(_, { rows: { _array } }) => 
			{
				let noSymptoms = 0, noEmotions = 0, noMeals = 0, noGips = 0;
				for (let event of _array)
				{
					switch (event.eventType)
					{
						case Events.Symptom:
							noSymptoms++;
							break;
						case Events.Emotion:
							noEmotions++;
							break;
						case Events.Food:
							noMeals++;
							break;
						case Events.GIP:
							noGips++;
							break;
					}
				}
				this.setState(
				{
					dailyEventEntries:
					{
						noSymptoms: noSymptoms,
						noEmotions: noEmotions,
						noMeals: noMeals,
						noGips: noGips
					}
				});
			}			
		);
	}

	componentDidMount() 
	{
		this.props.navigation.addListener('willFocus', () => 
		{			
			ReportManager.weeklyReport(this.receiveData);

			this.getDailyTrackerAndGoalInfo();
		});
	}

	receiveData = (data) => 
	{ 
		this.setState({ reportData : data });
	}
}

const modalText1 = LanguageManager.getInstance().getText('MAINSCREEN_INFOMODAL_1');
const modalText2 = LanguageManager.getInstance().getText('MAINSCREEN_INFOMODAL_2');
const modalText3 = LanguageManager.getInstance().getText('MAINSCREEN_INFOMODAL_3');
const modalText4 = LanguageManager.getInstance().getText('MAINSCREEN_INFOMODAL_4');
const MainScreenInfoModal = ({showModal, onModalPressed}) =>
{	
	if (showModal)
	{		
		return (
			<Modal transparent={true}>			
				<Pressable sttyle={styles.fullscreenContainer} onPress={() => onModalPressed()}>
					<View style={styles.infoModal} >
						<SvgXml width={window.width * 0.8} height={window.width * 0.8} xml={mainscreenInfomodal} style={{
							position: 'absolute',
							left: window.width * 0.05,
							top: window.height * 0.38,
						}}/>
						<Text style={styles.infoModalText}>
							{modalText1}{'\n\n'}
							{modalText2}{'\n\n'}
							<SvgXml width={50} heighht={50} xml={halfwayprogress}/> 
							{modalText3}{'\n\n'}
							{modalText4}
						</Text>
					</View>
				</Pressable>
			</Modal>);
	}
	return null;
}

const Avatar = ({showModal, onShowModal}) =>
{
	const loggedEntriesTextColor = showModal ? '#707070' : '#7f7f7f';
	return <View style={styles.avatarContainer}>
			<Image style={styles.avatar} source={avatarAndy}/>
			<View style={styles.loggedInfoContainer}>
			<Text style={{fontSize: window.height * .03, color: loggedEntriesTextColor}}>Your logs today</Text>
			<View style={styles.informationBackground}>
				<TouchableOpacity
				hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
				onPress={() => onShowModal()}>
					<Text style={styles.informationForeground}>i</Text>
				</TouchableOpacity>
			</View>
		</View>
	</View>
}

const window = Layout.window;
//TODO: make this scale with image width/height
const andyScheenHeight = 0.2;
const ratio = (window.height * andyScheenHeight) / 1086;
const styles = StyleSheet.create
({
	fullscreenContainer: {        
        width: window.width,
        height: window.height,
        backgroundColor: 'rgba(100,100,100,0.5)',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 200,
    },

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
		height: window.height * 0.05
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

	informationBackground:
	{
		right: 15,
		bottom: 5,
		position: 'absolute',
		width: 30,
		height: 30,
		borderRadius: 15,
		color: '#fff',
		zIndex: 200,	
		backgroundColor: '#e92065',
	},

	informationForeground:
	{
		textAlign: 'center',
		fontSize: 25,
		color: '#fff',
		fontWeight: 'bold'
	},

	infoModal:
	{
		width: window.width,
		height: window.height,
        backgroundColor: 'rgba(255,255,255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
	},

	infoModalText:
	{
		width: window.width * 0.55,
		left: window.width * 0.1,
		top: window.height * 0.42,
		alignSelf: 'center',
		position: 'absolute', 
		color: 'white',
		fontSize: 14
	}
});