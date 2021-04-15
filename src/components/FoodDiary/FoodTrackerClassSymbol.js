
import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight, Alert, Image} from 'react-native';
import LanguageManager from '../../manager/LanguageManager';

// constants
import {
    images
} from './FoodTrackerClassConstants';

//deprecated
export default class FoodTrackerClassSymbol extends React.Component{

    constructor(props) {
       super(props);
       switch(this.props.classID){ 
            case 0:
                this.state = {
                    imgSource: images.gluten.uri,
                    imgName: images.gluten.imgName,
                    selected: this.props.selected === 1,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
            case 1:
                this.state = {
                    imgSource: images.nogluten.uri,
                    imgName: images.nogluten.imgName,
                    selected: this.props.selected === 2,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
            case 2:
                this.state = {
                    imgSource: images.noidea.uri,
                    imgName: images.noidea.imgName,
                    selected: this.props.selected === 3,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
       }
    }


    setSelected(isSelected){
        this.setState({selected: isSelected})
    }

    selectClass = () =>{
        if(!this.state.selected){
            this.props.onClassSelected(this.props.classID)
        }
    }

    render(){
        if (this.props.active == null || this.props.active == true) {
            if(!this.state.selected){
                return(
                    <View style={styles.container}>
                        <TouchableHighlight style={{borderRadius: 3, backgroundColor: 'rgb(255,255,255)', justifyContent: 'center', alignItems: 'center'}} onPress={this.selectClass}>
                            <Image source={this.state.imgSource} style={styles.small} />
                        </TouchableHighlight> 
                    </View>                
                )
            }else{
                return(
                    <View style={styles.container}>
                        <TouchableHighlight style={{borderRadius: 3, backgroundColor: 'rgb(33,150,243)', justifyContent: 'center', alignItems: 'center'}} onPress={this.selectClass}>
                            <Image source={this.state.imgSource} style={styles.small} />
                        </TouchableHighlight> 
                    </View>                
                )
            }
        } else {
            if(!this.state.selected){
                return(
                    <View style={styles.containerInactive}>
                        <Image source={this.state.imgSource} style={styles[this.props.size] == null ? styles.small : styles[this.props.size]} />
                    </View>                
                )
            }else{
                return(
                    <View style={styles.containerInactive}>
                        <Image source={this.state.imgSource} style={styles[this.props.size] == null ? styles.small : styles[this.props.size]} />
                    </View>                
                )
            }
        }
    }
}

//<Text style={{textAlign: 'center', flexWrap: 'wrap'}}>{LanguageManager.getInstance().getText(this.state.imgName)}</Text>

var styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 5,
      paddingRight: 5,
      aspectRatio: 1,
    },
    containerInactive: {
        flex: 1,
        aspectRatio: 1,
    },
    small: {
        backgroundColor: 'rgb(255,255,255)',
        width: '80%',
        height: '80%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    big: {
        width: '80%',
        height: '80%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
  });