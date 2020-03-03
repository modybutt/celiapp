import React,{Suspense} from 'react';
import {View, Text} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import SymptomCircle from './CircleDisplay';
import DatabaseManager from '../manager/DatabaseManager';


let m_dateStack = [];

export default class CircleDisplayFull extends React.Component {
  
  updateData() {
    const self = this;

    let maxDateValue = new Date().getUTCDate()

    for (let i = 0; i <= maxDateValue; i++)
    {
      m_dateStack.push(0);
    }

    DatabaseManager.getInstance().fetchEvents(
      new Date().UTC,
      (_, error) => {alert(error)}, 
      (_, {rows: { _array }}) => (
        _array.forEach(element => {
          if( (new Date (element.created).getUTCMonth()) == new Date().getUTCMonth()
           && (new Date (element.created).getUTCFullYear()) == new Date().getUTCFullYear()
           && (new Date (element.created).getUTCDate()) <= maxDateValue)
           {
              if (element.eventType == 3)
              {
                if (element.objData[10] == 0)
                { //gluten
                  m_dateStack[new Date (element.created).getUTCDate()] = 1;
                }
                else if (element.objData[10] == 1)
                { //no gluten
                  m_dateStack[new Date (element.created).getUTCDate()] = 2;
                }
              }
              else if (element.eventType == 0)
              {  // only symptoms
                if (m_dateStack[new Date (element.created).getUTCDate()] == 0)
                {
                    m_dateStack[new Date (element.created).getUTCDate()] = 3;
                }
              }
           }
        }),

        self.setState({data: _array})
      )
    )
  }

  componentDidMount()
  {
    this.updateData();
  }


  render() {
   
    return (
      <View>
        <NavigationEvents
          onDidFocus={() => this.updateData()}
        />
      { this.state && this.state.data &&

        <SymptomCircle colourInfoList={m_dateStack}
              progBarX={this.props.progBarX}
              progBarY={this.props.progBarY}
              progBarBorderWidth={this.props.progBarBorderWidth}
              progBarBigRadius={this.props.progBarBigRadius}
              progBarSmallRadius={this.props.progBarSmallRadius}
              NoInputColour={this.props.NoInputColour} 
              GlutenColour={this.props.GlutenColour} 
              NoGlutenColour={this.props.NoGlutenColour} 
              SymptomOnlyColour={this.props.SymptomOnlyColour} 
              FinishedBackGroundColour={this.props.FinishedBackGroundColour}
              UnfinishedBackGroundColour={this.props.UnfinishedBackGroundColour}
              InsideCircleBGColour={this.props.InsideCircleBGColour}
              />
      }
      </View>

    )
  }  
}