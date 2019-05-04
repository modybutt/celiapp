import React, { Component } from 'react';
import { TouchableOpacity, Text, Alert, Animated, Image, Easing, View, StyleSheet } from 'react-native';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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



const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// This is the add button that appears in the middle along with
// other buttons and their animations
export default class SymptomIconButton extends Component {

	//Prop: type -->  1 == left icon, 2 == normal 3 == right icon. -- Changes the placement of the severity chooser icons around the symptom icon
	//Prop: type -->  4 == MoreSymptomsButton
	//Prop: symptomID --> 1 - 7 --> systemIcons. All IDs higher than that show the userDefinedIcon.
	

	constructor(props) {
		super(props);
		this.animatedValue = new Animated.Value(0);
		this.topLeftValue = new Animated.Value(0);
		this.topCenterValue = new Animated.Value(0);
		this.topRightValue = new Animated.Value(0);		


		switch(this.props.symptomID){
			case 0:
					this.state = {
						selected: false,
						bigBubbleColor: "rgb(180, 180, 180)",
						imgSource: images.userDefinedSymptom.uri,
						symptomName: images.userDefinedSymptom.imgName,
						zIndexNumber: -1
					};
				break;
			case 1:
					this.state = {
						selected: false,
						bigBubbleColor: "rgb(180, 180, 180)",
						imgSource: images.cloating.uri,
						symptomName: images.cloating.imgName,
						zIndexNumber: -1
					};
				break;
			case 2:
					this.state = {
						selected: false,
						bigBubbleColor: "rgb(180, 180, 180)",
						imgSource: images.diarrhea.uri,
						symptomName: images.diarrhea.imgName,
						zIndexNumber: -1
					};
				break;
			case 3:
					this.state = {
						selected: false,
						bigBubbleColor: "rgb(180, 180, 180)",
						imgSource: images.headache.uri,
						symptomName: images.headache.imgName,
						zIndexNumber: -1
					};
				break;
			case 4:
					this.state = {
						selected: false,
						bigBubbleColor: "rgb(180, 180, 180)",
						imgSource: images.irritability.uri,
						symptomName: images.irritability.imgName,
						zIndexNumber: -1
					};
				break;
			case 5:
					this.state = {
						selected: false,
						bigBubbleColor: "rgb(180, 180, 180)",
						imgSource: images.stomachAche.uri,
						symptomName: images.stomachAche.imgName,
						zIndexNumber: -1
					};
				break;
			case 6:
					this.state = {
						selected: false,
						bigBubbleColor: "rgb(180, 180, 180)",
						imgSource: images.vomiting.uri,
						symptomName: images.vomiting.imgName,
						zIndexNumber: -1
					};
				break;
			case 7:
					this.state = {
						selected: false,
						bigBubbleColor: "rgb(180, 180, 180)",
						imgSource: images.weightLoss.uri,
						symptomName: images.weightLoss.imgName,
						zIndexNumber: -1
					};
				break;
			case 8:
					this.state = {
						selected: false,
						bigBubbleColor: "rgb(180, 180, 180)",
						imgSource: images.moreSymptoms.uri,
						symptomName: images.moreSymptoms.imgName,
						zIndexNumber: -1
					};	
			default:
					this.state = {
						selected: false,
						bigBubbleColor: "rgb(180, 180, 180)",
						imgSource: images.userDefinedSymptom.uri,
						symptomName: images.userDefinedSymptom.imgName,
						zIndexNumber: -1
					};
				break;
		}
	}


	handleAddButtonPress = () => {
		if(this.props.type == 4){
			Alert.alert("MOAR SYMPTOMSSSSSSSSSSS");
		}else{
			if(this.state.bigBubbleColor.localeCompare('rgb(180, 180, 180)')){
				this.setState({bigBubbleColor: 'rgb(180, 180, 180)'})
			}else{
				this.callAnimation(false);
			}
		}
	}

	callAnimation(setEnabled){
			let { selected } = this.state;
			if(selected) {
				this.animateReverse(0);
				this.setState({zIndexNumber: -1})
				this.setState({selected: !selected});
				this.props.onSeverityChooserHandled(true);
			}
			else {
				if(this.props.canOpenSeverity){
					this.animate(1);
					this.setState({zIndexNumber: 1})					
					this.props.onSeverityChooserHandled(false);
					this.setState({selected: !selected});
				}else{
					if(setEnabled){
						Alert.alert("hallo");
						this.props.onSeverityChooserHandled(true);
					}
				}
			}	
	}


	onPressYellow = () => {
		this.setState({bigBubbleColor: 'rgb(255, 215, 0)'})
		this.callAnimation(true);
		this.props.onSeverityChooserHandled(true);
	}

