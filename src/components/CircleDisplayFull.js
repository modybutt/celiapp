import React from 'react';
import SymptomCircle from './CircleDisplay';
import DatabaseManager from '../manager/DatabaseManager';


export default class CircleDisplayFull extends React.Component {
  render() {
    var m_dateStack = [];

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
           && (new Date (element.created).getUTCDate()) <= maxDateValue
           && (element.eventType == 0 || element.eventType == 3)
           )
          m_dateStack[new Date (element.created).getUTCDate()] = 1;
        }),


        m_dateStack.forEach(element => {
          console.log(element);
        })
      )
    );
    return (<SymptomCircle/>);
  }  
}