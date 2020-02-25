import * as React from 'react';
import * as Native from 'react-native';
import moment from 'moment';
import ProgressCircle from 'react-native-progress-circle';



let m_numDaysCurrentMonth = moment( moment().format().substring(0,7) , "YYYY-MM").daysInMonth();
let m_dateDayNum = moment().format("D");
let m_dateDay = moment().format("Do");

let m_circlePercent  = (Number(m_dateDayNum) / Number(m_numDaysCurrentMonth) * 100);

let dayAngleDeg = ( (1 / Number(m_numDaysCurrentMonth)) * 360);
let dayAngleRad = (dayAngleDeg * (Math.PI / 180));



let smallCircleRadius = 10;
let percentCircleRadius = 120;
let percetnBorderWidth = 30;
let progressBarX = 85;
let progressBarY = 120;



let centerX = progressBarX + (percentCircleRadius - smallCircleRadius);
let centerY = progressBarY + (percentCircleRadius - smallCircleRadius);

let circleX = centerX;
let circleY = centerY - (percentCircleRadius - (smallCircleRadius * 1.5));

let rotatedX = roteX(circleX,circleY,centerX,centerY, (dayAngleRad/2));
let rotatedY = roteY(circleX,circleY,centerX,centerY, (dayAngleRad/2));

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

        setOfCircles.push(
          <Native.View style={circleStyle(rotatedX, rotatedY,'blue')}/>
        )

        rotatedX = roteX(circleX,circleY,centerX,centerY, (dayAngleRad * i) + dayAngleRad/2 );
        rotatedY = roteY(circleX,circleY,centerX,centerY, (dayAngleRad * i) + dayAngleRad/2 );
      }

        return (
            <Native.View style={styles.MainContainer}>

              <Native.View style={styles.circleLocal}>
                <ProgressCircle
                      percent={m_circlePercent }
                      radius={percentCircleRadius}
                      borderWidth={percetnBorderWidth}
                      color="#3399FF"
                      shadowColor="#999"
                      bgColor="#fff"
                  >
                   <Native.Text style={{ fontSize: 18 }}>{"Month View"}</Native.Text>
                  </ProgressCircle>
                </Native.View>
                {setOfCircles} 


                <Native.View style={styles.square}>
                  <Native.Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>{m_dateDay + " Day"}</Native.Text>
                </Native.View>



                <Native.View style={styles.TextBoxNoGluten}>
                  <Native.Text style={{ fontSize: 18, textAlign: 'center' }}>{m_dateDay + " Day's\nNo Gluten"}</Native.Text>
                  <Native.View style={circleStyle(-25, 10,'green')}/>
                </Native.View>

                <Native.View style={styles.TextBoxGluten}>
                  <Native.Text style={{ fontSize: 18, textAlign: 'center' }}>{m_dateDay + " Day's\nGluten"}</Native.Text>
                  <Native.View style={circleStyle(-25, 10,'red')}/>
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
        circleLocal:{
          position:"absolute",
          top: progressBarY,
          left: progressBarX 
        },
        square: {
          width: 100,
          height: 50,
          backgroundColor: 'red',
          position:"absolute",
          top: progressBarY - 60,
          left: progressBarX + 70
      },

      TextBoxNoGluten: {
        width: 100,
        height: 50,
        position:"absolute",
        top: progressBarY + 300,
        left: progressBarX
    },

    TextBoxGluten: {
      width: 100,
      height: 50,
      position:"absolute",
      top: progressBarY + 300,
      left: progressBarX + 150
  },
});