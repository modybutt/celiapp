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
import WeekDisplay from '../components/WeekDisplay';

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
        <WeekDisplay reportData={this.state.reportData}/>
        <BestDay/>
        <View style={{ marginTop:10}}>
          <View style = {styles.infoBoxRow}>
            <InfoBox info = {reportData.symptomInfo} image={symptomImage}  color={Colors.symptom}/>
            <InfoBox info = {reportData.mealInfo}    image={mealImage}     color={Colors.meal}/>
          </View>
          <View style = {styles.infoBoxRow}>
            <InfoBox info = {reportData.emotionInfo} image={emotionImage} color={Colors.emotion}/>
            <InfoBox info = {reportData.gipInfo}     image={gipImage}     color={Colors.gip}/>
          </View>
        </View>
      </View>
    );
  }
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
import Colors from '../constants/Colors';

const InfoBox = ({info, image, color}) =>   
  <View style={styles.infoBox}>
    <InfoIcon width={iconWidth} image={image} color={color}/>
    <Text style={[ styles.infoBoxBodytext]}>{info.body}</Text>
    <Text style={[ styles.infoBoxHeadline, {color: color}]}>{info.headline}</Text>
    <Text style={[ styles.infoBoxSubtext]}>{info.sub}</Text>
  </View>

var WIDTH = Dimensions.get('window').width;
var width = WIDTH
var iconWidth = width*0.1;

var textColor =  '#ff366b'

const styles = StyleSheet.create({
  //https://medium.com/@0saurabhgour/react-native-percentage-based-progress-circle-no-external-library-e25b43e83888
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