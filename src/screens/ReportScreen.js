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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';  //replace IonIcon as it was impossible to centre them
import ImageHeader from './ImageHeader';
import ReportInformation from '../components/ReportInformation';

var count = 0
var reportData = null;

export default class ReportScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => <ImageHeader color =  {"#fff"} backgroundColor={Colors.mainscreenColor} 
                        title={navigation.state.params ? navigation.state.params.title :  "Weekly Report"}
                        />,

    headerStyle: {
        backgroundColor: Colors.mainscreenColor,  
      }
  });

  constructor(props) {
    super(props);
    this.state = { reportData: null,
      showInformation: false,
      informationPosition: {
        'height': 0,
        'width': 0,
        'x': 0,
        'y': 0,
    },
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({

    });

    this.props.navigation.addListener('willFocus', () => {
      CeliLogger.addLog("WeekReport", Interactions.OPEN);
      this.setState({ dateForReport: new Date() });
      ReportManager.weeklyReport(this.receiveData, this.state.dateForReport);
    });

    console.log("component mounted")
  }

  addDays = (date, days) => {

    newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    return newDate;
  }

  showPreviousWeekReport = () => {
    prevWeekDate = this.addDays(this.state.dateForReport, -7)
    this.showWeekReportForDate(prevWeekDate)
  } 

  showFollowingWeekReport= () =>{
    followingWeekDate = this.addDays(this.state.dateForReport, +7)
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
    console.log("handler",this.showFollowingWeekReport)
    this.setState({ reportData: data });
    console.log("==================================received report data:");
    this.props.navigation.setParams({ title: data.title })
  }

  addEvent = (name) => () => this.props.navigation.navigate(name, { 'selectedDateAndTime': new Date() })

  toggleShowInformation = () => {
    this.setState({ showInformation: !this.state.showInformation })
}

addInformationLayout(layout){
    this.setState({informationPosition:layout});
}

  render() {
    if (!this.state.reportData) return (<View><Text>Generating report ...</Text></View>)
    reportData = this.state.reportData;


    return (
      <View style={styles.container}>
        <WeekDisplay dailyActivity={this.state.reportData.dailyActivity} />
        <BestDay iconClickEvent={this.toggleShowInformation} handlePressLeft = {this.showPreviousWeekReport} handlePressRight={this.showFollowingWeekReport}/>
        <View style={{width:'100%'}}
                    onLayout={event => {
                        const layout = event.nativeEvent.layout;
                        this.addInformationLayout(layout);
                      }}
        ></View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.infoBoxRow}>
            <InfoBox info={reportData.symptomInfo} image={symptomImage} color={Colors.symptom} onAddClicked={this.addEvent("AddSymptom")} />
            <InfoBox info={reportData.mealInfo} image={mealImage} color={Colors.meal} onAddClicked={this.addEvent("AddMeal")} />
          </View>
          <View style={styles.infoBoxRow}>
            <InfoBox info={reportData.emotionInfo} image={emotionImage} color={Colors.emotion} onAddClicked={this.addEvent("AddEmote")} />
            <InfoBox info={reportData.gipInfo} image={gipImage} color={Colors.gip} onAddClicked={this.addEvent("AddGIP")} />
          </View>
        </View>
        {this.state.showInformation &&
                    <ReportInformation color={'red'} position={this.state.informationPosition}></ReportInformation>
        }
      </View>
    );
  }
}


const LeftRightButton = ({left, right, pressHandler,iconClickEvent}) => 
  <View>
    <TouchableOpacity
     onPress = {() => {console.log("press",pressHandler); pressHandler() }}  
    style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          width: 40,
          borderRadius: 40 / 2,
          opacity:1,
          zIndex: 100,
          color: '#ff366b',
        }
    ]}>
      <Text>
      <AntDesign name={left ? "left": "right" } style={styles.leftRight} size={24} />
      </Text>
      </TouchableOpacity>
  </View>

const BestDay = ({handlePressLeft, handlePressRight,iconClickEvent}) =>
  <View style={styles.bestDay}>
    <Text style={styles.bestDayCaption}>Best Day</Text>
    <View style={styles.bestDayBorder}>
      <LeftRightButton left = {true} pressHandler = {handlePressLeft}/>
      <View style={[{display: 'flex', flexGrow : 1, flexDirection: 'column',alignItems: 'center'}]}>
        <Text style={styles.bestDayHeading}>{reportData.bestDayHeading}</Text>
        <Text style={styles.bestDayBody}>{reportData.bestDayBody}</Text>
      </View>   
      <LeftRightButton right = {true} pressHandler = {handlePressRight}/> 
    </View>   
    <View style={ styles.informationBackground}>
                        <TouchableOpacity onPress={iconClickEvent}
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                >
                                <Text style={styles.informationForeground}>i</Text>
                        </TouchableOpacity>
    </View>
  </View>

import symptomImage from '../assets/images/stethoscope_white.svg';
import emotionImage from '../assets/images/smiley_face_white.svg';
import mealImage from '../assets/images/cutlery_white.svg';
import gipImage from '../assets/images/heartbeat.svg';
import Colors from '../constants/Colors';




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

var textColor = '#ff366b'

const styles = StyleSheet.create({
  //https://medium.com/@0saurabhgour/react-native-percentage-based-progress-circle-no-external-library-e25b43e83888
  bestDay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  infoBox: {
    maxWidth: infoBoxWidth,
    height: infoBoxWidth,
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
    alignItems: 'center',
  },

  bestDayCaption: {
    color: '#ff366b',
  },
  bestDayBody: {
    color: 'dimgray',
    maxWidth: width*0.80,
  },
  bestDayHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#ff366b',
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
    color: '#ff366b',
  },

  informationBackground:
    {
        right: 5,
        bottom: 5,
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
    },
    informationForeground:
    {
        textAlign: 'center',
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold'
    }
});