import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import LanguageManager from '../manager/LanguageManager';
import ReportManager from '../manager/ReportManager';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';
import InfoIcon from '../components/InfoIcon';
import WeekDisplay from '../components/WeekDisplay';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';  //replace IonIcon as it was impossible to centre them
import ImageHeader from './ImageHeader';
import Colors from "../constants/Colors";
import BestDayInformation from "../components/BestDayInformation";
var count = 0
var reportData = null;

const themeColor = '#1DBBA0';

export default class ReportScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle:<ImageHeader
        color =  {Colors.textOnMainScreenColor}
        backgroundColor={Colors.mainscreenColor}
    title={
      navigation.state.params ? navigation.state.params.title :  "Weekly Report"}
    />,

    headerStyle: {
        backgroundColor: Colors.mainscreenColor,  
      }
  });

  constructor(props) {
    super(props);
    this.state = {
      reportData: null,
      informationPosition: {
        'height': 0,
        'width': 0,
        'x': 0,
        'y': 0,
      },
      showBestDayInformation: false,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({

    });

    this.props.navigation.addListener('willFocus', () => {
      CeliLogger.addLog("WeekReport", Interactions.OPEN);
      let thisTimeLastWeek = this.addDays(new Date(), -7);
      this.setState({ dateForReport: thisTimeLastWeek});
      ReportManager.weeklyReport(this.receiveData, thisTimeLastWeek, "report screen");
    });

    console.log("component mounted")

    global.navigation = this.props.navigation; // TODO: This is a shortcut. Contact Martin.
  }

  addDays = (date, days) => {

    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    return newDate;
  }

  showPreviousWeekReport = () => {
    const prevWeekDate = this.addDays(this.state.dateForReport, -7)
    console.log("Show previous week:", prevWeekDate.toString());
    this.showWeekReportForDate(prevWeekDate)
  } 

  showFollowingWeekReport= () =>{
    const followingWeekDate = this.addDays(this.state.dateForReport, +7)
    console.log("Show following week");
    this.showWeekReportForDate(followingWeekDate)
  } 

  showWeekReportForDate= (date) =>{
    console.log("date in ",date.toString())
    date = date || new Date()
    console.log("date out ",date.toString())
    this.setState({ dateForReport: date });
    console.log("getting next week report",date)
    ReportManager.weeklyReport(this.receiveData, date);
  } 

  receiveData = (data) => {
    this.setState({ reportData: data });
    console.log("==================================received report data:");
    this.props.navigation.setParams({ title: data.title })
  }

  addEvent = (name) => () => this.props.navigation.navigate(name, { 'selectedDateAndTime': new Date() })

  render() {
    if (!this.state.reportData) return (<View><Text>Generating report ...</Text></View>)
    reportData = this.state.reportData;

    console.log("GIP flag", this.props.screenProps.usingGIP)
    console.log("screen props", this.props.screenProps)

    return (
      <View style={styles.container}>
        <WeekDisplay dailyActivity={this.state.reportData.dailyActivity} startDate={this.state.reportData.startOfWeek}/>
        <BestDay 
          handlePressLeft = {this.showPreviousWeekReport} handlePressRight={this.showFollowingWeekReport}
          showPreviousReportButton = {reportData.previousReportExists}  showNextReportButton = {reportData.followingReportExists}
          />
        <View style={{ marginTop: 10 }}>
          <View style={styles.infoBoxRow}>
            <InfoBox info={reportData.symptomInfo} image={symptomImage} color={Colors.symptom} onAddClicked={this.addEvent("AddSymptom")} />
            <InfoBox info={reportData.mealInfo} image={mealImage} color={Colors.meal} onAddClicked={this.addEvent("AddMeal")} />
          </View>
          <View style={styles.infoBoxRow}>
            <InfoBox info={reportData.emotionInfo} image={emotionImage} color={Colors.emotion} onAddClicked={this.addEvent("AddEmote")} />
            {this.props.screenProps.usingGIP ? <InfoBox info={reportData.gipInfo} image={gipImage} color={Colors.gip} onAddClicked={this.addEvent("AddGIP")} /> : null}
          </View>
        </View>
      </View>
    );
  }
}


const LeftRightButton = ({left, right, pressHandler}) => 
  <View>
    <TouchableOpacity
     onPress = {() => {console.log("press",pressHandler); pressHandler() }}  
    style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          opacity:1,
          zIndex: 100,
          color: Colors.mainscreenColor,
        }
    ]}>
      <Text>
      <AntDesign name={left ? "left": "right" } style={styles.leftRight} size={28} />
      </Text>
      </TouchableOpacity>
  </View>

