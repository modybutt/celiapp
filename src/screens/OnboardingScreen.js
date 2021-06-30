import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import OnBoardingComponent from "../components/OnBoardingComponent";
import OnBoardingFinalComponent from "../components/OnBoardingFinalComponent";
import Layout from "../constants/Layout";
import symptomIcon from '../assets/images/stethoscope_white.svg';
import mealsIcon from '../assets/images/cutlery_white.svg';
import emotionIcon from '../assets/images/smiley_face_white.svg';
import gipIcon from '../assets/images/gip.svg';
import Colors from "../constants/Colors";
import LanguageManager from "../manager/LanguageManager";
import { abs } from "react-native-reanimated";

export default class OnBoardingScreen extends React.Component
{
	state = 
	{
		animateInRight: new Animated.Value(window.width),
		animateInLeft: new Animated.Value(-window.width),
		touchStartXPos: undefined,
		currentScreenIndex: 0,
		canAnimate: true,
		currentAnimation: 'no-animation'
	}

	startAnimationLeft = () => 
	{
		this.setState({canAnimate: false});
		Animated.timing(this.state.animateInRight, 
		{			
			toValue: 0,
			duration: 200,
		 	useNativeDriver: true
	   	}).start(() =>
		{
			const currentScreenIndex = this.state.currentScreenIndex;			
			this.setState(
			{
				currentScreenIndex: currentScreenIndex + 1,
				animateInRight: new Animated.Value(window.width)
			});
		});
	 };

	 startAnimationRight = () =>
	 {
		this.setState({canAnimate: false});
		Animated.timing(this.state.animateInLeft, 
		{			
			toValue: 0,
			duration: 200,
		 	useNativeDriver: true
	   	}).start(() =>
		{
			const currentScreenIndex = this.state.currentScreenIndex;
			this.setState(
			{
				currentScreenIndex: currentScreenIndex - 1,
				animateInLeft: new Animated.Value(-window.width)
			});
		});
	 }

	touchBegin(evt) 
	{
		this.setState({touchBeginPos: evt.nativeEvent.locationX})
	}

	touchMove(evt)
	{		
		if (this.state.canAnimate)
		{
			const currentScreenIndex = this.state.currentScreenIndex;
			if (currentScreenIndex < 5 && this.state.touchStartXPos - evt.nativeEvent.locationX > 5)
			{
				this.startAnimationLeft();							
			} else if (currentScreenIndex > 0 && this.state.touchStartXPos - evt.nativeEvent.locationX < -5)
			{			
				this.startAnimationRight();
			}
			this.setState({touchStartXPos: evt.nativeEvent.locationX});	
		}				
	}

	touchEnd(evt)
	{
		const currentScreenIndex = this.state.currentScreenIndex;
		//also react on plain touches instead of swipes
		if (this.state.canAnimate && currentScreenIndex < 5 && this.state.touchBeginPos !== undefined && (Math.abs(this.state.touchBeginPos-evt.nativeEvent.locationX) < 5)) {
			this.startAnimationLeft();
		} else {
			console.log("no touch condition ", this.state.touchBeginPos, this.state.canAnimate, evt.nativeEvent.locationX,(Math.abs(this.state.touchBeginPos-evt.nativeEvent.locationX) < 5));
		}
		this.setState({canAnimate: true});
		this.setState({touchStartXPos: undefined});
		this.setState({touchBeginXPos: undefined});
	}

	render()
	{
		const onBoardingScreens = this.obBoardingScreens();
		return (
			<View 
				onTouchMove={(evt) => this.touchMove(evt)}
				onTouchStart={(evt) => this.touchBegin(evt)}
				onTouchEnd={(evt) => this.touchEnd(evt)}>
					

				<View style={{
						position: 'absolute'					
					}}>
					{onBoardingScreens[this.state.currentScreenIndex]}
				</View>

				<Animated.View style={{
						zIndex: 1,
						position: 'absolute',
						transform: [{translateX: this.state.animateInLeft}]
					}}>
					{onBoardingScreens[this.state.currentScreenIndex - 1]}
				</Animated.View>

				<Animated.View style={{
						zIndex: 1,
						position: 'absolute',
						transform: [{translateX: this.state.animateInRight}]
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
				bodyText={LanguageManager.getInstance().getText('ONBOARDING_SCREEN_FIVE')} backgroundColor={Colors.gip}/>,

			<OnBoardingFinalComponent getStartedPressed={this.props.getStartedPressed} />
		];
	}
}

const window = Layout.window;
const styles = StyleSheet.create({
	onBoardingCeliAppComponentAnimation:
	{
		
	}
});