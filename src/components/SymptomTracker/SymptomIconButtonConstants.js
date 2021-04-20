// Style constants
export const bigBubbleSize = 80;
export const smallBubbleSize = 50;
export const bubbleColorRed = '#1DBBA0';
export const bubbleColorOrange = '#83E2D2';
export const bubbleColorYellow = '#D9EEEA';

export const SYMPTOM_BUTTON_TYPES = {
	SEVERITY_CHOOSER_LEFT: 1,
	SEVERITY_CHOOSER_CENTRE: 2,
	SEVERITY_CHOOSER_RIGHT: 3,
	MORE_SYMPTOMS: 4,
	CREATE_SYMPTOM: 5,
	NO_SYMPTOM: 6
};

export const images = {
	id0: {
		imgName: "No_Symptom",
		uri: require('../../assets/images/SymptomTracker/symptom_icon.png'),
		uri_mild: require('../../assets/images/SymptomTracker/symptom_icon.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/symptom_icon_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/symptom_icon_severe.png'),
	},
	id1: {
		imgName: "BLOATING",
		uri: require('../../assets/images/SymptomTracker/bloating.png'),
		uri_mild: require('../../assets/images/SymptomTracker/bloating.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/bloating_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/bloating_severe.png'),
	},
	id2: {
		imgName: "DIARRHEA",
		uri: require('../../assets/images/SymptomTracker/diarrhea.png'),
		uri_mild: require('../../assets/images/SymptomTracker/diarrhea.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/diarrhea_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/diarrhea_severe.png'),
	},
	id3: {
		imgName: "HEADACHE",
		uri: require('../../assets/images/SymptomTracker/headache.png'),
		uri_mild: require('../../assets/images/SymptomTracker/headache.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/headache_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/headache_severe.png'),
	},
	id4: {
		imgName: "IRRITABILITY",
		uri: require('../../assets/images/SymptomTracker/irritability.png'),
		uri_mild: require('../../assets/images/SymptomTracker/irritability.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/irritability_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/irritability_severe.png'),
	},
	
	id5: {
		imgName: "stomach_ache",
		uri: require('../../assets/images/SymptomTracker/stomach_ache.png'),
		uri_mild: require('../../assets/images/SymptomTracker/stomach_ache.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/stomach_ache_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/stomach_ache_severe.png'),
	},
	id6: {
		imgName: "NAUSEA",
		uri: require('../../assets/images/SymptomTracker/vomiting.png'),
		uri_mild: require('../../assets/images/SymptomTracker/vomiting.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/vomiting_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/vomiting_severe.png'),
	},
	id7: {
		imgName: "LOSS_OF_APPETITE",
		uri: require('../../assets/images/SymptomTracker/lossOfAppetite.png'),
		uri_mild: require('../../assets/images/SymptomTracker/lossOfAppetite.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/lossOfAppetite_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/lossOfAppetite_severe.png'),
	},
	id8: {
		imgName: "RUMBLING_IN_STOMACH",
		uri: require('../../assets/images/SymptomTracker/rumbling_stomache.png'),
		uri_mild: require('../../assets/images/SymptomTracker/rumbling_stomache.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/rumbling_stomache_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/rumbling_stomache_severe.png'),
	},
	id9: {
		imgName: "TENESMUS",
		uri: require('../../assets/images/SymptomTracker/tenesmus.png'),
		uri_mild: require('../../assets/images/SymptomTracker/tenesmus.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/tenesmus_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/tenesmus_severe.png'),
	},
	id10: {
		imgName: "HUNGER_PAINS",
		uri: require('../../assets/images/SymptomTracker/hunger_pains.png'),
		uri_mild: require('../../assets/images/SymptomTracker/hunger_pains.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/hunger_pains_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/hunger_pains_severe.png'),
	},
	id11: {
		imgName: "LOW_ENERGY",
		uri: require('../../assets/images/SymptomTracker/low_energy.png'),
		uri_mild: require('../../assets/images/SymptomTracker/low_energy.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/low_energy_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/low_energy_severe.png'),
	},
	id12: {
		imgName: "FOOD_CRAVING",
		uri: require('../../assets/images/SymptomTracker/food_craving.png'),
		uri_mild: require('../../assets/images/SymptomTracker/food_craving.png'),
		uri_moderate: require('../../assets/images/SymptomTracker/food_craving_moderate.png'),
		uri_severe: require('../../assets/images/SymptomTracker/food_craving_severe.png'),
	},


}
/*
	(1, "BLOATING", "' + BLOATING_ICON + '", ' + now + ', ' + now + ', 0), \
(2, "DIARRHEA", "' + DIARRHEA_ICON + '", ' + now + ', ' + now + ', 0), \
(3, "HEADACHE", "' + HEADACHE_ICON + '", ' + now + ', ' + now + ', 0), \
(4, "IRRITABILITY", "' + IRRITABILITY_ICON + '", ' + now + ', ' + now + ', 0), \
(5, "ABDOMINAL_DISCOMFORT", "' + STOMACHACHE_ICON + '", ' + now + ', ' + now + ', 0), \
(6, "NAUSEA", "' + VOMITING_ICON + '", ' + now + ', ' + now + ', 0), \
(7, "LOSS_OF_APPETITE", "' + LOSS_OF_APPETITE_ICON + '", ' + now + ', ' + now + ', 0), \
(8, "RUMBLING_IN_STOMACH", "' + STOMACH_RUMBLE_ICON + '", ' + now + ', ' + now + ', 0), \
(9, "TENESMUS", "' + TENESMUS_ICON + '", ' + now + ', ' + now + ', 0), \
(10, "HUNGER_PAINS", "' + HUNGER_PAIN_ICON + '", ' + now + ', ' + now + ', 0), \
(11, "LOW_ENERGY", "' + LOW_ENERGY_ICON + '", ' + now + ', ' + now + ', 0), \
(12, "FOOD_CRAVING", "' + FOOD_CRAVING_ICON + '", ' + now + ', ' + now + ', 0); ',
*/