
import React from 'react';
import {Icon, View, Text} from 'react-native';
import SymptomGroup from '../components/SymptomTracker/SymptomGroup';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';
import HorizontalLine from '../components/HorizontalLine';

export default class SymptomTrackerScreen extends React.Component{
    render(){
        return(
            <View>
                <DayChooser date = {this.props.date}/>
                <SymptomGroup/>
                <NoteEdit/>
                <HorizontalLine />
            </View>
        )
    }
}