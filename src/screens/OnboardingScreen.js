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

const AnimationState =
{
	ANIMATING: 'animating',
	OPEN: 'open',
	CLOSE: 'close'
}

export default class OnBoardingScreen extends React.Component
{
	static navigationOptions = ({ navigation }) => ({
		header: null
	});

	state = 
	{
		someValue: new Animated.Value(window.width),
		touchStartXPos: -1,
		canAnimate: true,
		currentAnimation: 'no-animation',
		animationState : AnimationState.CLOSE
	}

	startAnimation = (newAnimationState, toValue) => 
	{
		this.setState({animationState: AnimationState.ANIMATING});
		this.setState({canAnimate: false});
		Animated.timing(this.state.someValue, 
		{			
			toValue: toValue,
			duration: 200,
		 	useNativeDriver: true
	   	}).start(() =>
		{
			this.setState({animationState: newAnimationState});
		});
	 };

	touchMove(evt)
	{		
		if (this.state.canAnimate && this.state.animationState !== AnimationState.ANIMATING)
		{			
			if (this.state.animationState === AnimationState.CLOSE &&
				this.state.touchStartXPos - evt.nativeEvent.locationX > 2)
			{
				this.startAnimation(AnimationState.OPEN, 0);
			} else if (this.state.animationState === AnimationState.OPEN &&
				this.state.touchStartXPos - evt.nativeEvent.locationX < -2)
			{
				this.startAnimation(AnimationState.CLOSE, window.width)
			}
			this.setState({touchStartXPos: evt.nativeEvent.locationX});			
		}				
	}

	touchEnd(evt)
	{
		this.setState({canAnimate: true});
		this.setState({touchStartXPos: undefined});	
	}

	render()
	{
		return (
			<View 
				onTouchMove={(evt) => this.touchMove(evt)}
				onTouchEnd={(evt) => this.touchEnd(evt)}>

				<View style={{
						position: 'absolute'						
					}}>
					<OnBoardingComponent itemNo={0} header={false}
					bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_ONE')} celiappIcon={true} backgroundColor={Colors.mainscreenColor}/>
				</View>

				<Animated.View style={{
						zIndex: 1,
						position: 'absolute',
						transform: [{translateX: this.state.someValue}]	
					}}>
						<OnBoardingComponent itemNo={1} header={true} icon={symptomIcon} 
							bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_TWO')} backgroundColor={Colors.symptom}/>
				</Animated.View>

				<Animated.View style={{
						zIndex: 2,
						position: 'absolute',
						transform: [{translateX: this.state.someValue}]	
					}}>
						<OnBoardingComponent itemNo={2} header={true} icon={mealsIcon} 
							bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_THREE')} backgroundColor={Colors.meal}/>
				</Animated.View>

				<Animated.View style={{
						zIndex: 3,
						position: 'absolute',
						transform: [{translateX: this.state.someValue}]	
					}}>
						<OnBoardingComponent itemNo={3} header={true} icon={emotionIcon} 
							bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_FOUR')} backgroundColor={Colors.emotion}/>
				</Animated.View>

				<Animated.View style={{
						zIndex: 4,
						position: 'absolute',
						transform: [{translateX: this.state.someValue}]	
					}}>
						<OnBoardingComponent itemNo={4} header={true} icon={gipIcon} 
							bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_FIVE')} backgroundColor={Colors.gip}/>
				</Animated.View>
			</View>
		);
	}
}

const obBoardingScreens = () =>
{
	const screens = [];
}

const window = Layout.window;
const styles = StyleSheet.create({
	onBoardingCeliAppComponentAnimation:
	{
		
	}
});