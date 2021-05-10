import React from "react";
import Layout from '../constants/Layout';
import { StyleSheet, View, Text, Animated } from 'react-native';
import InfoIcon from '../components/InfoIcon';
import * as Icon from '@expo/vector-icons';
import _ from "lodash";
import { TouchableOpacity } from "react-native-gesture-handler";
import CircularProgressBar from './CircularProgressBar';

const AnimationState =
{
	ANIMATING: 'animating',
	OPEN: 'open',
	CLOSE: 'close'
}

export default class LoggedEntry extends React.Component
{
	state =
	{
		transformValue: new Animated.Value(0),
		touchStartXPos: -1,
		canAnimate: true,
		currentAnimation: 'no-animation',
		animationState : AnimationState.CLOSE
	}
	
	componentDidMount()
	{
		//this.setDefaultState();
		this.props.navigation.addListener('willFocus', () => {this.setState({
			transformValue: new Animated.Value(0),
			touchStartXPos: -1,
			canAnimate: true,
			currentAnimation: 'no-animation',
			animationState : AnimationState.CLOSE
		})});
	}

	startAnimation = (newAnimationState, toValue) => 
	{
		this.setState({animationState: AnimationState.ANIMATING});
		this.setState({canAnimate: false});
		Animated.timing(this.state.transformValue, 
		{			
			toValue: toValue,
			duration: 100,
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
				this.startAnimation(AnimationState.OPEN, -120);
			} else if (this.state.animationState === AnimationState.OPEN &&
				this.state.touchStartXPos - evt.nativeEvent.locationX < -2)
			{
				this.startAnimation(AnimationState.CLOSE, 0)
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
		const goal = this.props.dailyGoal;
		const actual = this.props.actual;

		console.log('goal', goal, 'actual', actual);

		return (
		<View style={styles.dropShadow}>
			<Animated.View style=
			{{
				transform: [{translateX: this.state.transformValue}]
			}}
			onTouchMove={(evt) => this.touchMove(evt)}
			onTouchEnd={(evt) => this.touchEnd(evt)}>
				<Entry 
					goal={goal}
					actual={actual}
					title={this.props.title} 
					subtitle={this.props.subtitle} 
					color={this.props.color} 
					image={this.props.image}
					onAddButtonClicked={this.props.onAddButtonClicked}
					navigationName={this.props.navigationName}
					/>
			</Animated.View>
			<View style={[styles.viewAllContentWrapper, {backgroundColor:this.props.color}]}>
				<TouchableOpacity onPress={() => this.props.onGoToDailySettingsButtonClicked()}>
					<Text style={{
							fontSize: 16,
							color: 'white',
							textAlign: 'center'
						}}>set your daily goals</Text>
				</TouchableOpacity>				
			</View>
		</View>);
	}
}

const window = Layout.window;
const Entry = ({title, subtitle, image, color, goal, actual, onAddButtonClicked, navigationName}) =>
{
	const progress = Math.min(1, actual / goal);	
	const size = window.height * 0.1;
	const innerSize = size * .825;
	const outerSize = size * .875;
	const iconSize = size * 0.63;
	const circularProgressBarMargin = -size * 0.2;
	const iconMarginLeft = -size * 0.03;
	const iconMarginTop = -size * 0.038;

	return <View style={styles.container}>
		<View style={styles.leftWrapper}>
			
			<View position='absolute' style={{
				left: circularProgressBarMargin,
				top: circularProgressBarMargin
			}} >
				<CircularProgressBar color={color} progress={progress}
				innerSize={innerSize} outerSize={outerSize} size={size}/>
			</View>

			<View style={{				
				marginLeft: iconMarginLeft,
				marginTop: iconMarginTop,
			}} >
				<InfoIcon color={color} image={image} width={iconSize}/>
			</View>
		</View>

		<View style={styles.leftWrapper}>
			<View style={styles.textInfo}>
				<Text style={[styles.text, styles.entryTitle]}>{actual} / {goal} {title}</Text>
				<Border color={color}/>			
				<Text style={[styles.text, styles.entrySubtitle]}>{subtitle}</Text>
			</View>
		</View>
		
		<View style={styles.rightWrapper}>
			<TouchableOpacity onPress={() => onAddButtonClicked(navigationName)}>
				<Icon.Ionicons  style={styles.addIcon} color={color} size={35} name={"md-add"}/>
			</TouchableOpacity>
		</View>
	</View>
}

const Border = ({color}) =>
<View style=
	{{
		marginTop: 5,
		marginBottom: 8,
		borderBottomWidth: 2,
		alignSelf: 'stretch',
		borderColor: color
	}}>
</View>

const styles = StyleSheet.create
({
	container:
	{		
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: window.width,
		height: window.height * 0.11,
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
		height: window.height * 0.11
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
		fontSize: window.height * 0.024
	},

	entrySubtitle:
	{
		fontSize: 16
	}
});