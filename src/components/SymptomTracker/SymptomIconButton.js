import React, { Component } from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import { SYMPTOM_BUTTON_TYPES } from "./SymptomIconButtonConstants.js"
import SymptomSeverityChooser from "./SymptomSeverityChooser.js";

// constants
import {
	bigBubbleSize,
	smallBubbleSize,
	bubbleColorOrange,
	bubbleColorYellow,
	bubbleColorRed,
} from './SymptomIconButtonConstants';
import LanguageManager from '../../manager/LanguageManager';

const DEFAULT_COLOR = '#F7F7F7';
const LOW_COLOR = '#D9EEEA';
const MEDIUM_COLOR = '#83E2D2';
const HIGH_COLOR = '#1DBBA0';
const DEFAULT_TEXT_COLOR = '#707070';
const MILD_TEXT_COLOR = '#58978A';
const MODERATE_TEXT_COLOR = '#707070';
const SEVERE_TEXT_COLOR = '#FFFFFF';

export default class SymptomIconButton extends Component {

	openSeverityChooser = () => {
		if (this.props.type == SYMPTOM_BUTTON_TYPES.NO_SYMPTOM) {
			this.onPressNoSymptoms();
		} else {
			this.props.severityChooserOpenHandler(true, this.props.symptomID);
		}
	}

	closeSeverityChooserAndUpdateSeverity = () => {
		if (this.props.symptomID > 0) {
			this.props.symptomDeselected(this.props.symptomID);
		}
		this.closeSeverityChooser();
	}
	closeSeverityChooser = () => {
		this.props.severityChooserOpenHandler(false, this.props.symptomID);
	}

	onPressNoSymptoms() {
		if (this.props.symptomID > 0) {
			this.props.symptomDeselected(this.props.symptomID);
		} else {
			this.props.symptomSelected(this.props.symptomID, 1);
		}
	}

	addStr(text, stringToAdd) {
		const symbols = ".png";
		index = text.indexOf(symbols);
		return text.substring(0, index) + stringToAdd + text.substring(index, text.length);
	}

	render() {
		

		let bigBubbleColor = DEFAULT_COLOR;
		let textColor = DEFAULT_TEXT_COLOR;
		switch (this.props.severity) {
			case 1:
				bigBubbleColor = LOW_COLOR;
				textColor = MILD_TEXT_COLOR;
				break;
			case 2:
				bigBubbleColor = MEDIUM_COLOR;
				textColor = MODERATE_TEXT_COLOR;
				break;
			case 3:
				bigBubbleColor = HIGH_COLOR;
				textColor = SEVERE_TEXT_COLOR;
				break;
		}

		let severityText = " ";
		if (this.props.symptomID != 0) {
			switch (this.props.severity) {
				case 1: severityText = "mild"; break;
				case 2: severityText = "moderate"; break;
				case 3: severityText = "severe"; break;
			}
		}

		let image = Image.resolveAssetSource(this.props.symptomIcon);
		switch (this.props.severity) {
			case 1:
			case 2: image.uri = this.addStr(image.uri, "_moderate"); break;
			case 3: image.uri = this.addStr(image.uri, "_severe"); break;
		}

		const symptomName = this.props.symptomName;

		if (this.props.active == null || this.props.active == true) {

			return (
				<View style={{ backgroundColor: bigBubbleColor, borderRadius: 3,}}>

					<TouchableOpacity
						style={styles.bigBubble}
						onPress={this.props.severityChooserOpen ? this.closeSeverityChooserAndUpdateSeverity : this.openSeverityChooser}>
						<Image source={image} style={styles.iconImage} />
						<Text style={[{ color: textColor }, styles.severityText]}>{severityText}</Text>
						<Text style={[{ color: textColor }, styles.symptomNameText]}>{LanguageManager.getInstance().getText(symptomName)}</Text>
					</TouchableOpacity>
				</View>
			);
		}
		//for old version of event history (will be removed in the new design)
		else {
			return (
				<View style={[{ backgroundColor: bigBubbleColor, borderRadius: 3 }, styles.bigBubble]}>
					<Image source={image} style={styles.iconImage} />
					<Text style={[{ color: textColor }, styles.severityText]}>{severityText}</Text>
					<Text style={[{ color: textColor }, styles.symptomNameText]}>{LanguageManager.getInstance().getText(symptomName)}</Text>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	bigBubble: {

		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	iconImage: {
		height: '50%',
		width: '50%',
		aspectRatio: 1,
		resizeMode: 'contain',
	},
	symptomNameText: {
		fontSize: 10,
		textAlign: 'center',
		width: bigBubbleSize,
		flexWrap: 'wrap',
	},
	severityText: {
		paddingTop: 5,
		fontSize: 8,
		textAlign: 'center',
		width: bigBubbleSize,
		flexWrap: 'wrap',
	},
});

/*
<View
						style={
							{
								position: 'absolute',
								left: center.left,
								top: center.top,
							}
						}
						>
							<TouchableOpacity onPress={this.onPressYellow}
								style={[
									styles.smallBubbleYellow,
									{
										position: 'absolute',
										left: topLeft.left,
										top: topLeft.top,
									}
								]}
							>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.onPressOrange}
								style={[
									styles.smallBubbleOrange,
									{
										position: 'absolute',
										left: topCenter.left,
										top: topCenter.top,
									}
								]}
							>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.onPressRed}
								style={[
									styles.smallBubbleRed,
									{
										position: 'absolute',
										left: topRight.left,
										top: topRight.top,
									}
								]}
							>
							</TouchableOpacity>
						</View>


						<SymptomSeverityChooser onPressYellow={this.onPressYellow} onPressOrange={this.onPressOrange} onPressRed={this.onPressRed}></SymptomSeverityChooser>
						*/