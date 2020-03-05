import * as React from 'react';
import * as Native from 'react-native';
import moment from 'moment';
import ProgressCircle from 'react-native-progress-circle';




let m_numDaysCurrentMonth;


if (moment( moment().format().substring(0,7) , "YYYY-MM").year() == 2020 
&& moment( moment().format().substring(0,7) , "YYYY-MM").month() == 2
&& moment( moment().format().substring(0,7) , "YYYY-MM-DD").day() < 22)
{
  m_numDaysCurrentMonth = 21;
}
else
{
  m_numDaysCurrentMonth = moment( moment().format().substring(0,7) , "YYYY-MM").daysInMonth()
}


let m_dateDayNum = moment().format("D");
let m_dateDay = moment().format("Do");


let m_circlePercent  = (Number(m_dateDayNum) / Number(m_numDaysCurrentMonth) * 100);

let dayAngleDeg = ( (1 / Number(m_numDaysCurrentMonth)) * 360);
let dayAngleRad = (dayAngleDeg * (Math.PI / 180));




function roteX(posX,posY, centX,centY, angleRad)
{       
    return(Math.cos(angleRad) * (posX - centX) - Math.sin(angleRad) * (posY - centY) + centX);
}   

function roteY(posX,posY, centX,centY, angleRad)
{
 return (Math.sin(angleRad) * (posX - centX) + Math.cos(angleRad) * (posY -centY) + centY);
}





export default class SymptomCircle extends React.Component
{
  
    render() {

      let smallCircleRadius = this.props.progBarSmallRadius;
      let percentCircleRadius = this.props.progBarBigRadius;
      let percetnBorderWidth = this.props.progBarBorderWidth;
      let progressBarX = this.props.progBarX;
      let progressBarY = this.props.progBarY;
      
      
      
      let centerX = progressBarX + (percentCircleRadius - smallCircleRadius);
      let centerY = progressBarY + (percentCircleRadius - smallCircleRadius);
      
      let circleX = centerX;
      let circleY = centerY - (percentCircleRadius - (smallCircleRadius * 1.5));
      
      let rotatedX = roteX(circleX,circleY,centerX,centerY, (dayAngleRad/2));
      let rotatedY = roteY(circleX,circleY,centerX,centerY, (dayAngleRad/2));



      let counterList = [0,0,0,0];
      let todaysColour ='';
      
      var colourManager = [];
      colourManager = this.props.colourInfoList;

      let setOfCircles = [];

      circleStyle = function(x, y, color) {
        return {
            width: smallCircleRadius * 2,
            height: smallCircleRadius * 2,
            borderRadius: 100/2,
            backgroundColor: color,
            position: 'absolute', 
            left: x,
            top: y
        }
      }

      for(let i = 1; i <= (Number(m_dateDayNum)); i++){
       
        if (colourManager[i] == 0)
        {
          setOfCircles.push(<Native.View key={i} style={circleStyle(rotatedX, rotatedY, this.props.NoInputColour)}/>)
        }
        
        if (colourManager[i] == 1)
        {
          setOfCircles.push(<Native.View key={i} style={circleStyle(rotatedX, rotatedY, this.props.SymptomOnlyColour)}/>)
        }
        
        if (colourManager[i] == 2)
        {
          setOfCircles.push(<Native.View key={i} style={circleStyle(rotatedX, rotatedY, this.props.SymptomOnlyColour)}/>)
        }
        
        if (colourManager[i] == 3)
        {
          setOfCircles.push(<Native.View key={i} style={circleStyle(rotatedX, rotatedY, this.props.SymptomOnlyColour)}/>)
        }

        rotatedX = roteX(circleX,circleY,centerX,centerY, (dayAngleRad * i) + dayAngleRad/2 );
        rotatedY = roteY(circleX,circleY,centerX,centerY, (dayAngleRad * i) + dayAngleRad/2 );
      }

      switch (colourManager[m_dateDayNum]) {
        case 0:
          todaysColour = this.props.NoInputColour;
          break;
        case 1:
          todaysColour = this.props.SymptomOnlyColour;
          break;
        case 2:
          todaysColour = this.props.SymptomOnlyColour;
            break;
        case 3:
          todaysColour = this.props.SymptomOnlyColour;
            break;
        default:
          break;
      }

      colourManager.forEach(element=>{
        switch (element) {
          case 0:
            counterList[0]++;
            break;
          case 1:
            counterList[1]++;
            break;
          case 2:
            counterList[2]++;
              break;
          case 3:
            counterList[3]++;
              break;
          default:
            break;
        }
      })

        return (
            <Native.View style={styles.MainContainer}>

              <Native.View style={{position:"absolute", top: progressBarY, left: progressBarX }}>

                <ProgressCircle
                      percent={m_circlePercent }
                      radius={percentCircleRadius}
                      borderWidth={percetnBorderWidth}
                      color = {this.props.FinishedBackGroundColour}
                      shadowColor={this.props.UnfinishedBackGroundColour}
                      bgColor={this.props.InsideCircleBGColour}
                  >
                   <Native.Text style={{ fontSize: 18 }}>{"21 Day Challenge"}</Native.Text>
                  </ProgressCircle>
                </Native.View>
                {setOfCircles} 


                <Native.View style={{ width: 100, height: 50, backgroundColor: todaysColour, borderRadius:20 ,position:"absolute", top: progressBarY - 60, left: progressBarX + 80}}>
                  <Native.Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 , color:'white'}}>{"Day " + m_dateDayNum}</Native.Text>
                </Native.View>





            </Native.View>
        );
    }
}


const styles = Native.StyleSheet.create({
    MainContainer:
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },   
});