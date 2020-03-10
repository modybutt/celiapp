import * as React from 'react';
import * as Native from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

function roteX(posX, posY, centX, centY, angleRad) {
  return (Math.cos(angleRad) * (posX - centX) - Math.sin(angleRad) * (posY - centY) + centX);
}

function roteY(posX, posY, centX, centY, angleRad) {
  return (Math.sin(angleRad) * (posX - centX) + Math.cos(angleRad) * (posY - centY) + centY);
}

export default class SymptomCircle extends React.Component {

  render() {

    let angleBetweenDots = ((1 / Number(this.props.maxNumberOfInnerDots)) * 2 * Math.PI);

    let percentComplete = this.props.numberOfInnerDots / this.props.maxNumberOfInnerDots * 100;

    let smallCircleRadius = this.props.progBarSmallRadius;
    let percentCircleRadius = this.props.progBarBigRadius;
    let percetnBorderWidth = this.props.progBarBorderWidth;
    let progressBarX = this.props.progBarX;
    let progressBarY = this.props.progBarY;

    let centerX = progressBarX + (percentCircleRadius - smallCircleRadius);
    let centerY = progressBarY + (percentCircleRadius - smallCircleRadius);

    let circleX = centerX;
    let circleY = centerY - (percentCircleRadius - (smallCircleRadius * 1.5));

    let rotatedX = roteX(circleX, circleY, centerX, centerY, (angleBetweenDots / 2));
    let rotatedY = roteY(circleX, circleY, centerX, centerY, (angleBetweenDots / 2));

    let setOfCircles = [];

    circleStyle = function (x, y, color) {
      return {
        width: smallCircleRadius * 2,
        height: smallCircleRadius * 2,
        borderRadius: 100 / 2,
        backgroundColor: color,
        position: 'absolute',
        left: x,
        top: y
      }
    }

    for (let i = 0; i < this.props.numberOfInnerDots; i++) {

      rotatedX = roteX(circleX, circleY, centerX, centerY, (angleBetweenDots * i) + angleBetweenDots / 2);
      rotatedY = roteY(circleX, circleY, centerX, centerY, (angleBetweenDots * i) + angleBetweenDots / 2);
      setOfCircles.push(<Native.View key={i} style={circleStyle(rotatedX, rotatedY, this.props.colourInfoList[i])} />)
    }

    todaysColour = this.props.numberOfInnerDots > 0 ? this.props.colourInfoList[this.props.numberOfInnerDots - 1] : 'grey';

    return (
      <Native.View style={styles.MainContainer}>

        <Native.View style={{ position: "absolute", top: progressBarY, left: progressBarX }}>

          <ProgressCircle
            percent={percentComplete}
            radius={percentCircleRadius}
            borderWidth={percetnBorderWidth}
            color={this.props.FinishedBackGroundColour}
            shadowColor={this.props.UnfinishedBackGroundColour}
            bgColor={this.props.InsideCircleBGColour}
          >
            <Native.Text style={{ fontSize: 18 }}>{"21 Day Challenge"}</Native.Text>
          </ProgressCircle>
        </Native.View>
        {setOfCircles}


        <Native.View style={{ width: 100, height: 50, backgroundColor: todaysColour, borderRadius: 20, position: "absolute", top: progressBarY - 60, left: progressBarX + 80 }}>
          <Native.Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10, color: 'white' }}>{this.props.titleText}</Native.Text>
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