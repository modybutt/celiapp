import React from 'react';
import { SvgXml } from 'react-native-svg';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image, 
  Dimensions 
} from 'react-native';

import LanguageManager from '../manager/LanguageManager';
import ReportManager from '../manager/ReportManager';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';
import InfoIcon from '../components/InfoIcon';

var count = 0
var reportData = null;

export default class ReportScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: LanguageManager.getInstance().getText("WEEKREPORT")
  });

  constructor(props) {
    super(props);
    this.state = { reportData: null };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      
    });

    this.props.navigation.addListener('willFocus', () => {
      CeliLogger.addLog("WeekReport", Interactions.OPEN);
      ReportManager.weeklyReport(this.receiveData);
    });

    console.log("component mounted")
  }

  receiveData = (data) => { 
    this.setState({ reportData : data });
    console.log("received report data:",data );
  }


  render() {
    if(!this.state.reportData) return (<View></View>)
    reportData =  this.state.reportData;
    
    return (
      <View style={styles.container}>
        <Week/>
        <BestDay/>
        <View style={{ marginTop:10}}>
          <View style = {styles.infoBoxRow}>
            <InfoBox info = {reportData.symptomInfo} image={symptomImage}  color={symptomColor}/>
            <InfoBox info = {reportData.mealInfo}    image={mealImage}     color={mealColor}/>
          </View>
          <View style = {styles.infoBoxRow}>
            <InfoBox info = {reportData.emotionInfo} image={emotionImage} color={emotionColor}/>
            <InfoBox info = {reportData.gipInfo}     image={gipImage}     color={gipColor}/>
          </View>
        </View>
      </View>
    );
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
  <View style={styles.dayCircleBackground}>
    <View style={[styles.dayProgress, progressShowFullQuadrants(percent)]}/>
    <View style={[styles.dayProgress, progressShowFractionOfLastQuadrant(percent)]}/>
    <View style={[styles.dayCircleBackground, hideNegativePartOfFirstQuadrant(percent)]}/>
    
  </View>
const Day=({name, percent, today}) => 
  <View style={[styles.day, today ? styles.today : '']} >
    <Text style={styles.dayLabel}>{name}</Text>
    <DayCircle percent={percent} />
  </View>

const Week=()=> {

        const days = ["Mo","Tu","We","Th","Fr","Sa","Su"].map(
          (day, i)=> 
            <Day key = {i} name ={day} percent = {reportData.dailyActivity[i]}/>
        )

        return (
          <View style={styles.week}>
            {days}
          </View>)
}

const BestDay=()=>
  <View style={styles.bestDay}>
    <Text style={styles.bestDayCaption}>Best Day</Text>
    <View style={styles.bestDayBorder}>
    <Text style={styles.bestDayHeading}>{reportData.bestDayHeading}</Text>
    <Text style={styles.bestDayBody}>{reportData.bestDayBody}</Text>
    </View>
  </View>

import symptomImage from '../assets/images/stethoscope_white.svg';
import emotionImage from '../assets/images/smiley_face_white.svg';
import mealImage from '../assets/images/cutlery_white.svg';
import gipImage from '../assets/images/heartbeat.svg';
const symptomColor =  "#1DBBA0"
const mealColor = "#3398DE"
const emotionColor = "#9958B7"
const gipColor= "#FF8D1E"

//TODO: width klopt nog niet.
const InfoBox = ({info, image, color}) =>   
  <View style={styles.infoBox}>
    <InfoIcon width={iconWidth} image={image} color={color}/>
    <Text style={[ styles.infoBoxBodytext]}>{info.body}</Text>
    <Text style={[ styles.infoBoxHeadline, {color: color}]}>{info.headline}</Text>
    <Text style={[ styles.infoBoxSubtext]}>{info.sub}</Text>
  </View>

var WIDTH = Dimensions.get('window').width;
var width = WIDTH
var dayWidth = 30;
var iconWidth = width*0.1;

var textColor =  '#ff366b'
var highlightColor = '#d0ff36'
const progressCircleThickness = 5;

const styles = StyleSheet.create({
  //https://medium.com/@0saurabhgour/react-native-percentage-based-progress-circle-no-external-library-e25b43e83888
  dayCircleBackground:{
    margin: 1, 
    width: dayWidth, 
    height: dayWidth, 
    borderColor: 'silver',
    borderRadius: dayWidth/2,
    borderWidth:progressCircleThickness,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayProgress:{
    width: dayWidth, 
    height: dayWidth, 
    borderRadius: dayWidth/2,
    borderWidth: progressCircleThickness,
    position: 'absolute',
    borderRightColor: textColor,
    borderColor: textColor  
  },

  dayLabel:{
    color:'silver',
  },

  day:{
    margin:3,

  },

  today:{
    borderColor: highlightColor,
    borderWidth: 2 
  },

  bestDay:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  infoBox:{
    maxWidth: (WIDTH/2)-14,
    height: (WIDTH/2)-14,
    backgroundColor: '#F7F7F7',
    margin: 4,
    fontWeight: "normal",
    fontSize: 8,
    lineHeight: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
  },

  infoBoxSubtext:{
    fontSize: 8,
    lineHeight: 9,
    textAlign: 'center',
  },

  infoBoxHeadline:{
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 12,
  },

  infoBoxBodytext:{
    fontSize: 11,
    textAlign: 'center',
  },

  infoBoxRow:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bestDayBorder:{
    borderWidth: 1,
    borderColor: textColor,
    padding:8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  bestDayCaption:{
    color: '#ff366b',
  },
  bestDayBody:{
        color: 'dimgray',
  },
  bestDayHeading:{
    fontSize: 20,
    fontWeight: "bold",
  },

  week: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: width > 294 ? 294 : width,
  },

  container: {
    fontSize: 26,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 13,
    fontWeight: "bold",
  }
});