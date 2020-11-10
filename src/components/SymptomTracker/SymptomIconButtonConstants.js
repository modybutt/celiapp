import { Easing } from 'react-native';
import LanguageManager from '../../manager/LanguageManager';

// // Layout constants
// export const center = {
// 	top: 8,
// 	left: 30,
// };

// export const topCenter = {
// 	top: -90,
// 	left: 15,
// };

// export const topLeft = {
// 	top: -60,
// 	left: -55,
// };

// export const topRight = {
// 	top: -60,
//     left: 85,
// };

// Style constants
export const bigBubbleSize = 80;
export const smallBubbleSize = 50;
export const bubbleColorRed = 'rgb(255, 0, 0)';
export const bubbleColorOrange = 'rgb(255, 165, 0)';
export const bubbleColorYellow = 'rgb(255, 215, 0)';


export const imageHeight = 50;
export const imageWidth = 50;

// Animate Constants
export const animateTime = 0;
// export const easingType = Easing.out(Easing.exp);
export const easingType = Easing.linear
export const delay = 0;

export const SYMPTOM_BUTTON_TYPES = {
	SEVERITY_CHOOSER_LEFT: 1,
	SEVERITY_CHOOSER_CENTRE: 2,
	SEVERITY_CHOOSER_RIGHT: 3,
	MORE_SYMPTOMS: 4,
	CREATE_SYMPTOM: 5,
	NO_SYMPTOM: 6
  };
  