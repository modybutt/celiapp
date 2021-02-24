import React, { Component } from 'react';
import { TouchableOpacity, Text, Alert, Animated, Image, Easing, View, StyleSheet, Platform } from 'react-native';
import Dialog from "react-native-dialog";
import {SYMPTOM_BUTTON_TYPES} from "./SymptomIconButtonConstants.js"

// constants
import {
	// center,
	// topCenter,
	// topLeft,
	// topRight,
	bigBubbleSize,
	smallBubbleSize,
    bubbleColorOrange,
    bubbleColorYellow,
	bubbleColorRed,
	imageHeight,
	imageWidth,
	animateTime,
	easingType,
	delay,
	images,
} from './SymptomIconButtonConstants';
import LanguageManager from '../../manager/LanguageManager';
import DatabaseManager from '../../manager/DatabaseManager';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const DEFAULT_COLOR = 'rgb(180, 180, 180)';
const LOW_COLOR = 'rgb(255, 215, 0)';
const MEDIUM_COLOR = 'rgb(255, 165, 0)';
const HIGH_COLOR = 'rgb(255, 0, 0)';

// This is the add button that appears in the middle along with
// other buttons and their animations
export default class SymptomIconButton extends Component {

	//Prop: symptomID --> 1 - 7 --> systemIcons. 0 --> more symptoms button. All IDs higher than that show the userDefinedIcon.

	constructor(props) {
		super(props);

		this.animatedValue = new Animated.Value(0);
		this.topLeftValue = new Animated.Value(0);
		this.topCenterValue = new Animated.Value(0);
		this.topRightValue = new Animated.Value(0);
	}

	state = {
		selected: false,
		zIndexNumber: -1,
		selectedSeverity: this.props.defaultSeverity == null ? 0 : this.props.defaultSeverity,
		showDeleteConfirmDialog: false
	}

	handleBack() {
		this.setState({ showDeleteConfirmDialog: false });
	};

	handleDelete() {
		if (this.state.selectedSeverity != 0) {
			this.props.onSymptomDeselected(this.props.symptomID, this.state.selectedSeverity);
		}

		DatabaseManager.getInstance().deleteSymptom(this.props.symptomID,
			(error) => {alert(error)},
			() => {this.props.onSymptomDeleted()}
		);
	};

	handleAddButtonPress = () => {
		if(this.props.type == SYMPTOM_BUTTON_TYPES.MORE_SYMPTOMS){
			this.props.navigation.navigate("MoreSymptoms", this.props.moreSymptomsParams)
		}else if (this.props.type == SYMPTOM_BUTTON_TYPES.CREATE_SYMPTOM) {
			this.props.navigation.navigate("AddNewSymptom")
        }else if (this.props.type == SYMPTOM_BUTTON_TYPES.NO_SYMPTOM)
        {
            this.onPressNoSymptoms();
        }
        else
        {
			if (this.state.selectedSeverity == 0) {
				this.callAnimation(false);
			} else {
				this.setState({selectedSeverity: 0});
				this.props.onSymptomDeselected(this.props.symptomID, this.state.selectedSeverity);
			}
		}
	}

	callAnimation(setEnabled){
			let { selected } = this.state;
			if(selected) {
				this.animateReverse(0);
				this.setState({zIndexNumber: -1})
				this.setState({selected: !selected});
				this.props.onSeverityChooserHandled(true, this.props.symptomID);
			}
			else {
				if(this.props.canOpenSeverity){
					this.animate(1);
					this.setState({zIndexNumber: 1})
					this.props.onSeverityChooserHandled(false, this.props.symptomID);
					this.setState({selected: !selected});
				}else{
					if(setEnabled){
						this.props.onSeverityChooserHandled(true, this.props.symptomID);
					}
				}
			}
	}

    onPressNoSymptoms()
    {
        const { selected } = this.state;
        this.setState({selected: !selected, selectedSeverity: selected ? 0 : 1});
        if (selected)
        {
            this.props.onSymptomDeselected(this.props.symptomID, 1);
        }
        else 
        {
            this.props.onSymptomSelected(this.props.symptomID, 1);
        }
        this.props.onSeverityChooserHandled(true);
    }

	onPressYellow = () => {
		this.setState({selectedSeverity: 1})
		this.callAnimation(true);
		this.props.onSeverityChooserHandled(true);
		this.props.onSymptomSelected(this.props.symptomID, 1) //1 --> yellow severity
	}

	onPressOrange = () => {
		this.setState({selectedSeverity: 2})
		this.callAnimation(true);
		this.props.onSeverityChooserHandled(true);
		this.props.onSymptomSelected(this.props.symptomID, 2) //2 --> orange severity
	}

	onPressRed = () => {
		this.setState({selectedSeverity: 3})
		this.callAnimation(true);
		this.props.onSeverityChooserHandled(true);
		this.props.onSymptomSelected(this.props.symptomID, 3) //3 --> red severity
	}

