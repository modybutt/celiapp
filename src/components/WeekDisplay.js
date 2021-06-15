import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Layout from '../constants/Layout';
import CircularProgressBar from "./CircularProgressBar";


export default class LoggedEntry extends React.Component
{
	render()
	{
		return <Week dailyActivity={this.props.dailyActivity} showToday={this.props.showToday} startDate={this.props.startDate}/>
	}
}

const Day=({name, percent, highlightDayLabel, dayOfMonth}) =>
  <View style={styles.day} >
    <Text style={[styles.dayLabel, { 
		color: highlightDayLabel ? mainActivityColor : '#c3c3c3'}]}> 
		{name} </Text>
		
	<CircularProgressBar color={mainActivityColor} progress={percent}
				innerSize={33} outerSize={38} innerStrokeWidth={1} outerStrokeWidth={4} size={40} text={dayOfMonth}/>
  </View>

const Week=({dailyActivity, showToday, startDate})=>
{
	let d = new Date(startDate)
	const today = (new Date().getDay() - 1) % 7;

	const days = ["Mo","Tu","We","Th","Fr","Sa","Su"].map(
		(day, i)=> {
			let dateAsNumber = null
			if(startDate){
				dateAsNumber = d.getDate();
				d.setDate(d.getDate()+1);
			}
			return(<Day
				key = {i}
				name ={day}
				percent = {dailyActivity[i]}
				highlightDayLabel={i === today && showToday}
				dayOfMonth={dateAsNumber}/>)
		}
	)

	return (
		<View style={styles.week}>
		{days}
		</View>)
}

var mainActivityColor =  '#ff366b'
var width = Layout.window.width;

const styles = StyleSheet.create({
	
	  dayLabel:{
		textAlign: 'center'
	  },
	
	  day:{
		margin:3,
	
	  },  

	  week: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: width - 40,
	  },
});