const BestDay = ({handlePressLeft, handlePressRight, showPreviousReportButton, showNextReportButton}) => {

  const [showBestDayInformation, setShowBestDayInformation] = React.useState(false);

  let toggleShowBestDayInformation = () => {console.log("press modal", showBestDayInformation);setShowBestDayInformation(!showBestDayInformation);}

  const [informationPosition, setInformationPosition] = React.useState({});

  let addInformationLayout = (layout) => setInformationPosition(layout);

   return(
    <View style={[styles.bestDay,{width:'100%'}]}
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          addInformationLayout(layout);
          console.log("layout:", layout)
          }}
    >
    <Text style={styles.bestDayCaption}>{LanguageManager.getInstance().getText("BESTDAY")}</Text>
    <View style={styles.infoButton}>
      <TouchableOpacity onPress={toggleShowBestDayInformation}
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Text style={[styles.infoForeground]}>i</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.bestDayBorder}>
      {showPreviousReportButton && <LeftRightButton left={true} pressHandler={handlePressLeft}/>}
      <View style={[{display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center'}]}>
        <Text style={styles.bestDayHeading}>{reportData.bestDayHeading}</Text>
        <Text style={styles.bestDayBody}>{reportData.bestDayBody}</Text>
      </View>
      {showNextReportButton &&<LeftRightButton right={true} pressHandler={handlePressRight}/>}
    </View>
    {showBestDayInformation && <BestDayInformation
        color={themeColor}
        position={informationPosition}
        touchHandler={toggleShowBestDayInformation}/>
    }

  </View>
  );
}

import symptomImage from '../assets/images/stethoscope_white.svg';
import emotionImage from '../assets/images/smiley_face_white.svg';
import mealImage from '../assets/images/cutlery_white.svg';
import gipImage from '../assets/images/gip_stick.svg';
import HorizontalLineWithText from "../components/HorizontalLineWithText";

function InfoBox({ info, image, color, onAddClicked }) {
  return (<View>
    <View style={styles.infoBox}>
      <InfoIcon width={iconWidth} image={image} color={color} />
      <Text style={[styles.infoBoxBodytext]}>{info.body}</Text>
      <Text style={[styles.infoBoxHeadline, { color: color }]}>{info.headline}</Text>
      <Text style={[styles.infoBoxSubtext]}>{info.sub}</Text>
      <View style={styles.rightWrapper}></View>
    </View>
    <View style={[styles.addIcon, { backgroundColor: color }]}>
      <TouchableOpacity onPress={onAddClicked}>
        <View>
          <AntDesign name={"plus"} style={styles.plus} size={24} />
        </View>
      </TouchableOpacity>
    </View>
  </View>)
}

var WIDTH = Dimensions.get('window').width;
var width = WIDTH
var iconWidth = width * 0.1;
var addButtonWidth = width * 0.08;
var infoBoxWidth = (WIDTH / 2) - 14;

var textColor = Colors.mainscreenColor

const styles = StyleSheet.create({
  bestDay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 100,
  },

  infoButton:{
    right: 5,
    bottom: 5,
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    color: '#fff',
    backgroundColor: Colors.mainscreenColor,
    zIndex: 200,
  },
  infoForeground:
      {
        textAlign: 'center',
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold'
      },

  infoBox: {
    maxWidth: infoBoxWidth,
    height: infoBoxWidth,
    backgroundColor: Colors.infoBoxBackground,
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

  infoBoxSubtext: {
    fontSize: 8,
    lineHeight: 9,
    textAlign: 'center',
  },

  infoBoxHeadline: {
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 12,
  },

  infoBoxBodytext: {
    fontSize: 11,
    textAlign: 'center',
  },

  infoBoxRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bestDayBorder: {
    borderWidth: 1,
    borderColor: textColor,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  bestDayCaption: {
    color: textColor,
  },
  bestDayBody: {
    color: 'dimgray',
    maxWidth: width*0.80,
  },
  bestDayHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: textColor,
    maxWidth: width*0.80,
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
  },

  addIcon: {
    marginLeft: infoBoxWidth * 0.7,
    marginTop: -addButtonWidth * 0.75,
    width: addButtonWidth,
    height: addButtonWidth,
    borderRadius: addButtonWidth / 2,
    borderWidth: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: "center",
    padding: 0,
  },

  plus: {
    color: "#FFF",
  },

  leftRight:{
    color:textColor,
  }
});