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

export const images = {
	diarrhea: {
		imgName: LanguageManager.getInstance().getText("DIARRHEA"), 
		uri: require('../../assets/images/SymptomTracker/diarrhea.png')
	},
	headache: {
		imgName: LanguageManager.getInstance().getText("HEADACHE"), 
		uri: require('../../assets/images/SymptomTracker/headache.png')	
	},
	irritability: {
		imgName: LanguageManager.getInstance().getText("IRRITABILITY"), 
		uri: require('../../assets/images/SymptomTracker/irritability.png')	
	},
	stomachAche: {
		imgName: LanguageManager.getInstance().getText("STOMACHACHE"), 
		uri: require('../../assets/images/SymptomTracker/stomachAche.png')	
	},
	userDefinedSymptom: {
		imgName: LanguageManager.getInstance().getText("USER_DEFINED_SYMPTOM"), 
		uri: require('../../assets/images/SymptomTracker/userDefinedSymptom.png')	
	},
	vomiting: {
		imgName: LanguageManager.getInstance().getText("VOMITING"), 
		uri: require('../../assets/images/SymptomTracker/vomiting.png')	
	},
	weightLoss: {
		imgName: LanguageManager.getInstance().getText("WEIGHT_LOSS"), 
		uri: require('../../assets/images/SymptomTracker/weightLoss.png')	
	},
	cloating: {
		imgName: LanguageManager.getInstance().getText("CLOATING"), 
		uri: require('../../assets/images/SymptomTracker/cloating.png')	
	},
	moreSymptoms: {
		imgName: LanguageManager.getInstance().getText("MORE_SYMPTOMS"),
		uri: require('../../assets/images/SymptomTracker/moreSymptoms.png')
	}
	}
  