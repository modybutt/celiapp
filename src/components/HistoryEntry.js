import React from "react";
import Layout from '../constants/Layout';
import { StyleSheet, View, Text, Animated, Image } from 'react-native';
import InfoIcon from '../components/InfoIcon';
import * as Icon from '@expo/vector-icons';
import _ from "lodash";
import { TouchableOpacity } from "react-native-gesture-handler";
//import { Image } from "react-native-svg";

const AnimationState =
{
	ANIMATING: 'animating',
	OPEN: 'open',
	CLOSE: 'close'
}

export default class HistoryEntry extends React.Component {
	state =
		{
			transformValue: new Animated.Value(0),
			touchStartXPos: -1,
			canAnimate: true,
			currentAnimation: 'no-animation',
			animationState: AnimationState.CLOSE
		}

	startAnimation = (newAnimationState, toValue) => {
		this.setState({ animationState: AnimationState.ANIMATING });
		this.setState({ canAnimate: false });
		Animated.timing(this.state.transformValue,
			{
				toValue: toValue,
				duration: 100,
				useNativeDriver: true
			}).start(() => {
				this.setState({ animationState: newAnimationState });
			});
	};

	touchMove(evt) {
		if (this.state.canAnimate && this.state.animationState !== AnimationState.ANIMATING) {
			if (this.state.animationState === AnimationState.CLOSE &&
				this.state.touchStartXPos - evt.nativeEvent.locationX > 20) {
          if (this.props.viewLeftButtonText) {
            this.startAnimation(AnimationState.OPEN, -170);
          } else {
            this.startAnimation(AnimationState.OPEN, -120);
          }
			} else if (this.state.animationState === AnimationState.OPEN &&
				this.state.touchStartXPos - evt.nativeEvent.locationX < -2) {
				this.startAnimation(AnimationState.CLOSE, 0)
			}
			this.setState({ touchStartXPos: evt.nativeEvent.locationX });
		}
	}

	touchEnd(evt) {
		this.setState({ canAnimate: true });
		this.setState({ touchStartXPos: undefined });
	}

	render() {
		return (
			<View style={styles.dropShadow}>
				<TouchableOpacity onPress={this.props.onEditButtonClicked}>
				<Animated.View
					// style=
					// {{
					// 	transform: [{ translateX: this.state.transformValue }]
					// }}
					// onTouchMove={(evt) => this.touchMove(evt)}
					// onTouchEnd={(evt) => this.touchEnd(evt)}
				>
					<Entry title={this.props.title}
						subtitle={this.props.subtitle}
						color={this.props.color}
						image={this.props.image}
						onLeftButtonClicked={this.props.onLeftButtonClicked}
						onEditButtonClicked={this.props.onEditButtonClicked}
						onRightButtonClicked={this.props.onRightButtonClicked}
						navigationName={this.props.navigationName}
					/>
				</Animated.View>
				</TouchableOpacity>
			{/*	<View style={this.props.viewLeftButtonText ? styles.viewAllContentWrapper3Button : styles.viewAllContentWrapper2Button}>*/}
          {/*{ this.props.viewLeftButtonText ?*/}
    		{/*		<TouchableOpacity onPress={*/}
          {/*    () => {*/}
          {/*      this.props.onLeftButtonClicked();*/}
          {/*      //this.startAnimation(AnimationState.CLOSE, 0);*/}
          {/*    }*/}
          {/*  }>*/}
    		{/*			<View style={[styles.button, { backgroundColor: this.props.color }]}>*/}
    		{/*				<Text style={{*/}
    		{/*					fontSize: 16,*/}
    		{/*					color: 'white',*/}
    		{/*					textAlign: 'center'*/}
    		{/*				}}>{this.props.viewLeftButtonText}</Text>*/}
    		{/*			</View>*/}
    		{/*		</TouchableOpacity>*/}
          {/*  : <View />}*/}
			{/*		<View style={{width:5}}></View>*/}
			{/*		<TouchableOpacity onPress={this.props.onEditButtonClicked}>*/}
			{/*			<View style={[styles.button, { backgroundColor: this.props.color }]}>*/}
			{/*				<Text style={{*/}
			{/*					fontSize: 16,*/}
			{/*					color: 'white',*/}
			{/*					textAlign: 'center',*/}
			{/*				}}>{this.props.viewMiddleButtonText}</Text>*/}
			{/*			</View>*/}
			{/*		</TouchableOpacity>*/}
			{/*		<View style={{width:5}}></View>*/}
			{/*		<TouchableOpacity onPress={this.props.onRightButtonClicked}>*/}
			{/*			<View style={[styles.button, { backgroundColor: this.props.color }]}>*/}
			{/*				<Text style={{*/}
			{/*					fontSize: 16,*/}
			{/*					color: 'white',*/}
			{/*					textAlign: 'center',*/}
			{/*				}}>{this.props.viewRightButtonText}</Text>*/}
			{/*			</View>*/}
			{/*		</TouchableOpacity>*/}
			{/*	</View>*/}
			</View>);
	}
}

const Entry = ({ title, subtitle, image, color}) =>
	<View style={styles.container}>
		<View style={styles.leftWrapper}>
			<Image source={Image.resolveAssetSource(image)} style={styles.iconImage}></Image>
		</View>

		<View style={styles.leftWrapper}>
			<View style={styles.textInfo}>
				<Text style={[styles.text, styles.entryTitle]}>{title}</Text>
				<Border color={color} />
				<Text style={[styles.text, styles.entrySubtitle]}>{subtitle}</Text>
			</View>
		</View>

	</View>

const Border = ({ color }) =>
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

		rightWrapper:
		{
			marginLeft: 'auto',
			marginRight: 20
		},

		viewAllContentWrapper2Button:
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
    
		viewAllContentWrapper3Button:
		{
			display: 'flex',
			flexDirection: 'row',
			zIndex: -1,
			right: 0,
			alignItems: 'center',
			justifyContent: 'center',
			position: 'absolute',
			width: 170,
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
		iconImage: {
			height: '50%',
			width: '50%',
			aspectRatio: 1,
			resizeMode: 'contain',
		},
		button: {
			height: '100%',
			width: 50,
			display: 'flex',
			flexDirection: 'row',
			alignContent: 'center',
			alignItems: 'center',
			justifyContent:'center',
		},
	});