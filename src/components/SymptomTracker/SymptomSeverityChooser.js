import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { SYMPTOM_BUTTON_TYPES } from "./SymptomIconButtonConstants.js"

// constants
import {
	bigBubbleSize,
	smallBubbleSize,
	bubbleColorOrange,
	bubbleColorYellow,
	bubbleColorRed,
} from './SymptomIconButtonConstants';

const DEFAULT_COLOR = '#F7F7F7';
const LOW_COLOR = '#D9EEEA';
const MEDIUM_COLOR = '#83E2D2';
const HIGH_COLOR = '#1DBBA0';
const DEFAULT_TEXT_COLOR = '#707070';
const MODERATE_TEXT_COLOR = '#58978A';
const SEVERE_TEXT_COLOR = '#FFFFFF';

export default class SymptomSeverityChooser extends Component {

    render() {
        let Offset = {
            top:(-smallBubbleSize/2) - 70,
            left:(-smallBubbleSize/2) - 70,
        }

		
		let topCenter = {
			top: 0,
			left: 70,
		};

		let topLeft = {
			top: 30,
			left: 0,
		};

		let topRight = {
			top: 30,
			left: 140,
		};


		if (this.props.orientation == SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_LEFT) {

			topCenter = {
				top: 22,
				left: 22,
			};

			topLeft = {
				top: 85,
				left: 0,
			};

			topRight = {
				top: 0,
				left: 85,
			};
		}  else if (this.props.orientation == SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_RIGHT) {

			topCenter = {
				top: 22,
				left: 122,
			};

			topLeft = {
				top: 0,
				left: 55,
			};

			topRight = {
				top: 85,
				left: 140,
			};
		} 

        return (
       
            <View 
                style={{
                    position: 'absolute',
                    top: this.props.position.top + Offset.top,
                    left: this.props.position.left + Offset.left,
                }}
            >
                <TouchableOpacity onPress={this.props.onPressLow} 
                    style={[
                        styles.smallBubbleYellow,
                        {
                            position: 'absolute',
                            left: topLeft.left,
                            top: topLeft.top,
                            opacity:1,
                        }
                    ]}
                >
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onPressMedium} 
                    style={[
                        styles.smallBubbleOrange,
                        {
                            position: 'absolute',
                            left: topCenter.left,
                            top: topCenter.top,
                            opacity:1,
                        }
                    ]}
                >
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onPressHigh} 
                    style={[
                        styles.smallBubbleRed,
                        {
                            position: 'absolute',
                            left: topRight.left,
                            top: topRight.top,
                            opacity:1,
                        }
                    ]}
                >
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
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

});

/*
if (this.props.type == SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_LEFT) {
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
		} else if (this.props.type == SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_CENTRE) {
			center = {
				top: -50,
				left: -55,
			};

			topCenter = {
				top: -50,
				left: -70,
			};

			topLeft = {
				top: -50,
				left: 0,
			};

			topRight = {
				top: -50,
				left: 70,
			};
		} else if (this.props.type == SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_RIGHT) {
			center = {
				top: 15,
				left: 15,
			};

			topCenter = {
				top: -30,
				left: -55,
			};

			topLeft = {
				top: -45,
				left: -60,
			};

			topRight = {
				top: -60,
				left: -15,
			};
		} else {
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
        */