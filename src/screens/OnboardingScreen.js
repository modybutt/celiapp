import React from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import OnBoardingComponent from "../components/OnBoardingComponent";
import Layout from "../constants/Layout";
import celiAppLogo from '../assets/images/celiapp-logo.svg';
import symptomIcon from '../assets/images/stethoscope_white.svg';
import mealsIcon from '../assets/images/cutlery_white.svg';
import emotionIcon from '../assets/images/smiley_face_white.svg';
import gipIcon from '../assets/images/gip.svg';
import Colors from "../constants/Colors";
import LanguageManager from "../manager/LanguageManager";
import { ContainerScrollView } from "../components/Glutenbuddy/screens/WardrobeComponents/WardrobeInitTiles";

export default class OnBoardingScreen extends React.Component
{
	static navigationOptions = ({ navigation }) => ({
		header: null
	});

	state = 
	{
		someValue: new Animated.Value(window.width),
		touchStartXPos: -1,
		currentScreenIndex: 0,
		canAnimate: true,
		currentAnimation: 'no-animation'
	}

	startAnimation = (toValue) => 
	{
		this.setState({canAnimate: false});
		Animated.timing(this.state.someValue, 
		{			
			toValue: toValue,
			duration: 200,
		 	useNativeDriver: true
	   	}).start(() =>
		{
			const currentScreenIndex = this.state.currentScreenIndex;
			this.setState(
			{
				currentScreenIndex: currentScreenIndex + 1,
				someValue: new Animated.Value(window.width)});
			});
	 };

	touchMove(evt)
	{		
		if (this.state.canAnimate)
		{
			console.log(evt.nativeEvent.locationX);
			if (this.state.touchStartXPos - evt.nativeEvent.locationX > 2)
			{
				this.startAnimation(0);
				// console.log('animate right!');
											
			} else if (this.state.touchStartXPos - evt.nativeEvent.locationX < -2)
			{
				// this.setState({
				// 	someValue: new Animated.Value(0)
				// });
				// this.startAnimation(window.width);				
			}			
		}
		this.setState({touchStartXPos: evt.nativeEvent.locationX});			
	}

	touchEnd(evt)
	{
		this.setState({canAnimate: true});
		this.setState({touchStartXPos: undefined});
	}

	render()
	{
		const onBoardingScreens = this.obBoardingScreens();
		return (
			<View 
				onTouchMove={(evt) => this.touchMove(evt)}
				onTouchEnd={(evt) => this.touchEnd(evt)}>

				<View style={{
						position: 'absolute'					
					}}>
					{onBoardingScreens[this.state.currentScreenIndex]}
				</View>

				<Animated.View style={{
						zIndex: 1,
						position: 'absolute',
						transform: [{translateX: this.state.someValue}]
					}}>
					{onBoardingScreens[this.state.currentScreenIndex + 1]}
				</Animated.View>
			</View>
		);
	}

	obBoardingScreens()
	{
		return [
			<OnBoardingComponent itemNo={0} header={false}
				bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_ONE')} celiappIcon={true} backgroundColor={Colors.mainscreenColor}/>,

			<OnBoardingComponent itemNo={1} header={true} icon={symptomIcon} 
				bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_TWO')} backgroundColor={Colors.symptom}/>,

			<OnBoardingComponent itemNo={2} header={true} icon={mealsIcon} 
				bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_THREE')} backgroundColor={Colors.meal}/>,

			<OnBoardingComponent itemNo={3} header={true} icon={emotionIcon} 
				bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_FOUR')} backgroundColor={Colors.emotion}/>,

			<OnBoardingComponent itemNo={4} header={true} icon={gipIcon} 
				bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_FIVE')} backgroundColor={Colors.gip}/>
		];
	}
}

const window = Layout.window;
const styles = StyleSheet.create({
	onBoardingCeliAppComponentAnimation:
	{
		
	}
});