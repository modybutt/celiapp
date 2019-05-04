
import React from 'react';
import {Icon, View, Text} from 'react-native';
import SymptomIcon from './SymptomIcon';
import SymptomIconButton from './SymptomIconButton';
import MoreSymptomsButton from './MoreSymptomsButton'
import HorizontalLineWithText from '../HorizontalLineWithText';
import HorizontalLine from '../HorizontalLine';


export default class SymptomGroup extends React.Component{
    render(){
        return(
            <View>
                <View style={{
                    height:200,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <SymptomIconButton type = {1} symptomID={1}/>
                    <SymptomIconButton type = {2} symptomID={2}/>
                    <SymptomIconButton type = {2} symptomID={3}/>
                    <SymptomIconButton type = {3} symptomID={4}/>
                </View>
                <View style={{
                    height:200,
                    flexDirection:'row',
                    justifyContent: 'space-around',
                    alignItems:'center',
                }}>
                    <SymptomIconButton type = {1} symptomID={5}/>
                    <SymptomIconButton type = {2} symptomID={6}/>
                    <SymptomIconButton type = {2} symptomID={7}/>
                    <SymptomIconButton type = {4} symptomID={8}/>
                </View>
                <HorizontalLine />
            </View>
        )
    }
}