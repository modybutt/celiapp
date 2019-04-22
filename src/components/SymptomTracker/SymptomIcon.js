//includes the call of 3 color chooser items.
//Normal press. Select Symptom
//Long press. Choose Severity

import React from 'react';
import {Icon, View, Text} from 'react-native';
import RoundPictureButton from '../RoundPictureButton';
import SymptomColorChooserItem from './SymptomColorChooserItem';

export default class SymptomIcon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            colorToUse: 'white',
            showSeverityIcon: true,
            imageURI: "http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg"
        }
    }

    render(){
        //this.state.imageURI = '../assets/images/robot-prod.png';


        if(this.state.showSeverityIcon){
            return(
                <View style={{
                    height:200,
                    width:200,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                }}
                
                >
                    <SymptomColorChooserItem type = 'red'/>
                    <SymptomColorChooserItem type = 'orange'/>
                    <SymptomColorChooserItem type = 'yellow'/>
                    <RoundPictureButton/>
                    <Text>{this.props.SymptomName}</Text>
                </View>
            )
        }
        return(
            <View>
                <RoundPictureButton imageURI = {this.state.imageURI} radius = {30}/>
                <Text>{this.props.SymptomName}</Text>
            </View>
        )
    }
}