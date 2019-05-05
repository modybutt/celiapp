import { Easing } from 'react-native';

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
		imgName: 'Diarrhea', 
		uri: require('../../assets/images/SymptomIcon/diarrhea.png')
	},
	headache: {
		imgName: 'Headache', 
		uri: require('../../assets/images/SymptomIcon/headache.png')	
	},
	irritability: {
		imgName: 'Irritability', 
		uri: require('../../assets/images/SymptomIcon/irritability.png')	
	},
	stomachAche: {
		imgName: 'Stomachache', 
		uri: require('../../assets/images/SymptomIcon/stomachAche.png')	
	},
	userDefinedSymptom: {
		imgName: 'UDS', 
		uri: require('../../assets/images/SymptomIcon/userDefinedSymptom.png')	
	},
	vomiting: {
		imgName: 'Vomiting', 
		uri: require('../../assets/images/SymptomIcon/vomiting.png')	
	},
	weightLoss: {
		imgName: 'Weight Loss', 
		uri: require('../../assets/images/SymptomIcon/weightLoss.png')	
	},
	cloating: {
		imgName: 'Cloating', 
		uri: require('../../assets/images/SymptomIcon/cloating.png')	
	},
	moreSymptoms: {
		imgName: "More Symptoms",
		uri: require('../../assets/images/SymptomIcon/moreSymptoms.png')
	}
	}
  