
import React from 'react';
import {Icon, View, Text} from 'react-native';
import SymptomIcon from './SymptomIcon';
import MoreSymptomsButton from './MoreSymptomsButton'
import HorizontalLineWithText from '../HorizontalLineWithText';


export default class SymptomGroup extends React.Component{
  
    render(){
        return(
            // <View>
            //     <HorizontalLineWithText text = "Symptome"/>
            //     <View style={{
            //         height:200,
            //         width:300,
            //         flexDirection: 'row',
            //         justifyContent: 'space-between',
            //         alignItems: 'stretch',
            //     }}>
            //         <SymptomIcon SymptomName = 'Headache' ID = {1}/>
            //         <SymptomIcon SymptomName = 'Fuß abgefallen' ID = {2}/>
            //         <SymptomIcon SymptomName = 'Kotzen' ID = {3}/>
            //         <SymptomIcon SymptomName = 'Rückenschmerzen' ID = {4}/>
            //     </View>
            //     <View style={{
            //         height:200,
            //         width:300,
            //         flexDirection:'row',
            //         justifyContent:'space-between',
            //         alignItems:'stretch',
            //     }}>
            //         <SymptomIcon SymptomName = 'Scheisserei' ID = {5}/>
            //         <SymptomIcon SymptomName = 'Pain' ID = {6}/>
            //         <SymptomIcon SymptomName = 'Stomacheache' ID = {7}/>
            //         <MoreSymptomsButton/>
            //     </View>
            // </View>
            <View>
                <HorizontalLineWithText text = "Symptome"/>
                <View
                style={{
                    height:200,
                    width:300,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',}}
                >
                    <SymptomIcon SymptomName = 'Headache' ID = {1}/>
                </View>
            </View>
        )
    }
}