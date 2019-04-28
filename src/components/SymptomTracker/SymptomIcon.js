//includes the call of 3 color chooser items.
//Normal press. Select Symptom
//Long press. Choose Severity

import React from 'react';
import {Alert, View, Text} from 'react-native';
import RoundPictureButton from '../RoundPictureButton';
import SymptomColorChooserItem from './SymptomColorChooserItem';

export default class SymptomIcon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            colorToUse: 'white',
            showSeverityIcon: false,
            iconSelected: false,
            choosenSeverity: 1,
            imageURI: "http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg"
        }
    }

    onPressTouchable(){
        this.setState({iconSelected: true});
      }
  
    onLongPressTouchable(){
        this.setState({showSeverityIcon: true});
      }


    render(){
        //this.state.imageURI = '../assets/images/robot-prod.png';

        //severity active
        if(this.state.showSeverityIcon){

            return(
                <View style={{
                    height:200,
                    width:400,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                }}    
                >
                    <View
                    style={{
                        height:100,
                        width:100,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'stretch'}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'stretch'}}>                    
                                <SymptomColorChooserItem type = 'red'/>
                                <SymptomColorChooserItem type = 'orange'/>
                                <SymptomColorChooserItem type = 'yellow'/>
                        </View>
                        <View>
                            <RoundPictureButton isSelected = {this.state.iconSelected} imageURI = {this.state.imageURI} radius = {30} onPress={() => this.onPressTouchable()} onLongPress = {() => this.onLongPressTouchable()}/>
                            <Text>{this.props.SymptomName}</Text>
                        </View>
                    </View>


                </View>
            )
        }


        //no severity icons
        return(
            <View>
                <RoundPictureButton isSelected = {this.state.iconSelected} imageURI = {this.state.imageURI} radius = {30} onPress={() => this.onPressTouchable()} onLongPress = {() => this.onLongPressTouchable()}/>
                <Text>{this.props.SymptomName}</Text>
            </View>
        )
    }
}