	animate = (toValue) => {
		Animated.stagger(delay,[
			Animated.parallel([
				Animated.timing(
					this.animatedValue,
					{
						toValue,
						duration: animateTime,
						//easing: easingType
						easing: Easing.exp,
						useNativeDriver: true
					}
				),
				Animated.timing(
					this.topLeftValue,
					{
						toValue,
						duration: animateTime,
						easing: easingType,
						useNativeDriver: true
					}
				),
			]),
			Animated.timing(
				this.topCenterValue,
				{
					toValue,
					duration: animateTime,
					easing: easingType,
					useNativeDriver: true
				}
			),
			Animated.timing(
				this.topRightValue,
				{
					toValue,
					duration: animateTime,
					easing: easingType,
					useNativeDriver: true
				}
			),
		]).start();
	}

	animateReverse = (toValue) => {
		Animated.stagger(delay,[
			Animated.timing(
				this.topRightValue,
				{
					toValue,
					duration: animateTime,
					easing: easingType,
					useNativeDriver: true
				}
			),
			Animated.timing(
				this.topCenterValue,
				{
					toValue,
					duration: animateTime,
					easing: easingType,
					useNativeDriver: true
				}
			),
			Animated.parallel([
				Animated.timing(
					this.animatedValue,
					{
						toValue,
						duration: animateTime,
						easing: easingType,
						useNativeDriver: true
					}
				),
				Animated.timing(
					this.topLeftValue,
					{
						toValue,
						duration: animateTime,
						easing: easingType,
						useNativeDriver: true
					}
				),
			]),
		]).start();
	}

	render() {

		let springValue = Animated.add(Animated.add(this.topLeftValue, this.topRightValue), this.topCenterValue);

		if(this.props.type == SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_LEFT){
			center = {
				top: 15,
				left: 15,
			};
			
			topCenter = {
				top: -30,
				left: 85,
			};
			
			topLeft = {
				top: -60,
				left: 15,
			};
			
			topRight = {
				top: 45,
				left: 90,
			};
		}else if(this.props.type == SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_CENTRE){
			center = {
				top: 15,
				left: 15,
			};
			
			topCenter = {
				top: -60,
				left: 15,
			};
			
			topLeft = {
				top: -30,
				left: -55,
			};
			
			topRight = {
				top: -30,
				left: 85,
			};
		}else if(this.props.type == SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_RIGHT){
			center = {
				top: 15,
				left: 15,
			};
			
			topCenter = {
				top: -30,
				left: -55,
			};
			
			topLeft = {
				top: 45,
				left: -60,
			};
			
			topRight = {
				top: -60,
				left: 15,
			};
		}else{
			center = {
				top: 15,
				left: 15,
			};
			
			topCenter = {
				top: -60,
				left: 15,
			};
			
			topLeft = {
				top: -30,
				left: -55,
			};
			
			topRight = {
				top: -30,
				left: 85,
			};
		}

		let bigBubbleColor = DEFAULT_COLOR;
		switch (this.state.selectedSeverity) {
			case 1: bigBubbleColor= LOW_COLOR; break;
			case 2: bigBubbleColor= MEDIUM_COLOR; break;
			case 3: bigBubbleColor= HIGH_COLOR; break;
		}

		let { selected } = this.state;
        let zIndex = selected ? 100 : 0;
        
        const symptomName = this.props.symptomID != -1 ? this.props.symptomName : 'NO_SYMPTOMS'; //TODO: Temp solution. Needs to be an entry in the database
        
		if (this.props.active == null || this.props.active == true) {
			return (
				<View style={(Platform.OS === 'ios') ?
          {marginTop: 60, opacity: this.props.opacity, zIndex: zIndex} :
          {marginTop: 60, opacity: this.props.opacity}}>
					<Animated.View
						style={[
							style.bigBubble,
							{
								transform: [
									{
										scaleY: springValue.interpolate({
											inputRange: [0, 0.65, 1, 1.65, 2, 2.65, 3],
											outputRange: [1, 1.1, 1, 1.1, 1, 1.1, 1],
										}),
									},
								],
								backgroundColor: bigBubbleColor
							},
						]}
					>
						<TouchableOpacity
							hitSlop={{
								left: 20,
								right: 20,
								top: 20,
								bottom: 20,
							}}
							onPress={this.handleAddButtonPress}
							onLongPress={() => this.props.symptomID > 7 ? this.setState({ showDeleteConfirmDialog: true }) : null}
						>
							<Animated.View>
								<Image source = {Image.resolveAssetSource(this.props.symptomIcon)} style={style.iconImage}/>
							</Animated.View>
						</TouchableOpacity>
					</Animated.View>
					<Text style={style.symptomNameText}>{LanguageManager.getInstance().getText(symptomName)}</Text>
					<AnimatedTouchable onPress={this.onPressYellow}
						style={[
							style.smallBubbleYellow,
							{
								position: 'absolute',
								transform: [
									{
										translateX: this.topLeftValue.interpolate({
											inputRange: [0, 1],
											outputRange: [center.left, topLeft.left],
										}),
									},
									{
										translateY: this.topLeftValue.interpolate({
											inputRange: [0, 1],
											outputRange: [center.top, topLeft.top],
										}),
									},
									{
										scaleY: this.topLeftValue.interpolate({
											inputRange: [0, 0.8, 0.9, 1],
											outputRange: [1, 1.5, 1.5, 1],
										}),
									},
								],
								opacity: this.topLeftValue,
								zIndex: this.state.zIndexNumber,
							},
						]}
					>
					</AnimatedTouchable>
					<AnimatedTouchable onPress={this.onPressOrange}
						style={[
							style.smallBubbleOrange,
							{
								position: 'absolute',
								transform: [
									{
										translateX: this.topCenterValue.interpolate({
											inputRange: [0, 1],
											outputRange: [center.left, topCenter.left],
										}),
									},
									{
										translateY: this.topCenterValue.interpolate({
											inputRange: [0, 1],
											outputRange: [center.top, topCenter.top],
										}),
									},
									{
										scaleY: this.topCenterValue.interpolate({
											inputRange: [0, 0.8, 0.9, 1],
											outputRange: [1, 1.5, 1.5, 1],
										}),
									},
								],
								opacity: this.topCenterValue,
								zIndex: this.state.zIndexNumber,
							},
						]}
					>
					</AnimatedTouchable>
					<AnimatedTouchable onPress={this.onPressRed}
						style={[
							style.smallBubbleRed,
							{
								position: 'absolute',
								transform: [
									{
										translateX: this.topRightValue.interpolate({
											inputRange: [0, 1],
											outputRange: [center.left, topRight.left],
										}),
									},
									{
										translateY: this.topRightValue.interpolate({
											inputRange: [0, 1],
											outputRange: [center.top, topRight.top],
										}),
									},
									{
										scaleY: this.topRightValue.interpolate({
											inputRange: [0, 0.8, 0.9, 1],
											outputRange: [1, 1.5, 1.5, 1],
										}),
									},
								],
								opacity: this.topRightValue,
								zIndex: this.state.zIndexNumber,
							},
						]}
					>
					</AnimatedTouchable>
					

					<View>
						<Dialog.Container visible={this.state.showDeleteConfirmDialog}>
							<Dialog.Title>{LanguageManager.getInstance().getText("DELETE")}</Dialog.Title>
							<Dialog.Description>
							{LanguageManager.getInstance().getText("DO_YOU_WANT_TO_DELETE")}
							</Dialog.Description>
							<Dialog.Button label={LanguageManager.getInstance().getText("BACK")} onPress={() => this.handleBack()} />
							<Dialog.Button label={LanguageManager.getInstance().getText("DISCARD")} onPress={() => this.handleDelete()} />
						</Dialog.Container>
					</View>
				</View>
			);
		} else {
			if (this.props.size === 'big') {
				return (
					<View style={{marginTop: 60, opacity: this.props.opacity, alignItems: 'center'}}>
						<View style={[style.bigBubbleBig, { backgroundColor: bigBubbleColor } ]}>
							<Image source={Image.resolveAssetSource(this.props.symptomIcon)} style={style.iconImageBig}/>
						</View>
						<Text style={style.symptomNameTextBig}>{LanguageManager.getInstance().getText(symptomName)}</Text>
					</View>
				);
			} else {
				return (
					<View style={{marginTop: 60, opacity: this.props.opacity}}>
						<View style={[style.bigBubble, { backgroundColor: bigBubbleColor } ]}>
							<Image source={Image.resolveAssetSource(this.props.symptomIcon)} style={style.iconImage}/>
						</View>
						<Text style={style.symptomNameText}>{LanguageManager.getInstance().getText(symptomName)}</Text>
					</View>
				);
			}
		}
	}
}

