
import React from 'react';
import {Icon, View, Text} from 'react-native';
import SymptomGroup from '../components/SymptomTracker/SymptomGroup';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';

export default class SymptomTracker extends React.Component{
    render(){
        return(
            <View>
                <Text>SymptomTracker</Text>
                <DayChooser/>
                <SymptomGroup/>
                <NoteEdit/>
            </View>
        )
    }
}