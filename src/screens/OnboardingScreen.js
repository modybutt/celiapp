import React from "react";
import { StyleSheet, View, Text } from "react-native";
import OnBoardingComponent from "../components/OnBoardingComponent";
import Layout from "../constants/Layout";
import celiAppLogo from '../assets/images/celiapp-logo.svg';
import symptomIcon from '../assets/images/stethoscope_white.svg';
import Colors from "../constants/Colors";
import LanguageManager from "../manager/LanguageManager";

export default class OnBoardingScreen extends React.Component
{
	static navigationOptions = ({ navigation }) => ({
		header: null
	  });

	render()
	{
		return (
			<View >
				{/* <OnBoardingComponent header={false} celiappIcon={true} icon={celiAppLogo} backgroundColor={Colors.mainscreenColor}/> */}
				<OnBoardingComponent itemNo={1} header={true} icon={symptomIcon} bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_TWO')} backgroundColor={Colors.symptom}/>
				{/* <OnBoardingComponent header={false} icon={celiAppLogo} iconTitle={'Celiapp'} backgroundColor={Colors.mainscreenColor}/>
				<OnBoardingComponent header={false} icon={celiAppLogo} iconTitle={'Celiapp'} backgroundColor={Colors.mainscreenColor}/>
				<OnBoardingComponent header={false} icon={celiAppLogo} iconTitle={'Celiapp'} backgroundColor={Colors.mainscreenColor}/> */}
			</View>
		);
	}
}

const window = Layout.window;
const styles = StyleSheet.create({
	onBoardingCeliApp:
	{
		backgroundColor: '#e23772',
		width: window.width,
		height: window.height
	}
});