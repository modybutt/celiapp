import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import celiAppLogo from '../assets/images/celiapp-logo.svg';
import Layout from "../constants/Layout";

export default class OnBoardingComponent extends React.Component
{
	//props: header: true/false,
	//icon: SVG, 
	//iconTitle: true/false, 
	//backgroundcolor, body text, 
	render()
	{
		const header = this.props.header;
		const icon = this.props.icon;
		const backgroundColor = this.props.backgroundColor;
		const bodyText = this.props.bodyText;
		const celiappIcon = this.props.celiappIcon;
		const itemNo = this.props.itemNo;

		return <View style={[styles.obBoardingBackground, {
			backgroundColor: backgroundColor
		}]} >
			<OnBoardingHeader header={header} />			
			<BodyIcon celiappIcon={celiappIcon} icon={icon} />
			<BodyText bodyText={bodyText} />
			<View style={styles.circularScreenIndicatorContainer}>
				<CircularScreenIndicator itemNo={itemNo}/>
			</View>
		</View>
	}
}

const window = Layout.window;
const OnBoardingHeader = ({header}) =>
{
	if (header) return <View style={styles.headerContainer}>
			<SvgXml width='35' xml={celiAppLogo}/>
			<Text style={styles.headerText}>
				Celiapp
			</Text>
		</View>
	return null;
}

const BodyIcon = ({celiappIcon, icon, iconTitle}) =>
{
	if (celiappIcon)
	{
		return <CeliappIconWithText />
	} else return <Icon icon={icon} iconTitle={iconTitle} />
}

const Icon = ({icon}) =>
{
	return <View style={styles.bodyIconContainer}>
		<SvgXml style={{
			}} width="75" height="75" xml={icon}/>		
	</View>
}

const CeliappIconWithText = ({}) =>
{
	return <View style={styles.celiappIconContainer}>
		<SvgXml style={{

			}} width="90" height="90" xml={celiAppLogo}/>
		<Text style={styles.iconTitleText}>Celiapp</Text>
	</View>
}

const BodyText = ({bodyText}) =>
{
	return <View style={styles.bodyTextContainer}>
		<Text style={styles.bodyText}>{bodyText}</Text>
	</View>
}

const CircularScreenIndicator = ({itemNo}) =>
{
	const blaat = [];
	for (let i = 0; i < 5; i++)
	{
		blaat.push(<Indicator key={i} active={itemNo == i}/>);
	}

	return blaat;
}

const Indicator = ({key, active}) =>
{
	return <View key={key} style={[styles.circularScreenIndicatorCircle, active ? 
		{backgroundColor: '#707070'} : {backgroundColor: 'white'}]}></View>
}

const styles = StyleSheet.create
({
	obBoardingBackground: 
	{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: window.width,
		height: window.height
	},

	headerText:
	{
		color: 'white',
		fontSize: 25,
		marginLeft: 10,
		marginTop: 20
	},

	iconTitleText:
	{
		color: 'white',
		fontSize: 45,
		marginLeft: 25,
		marginTop: 10,
		fontWeight: 'bold'
	},

	headerContainer: 
	{
		marginTop: window.height * 0.03,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: window.width
	},

	celiappIconContainer:
	{
		marginTop: window.height * 0.25,
		marginLeft: 'auto',
		marginRight: 'auto',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
    	alignItems: 'center',
		width: window.width
	},

	bodyIconContainer:
	{
		marginTop: window.height * 0.1,
		marginLeft: 'auto',
		marginRight: 'auto',
		display: 'flex',
		justifyContent: 'center',
    	alignItems: 'center',
		width: 120,
		height: 120,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 100
	},

	bodyTextContainer:
	{
		marginTop: window.height * 0.05,
	},

	bodyText: 
	{
		color: 'white',
		fontSize: 28,
		textAlign: 'left',
		marginLeft: 25,
		marginRight: 25
	},

	circularScreenIndicatorContainer: 
	{
		position: 'absolute',
		bottom: window.height * 0.05,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: window.width
	},

	circularScreenIndicatorCircle:
	{
		margin: 3,
		width: 17,
		height: 17,
		borderRadius: 17,
		
	}
});