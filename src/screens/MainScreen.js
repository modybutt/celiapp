import React from 'react';
import ImageHeader from './ImageHeader';
import Color from '../constants/Colors'

export default class MainScreen extends React.Component {
	
	static navigationOptions = ({ navigation }) => ({
    	headerTitle:<ImageHeader color={Color.mainscreenColor}/>
	});
	
	render() {
		return null;
	}
}