const style = StyleSheet.create({
	bigBubble: {
		justifyContent: 'center',
		alignItems: 'center',
		height: bigBubbleSize,
		width: bigBubbleSize,
		borderRadius: bigBubbleSize / 2,
  	},
	smallBubbleYellow: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: bubbleColorYellow,
		height: smallBubbleSize,
		width: smallBubbleSize,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: smallBubbleSize / 2,
	},
	smallBubbleOrange: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: bubbleColorOrange,
		height: smallBubbleSize,
		width: smallBubbleSize,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: smallBubbleSize / 2,
	},
	smallBubbleRed: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: bubbleColorRed,
		height: smallBubbleSize,
		width: smallBubbleSize,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: smallBubbleSize / 2,
	},
	iconImage: {
		height: imageHeight,
		width: imageWidth,
	},
	symptomNameText:{
	  fontSize: 15,
	  textAlign: 'center',
	  width: bigBubbleSize,
	  flexWrap: 'wrap',
	},
	bigBubbleBig: {
		justifyContent: 'center',
		alignItems: 'center',
		height: imageHeight * 2,
		width: imageHeight * 2,
		borderRadius: bigBubbleSize,
  	},
	iconImageBig: {
		height: imageHeight * 1.5,
		width: imageWidth  * 1.5,
	},
	symptomNameTextBig:{
		fontSize: 15,
		textAlign: 'center',
		width: bigBubbleSize * 2,
		flexWrap: 'wrap',
	  },
});
