
import React from 'react';
import {Icon, View, Text} from 'react-native';
import SymptomIcon from './SymptomIcon';
import MoreSymptomsButton from './MoreSymptomsButton'

export default class SymptomGroup extends React.Component{
    render(){
        return(
            <View>
                <Text>SymptomGroup</Text>
                <SymptomIcon symptomID = {1}/>
                <SymptomIcon symptomID = {1}/>
                <SymptomIcon symptomID = {1}/>
                <SymptomIcon symptomID = {1}/>
                <SymptomIcon symptomID = {1}/>
                <SymptomIcon symptomID = {1}/>
                <SymptomIcon symptomID = {1}/>
                <SymptomIcon symptomID = {1}/>
                <SymptomIcon symptomID = {9}/>
                <MoreSymptomsButton/>
            </View>
 
        )
    }
}