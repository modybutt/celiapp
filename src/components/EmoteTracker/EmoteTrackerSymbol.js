
import React from 'react';
import {View, StyleSheet, Alert, TouchableHighlight, Image} from 'react-native';

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
                    selected: false
                };
                break;
            case 2:
                this.state = {
                    imgSource: images.slightlyUnhappy.uri,
                    imgName: images.slightlyUnhappy.imgName,
                    selected: false
                };
                break;
            case 3:
                this.state = {
                    imgSource: images.neither.uri,
                    imgName: images.neither.imgName,
                    selected: false
                };
                break;
            case 4:
                this.state = {
                    imgSource: images.slightlyHappy.uri,
                    imgName: images.slightlyHappy.imgName,
                    selected: false
                };
                break;
            case 5:
                this.state = {
                    imgSource: images.happy.uri,
                    imgName: images.happy.imgName,
                    selected: false
                };
                break;
       }
    }

    //only select emotion, because deselection happens when another emote gets selected. --> needs to be handled in emotionGroup
    selectEmotion = () =>{
        if(!this.state.selected){
            this.setState({
                selected: true,
            });
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
        return(
                <View style={styles.container}>
                    <TouchableHighlight style={{height: 80, borderRadius: 40}} onPress={this.selectEmotion}>
                        <Image source={this.state.imgSource} style={{width: 80, height: 80, borderRadius:40}} />
                    </TouchableHighlight> 
                </View>                

        )
    }


}


var styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:60
    },
    outerCircle: {
      borderRadius: 40,
      width: 80,
      height: 80,
      backgroundColor: 'red',
    },
  });