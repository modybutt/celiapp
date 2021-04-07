import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Layout from '../constants/Layout';


export default class LoggedEntry extends React.Component
{
	render()
	{
		return <Week dailyActivity={this.props.dailyActivity}/>
	}
}

const progressShowFractionOfLastQuadrant = (percent) => {
    var style = {
      borderRightColor : 'transparent',
      borderBottomColor : 'transparent',
      borderLeftColor : 'transparent'
    }

  if(percent <= 0) style.borderTopColor = 'transparent';
  
  const base_rotation = -45;
  const rotateBy = base_rotation + (percent*360);
  style.transform = [{rotateZ: `${rotateBy}deg`}]

  return style;
}

const progressShowFullQuadrants = (percent) =>{
  var style = {};
  if(percent < 0.25) style.borderTopColor = 'transparent';
  if(percent < 0.50) style.borderRightColor = 'transparent';
  if(percent < 0.75) style.borderBottomColor = 'transparent';
  if(percent < 1.0) style.borderLeftColor = 'transparent';

  const base_rotation = 45;
  style.transform = [{rotateZ: `${base_rotation}deg`}]

  return style
}

const hideNegativePartOfFirstQuadrant = (percent) =>{
  return {
    borderTopColor: percent < 0.25 ? '' :'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform : [{rotateZ:`${-45}deg`}]
  }
}

const DayCircle = ({percent}) => 
  <View style={[]}>
    <View style={[styles.dayCircle, styles.thinBorder, styles.dayCircleBackground]}/>	  
    <View style={[styles.dayCircle, styles.thickBorder, progressShowFullQuadrants(percent)]}/>
    <View style={[styles.dayCircle, styles.thickBorder, progressShowFractionOfLastQuadrant(percent)]}/>
    <View style={[styles.dayCircle, styles.hideBorder, hideNegativePartOfFirstQuadrant(percent)]}/> 
	<View style={[styles.dayCircle, styles.thinBorder, hideNegativePartOfFirstQuadrant(percent)]}/>
    
  </View>
const Day=({name, percent, today}) => 
  <View style={[styles.day, today ? styles.today : '']} >
    <Text style={styles.dayLabel}>{name}</Text>
    <DayCircle percent={percent} />
  </View>

const Week=({dailyActivity})=> 
{

	const days = ["Mo","Tu","We","Th","Fr","Sa","Su"].map(
		(day, i)=> <Day key = {i} name ={day} percent = {dailyActivity[i]}/>
	)

	return (
		<View style={styles.week}>
		{days}
		</View>)
}

var dayWidth = 30;
const progressCircleThickness = 5;
var mainActivityColor =  '#ff366b'
var highlightColor = '#d0ff36'
var width = Layout.window.width;
var background=  'rgb(242, 242, 242)'; //todo programmatically get the default card background colour

const styles = StyleSheet.create({

	dayCircle:{
		width: dayWidth, 
		height: dayWidth, 
		borderRadius: dayWidth/2,
		position: 'absolute',
	},

	dayCircleBackground:{
		justifyContent: 'center',
		alignItems: 'center',
		position:"relative",

	  },
	
	  thickBorder:{
		borderWidth: progressCircleThickness,
		borderRightColor: mainActivityColor,
		borderColor: mainActivityColor
	  },

	  hideBorder:{
		borderWidth: progressCircleThickness,
		borderRightColor:  background,
		borderColor:  background
	  },

	  thinBorder:{
		borderColor: '#888',
		borderWidth: 1,
	  },
	
	  dayLabel:{
		color:'#c3c3c3',
		textAlign: 'center'
	  },
	
	  day:{
		margin:3,
	
	  },
	
	  today:{
		borderColor: highlightColor,
		borderWidth: 2 
	  },

	  week: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: width - 40,
	  },
});