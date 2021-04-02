import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

/**
 * InfoIcon.
 * props need image -> SVG
 * color -> hex
 * width -> number 
 */
export default class InfoIcon extends React.Component {

	render() 
	{
		const styles = this.getIconStyle(this.props.width);
		return <View style={[styles.infoIcon, {backgroundColor: this.props.color}]}>
			<SvgXml width="26" height="26" xml={this.props.image}/>
		</View>;
	}

	getIconStyle(iconWidth)
	{
		return StyleSheet.create({
			infoIcon:{
				margin: 1, 
				width: iconWidth, 
				height: iconWidth, 
				borderRadius: iconWidth / 2,
				borderWidth:0,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: "#FF8D1E"
			}
		});
	}
};