	onPressOrange = () => {
		this.setState({bigBubbleColor: 'rgb(255, 165, 0)'})
		this.callAnimation(true);
		this.props.onSeverityChooserHandled(true);
	}

	onPressRed = () => {
		this.setState({bigBubbleColor: 'rgb(255, 0, 0)'})
		this.handleAddButtonPress(true);
		this.props.onSeverityChooserHandled(true);
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
					}
				),
				Animated.timing(
					this.topLeftValue,
					{
						toValue,
						duration: animateTime,
						easing: easingType,
					}
				),
			]),
			Animated.timing(
				this.topCenterValue,
				{
					toValue,
					duration: animateTime,
					easing: easingType,
				}
			),
			Animated.timing(
				this.topRightValue,
				{
					toValue,
					duration: animateTime,
					easing: easingType,
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
				}
			),
			Animated.timing(
				this.topCenterValue,
				{
					toValue,
					duration: animateTime,
					easing: easingType,
				}
			),
			Animated.parallel([
				Animated.timing(
					this.animatedValue,
					{
						toValue,
						duration: animateTime,
						easing: easingType,
					}
				),
				Animated.timing(
					this.topLeftValue,
					{
						toValue,
						duration: animateTime,
						easing: easingType,
					}
				),
			]),
		]).start();
	}

	render() {

		let springValue = Animated.add(Animated.add(this.topLeftValue, this.topRightValue), this.topCenterValue);

		if(this.props.type == 1){
			center = {
				top: -15,
				left: 15,
			};
			
			topCenter = {
				top: -60,
				left: 85,
			};
			
			topLeft = {
				top: -90,
				left: 15,
			};
			
			topRight = {
				top: 15,
				left: 90,
			};
		}else if(this.props.type == 2){
			center = {
				top: -15,
				left: 15,
			};
			
			topCenter = {
				top: -90,
				left: 15,
			};
			
			topLeft = {
				top: -60,
				left: -55,
			};
			
			topRight = {
				top: -60,
				left: 85,
			};
	
		}else if(this.props.type == 3){
			center = {
				top: -15,
				left: 15,
			};
			
			topCenter = {
				top: -60,
				left: -55,
			};
			
			topLeft = {
				top: 15,
				left: -60,
			};
			
			topRight = {
				top: -90,
				left: 15,
			};
		}else{
			center = {
				top: -15,
				left: 15,
			};
			
			topCenter = {
				top: -90,
				left: 15,
			};
			
			topLeft = {
				top: -60,
				left: -55,
			};
			
			topRight = {
				top: -60,
				left: 85,
			};
		}

		return (
			<View>
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
							backgroundColor: this.state.bigBubbleColor,
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
					>
						<Animated.View
							style={{
								// transform: [
								// 	{
								// 		rotateZ: springValue.interpolate({
								// 			inputRange: [0, 1, 2, 3],
								// 			outputRange: ['45deg', '45deg', '45deg', '0deg'],
								// 		}),
								// 	},
								// ],
							}}
						>
							{/* <FAwesomeIcon
								name="plus"
								size={35}
								color="#FFF"
							/> */}
							<Image
									source = {this.state.imgSource}
									style={style.iconImage}
							 />
						</Animated.View>
					</TouchableOpacity>
				</Animated.View>
				<Text style={style.symptomNameText}>{this.state.symptomName}</Text>
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
					{/* <FAwesomeIcon
						name="camera"
						size={20}
						color="#FFF"
					/> */}
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
					{/* <FAwesomeIcon
						name="video-camera"
						size={20}
						color="#fff"
					/> */}
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
					{/* <FAwesomeIcon
						name="pencil"
						size={20}
						color="#FFF"
					/> */}
				</AnimatedTouchable>
			</View>
		);
	}
}

const style = StyleSheet.create({
	bigBubble: {
		justifyContent: 'center',
		alignItems: 'center',
		//backgroundColor: bubbleColor,
		height: bigBubbleSize,
		width: bigBubbleSize,
		borderRadius: bigBubbleSize / 2,
		top: -30,
  },
  smallBubbleYellow: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: bubbleColorYellow,
		height: smallBubbleSize,
		width: smallBubbleSize,
		borderRadius: smallBubbleSize / 2,
  },
  smallBubbleOrange: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: bubbleColorOrange,
		height: smallBubbleSize,
		width: smallBubbleSize,
		borderRadius: smallBubbleSize / 2,
	},
	smallBubbleRed: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: bubbleColorRed,
		height: smallBubbleSize,
		width: smallBubbleSize,
		borderRadius: smallBubbleSize / 2,
	},
	iconImage: {
		height: imageHeight,
		width: imageWidth,
	},
	symptomNameText:{
	  fontSize: 15,
	  textAlign: 'center',
	  margin: -25
	},
});
