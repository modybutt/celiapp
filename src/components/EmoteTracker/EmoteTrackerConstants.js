import LanguageManager from '../../manager/LanguageManager';



export const images = {
	unhappy: {
		imgName: LanguageManager.getInstance().getText("UNHAPPY"), 
		uri: require('../../assets/images/EmoteTracker/unhappy.png')
	},
	slightlyUnhappy: {
		imgName: LanguageManager.getInstance().getText("SLIGHTLY_UNHAPPY"), 
		uri: require('../../assets/images/EmoteTracker/slightlyUnhappy.png')
	},
	neither: {
		imgName: LanguageManager.getInstance().getText("NEITHER"), 
		uri: require('../../assets/images/EmoteTracker/neither.png')
	},
	slightlyHappy: {
		imgName: LanguageManager.getInstance().getText("SLIGHTLY_HAPPY"), 
		uri: require('../../assets/images/EmoteTracker/slightlyHappy.png')
	},
	happy: {
		imgName: LanguageManager.getInstance().getText("HAPPY"), 
		uri: require('../../assets/images/EmoteTracker/happy.png')	
	},
	}