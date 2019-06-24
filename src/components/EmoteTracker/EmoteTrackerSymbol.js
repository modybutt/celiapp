
import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight, Alert, Image} from 'react-native';
import LanguageManager from '../../manager/LanguageManager';

// constants
import {
    images
} from './EmoteTrackerConstants';


export default class EmoteTrackerSymbol extends React.Component{

    constructor(props) {
       super(props);
       switch(this.props.emoteID){ // 1 = unhappy, 5 = happy
            case 1:
                this.state = {
                    imgSource: images.unhappy.uri,
                    imgName: images.unhappy.imgName,
                    selected: this.props.selected === 1,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
            case 2:
                this.state = {
                    imgSource: images.slightlyUnhappy.uri,
                    imgName: images.slightlyUnhappy.imgName,
                    selected: this.props.selected === 2,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
            case 3:
                this.state = {
                    imgSource: images.neither.uri,
                    imgName: images.neither.imgName,
                    selected: this.props.selected === 3,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
            case 4:
                this.state = {
                    imgSource: images.slightlyHappy.uri,
                    imgName: images.slightlyHappy.imgName,
                    selected: this.props.selected === 4,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
            case 5:
                this.state = {
                    imgSource: images.happy.uri,
                    imgName: images.happy.imgName,
                    selected: this.props.selected == 5,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
       }
    }


    setSelected(isSelected){
        this.setState({selected: isSelected})
    }

    //only select emotion, because deselection happens when another emote gets selected. --> needs to be handled in emotionGroup
    selectEmotion = () =>{
        if(!this.state.selected){
            // this.setState({
            //     selected: true,
            //     selectedColor: 'rgb(255, 165, 0)',
            // });
            this.props.onEmoteSelected(this.props.emoteID)
        }
    }

    // render(){
    //     return(
    //         <View>
    //             <View style={styles.container}>
    //                 <TouchableHighlight style={{height: this.props.radius*2, height: this.props.radius*2, borderRadius: this.props.radius}} onPress={this.props.onPress}>
    //                     <Image source={this.state.imgSource} style={{width: this.props.radius*2, height: this.props.radius*2, borderRadius:this.props.radius, backgroundColor: this.props.color}} />
    //                 </TouchableHighlight> 
    //             </View>                
    //         </View>
    //     )
    // }


    //TODO: If selected, then color the border in some color defined in EmoteTrackerConstants(not yet added)
    render(){

        if(!this.state.selected){
            return(
                <View style={styles.container}>
                    <TouchableHighlight style={{height: 80, borderRadius: 40, backgroundColor: 'rgb(255,255,255)', justifyContent: 'center', alignItems: 'center'}} onPress={this.selectEmotion}>
                        <Image source={this.state.imgSource} style={{width: 75, height: 75, borderRadius:40}} />
                    </TouchableHighlight> 
                    <Text style={{textAlign: 'center', flexWrap: 'wrap'}}>{LanguageManager.getInstance().getText(this.state.imgName)}</Text>
                </View>                
            )
        }else{
            return(
                <View style={styles.container}>
                    <TouchableHighlight style={{height: 80, borderRadius: 40, backgroundColor: 'rgb(33,150,243)', justifyContent: 'center', alignItems: 'center'}} onPress={this.selectEmotion}>
                        <Image source={this.state.imgSource} style={{width: 75, height: 75, borderRadius:40}} />
                    </TouchableHighlight> 
                    <Text style={{textAlign: 'center', flexWrap: 'wrap'}}>{LanguageManager.getInstance().getText(this.state.imgName)}</Text>
                </View>                
            )
        }
    }


}


var styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:60,
    },
    outerCircle: {
      borderRadius: 40,
      width: 80,
      height: 80,
      backgroundColor: 'red',
    },
  });