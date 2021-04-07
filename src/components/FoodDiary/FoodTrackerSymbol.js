
import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight, Alert, Image} from 'react-native';
import LanguageManager from '../../manager/LanguageManager';

// constants
import {
    images
} from './FoodTrackerConstants';

//deprecated
export default class FoodTrackerSymbol extends React.Component{

    constructor(props) {
       super(props);
       switch(this.props.foodID){ 
            case 0:
                this.state = {
                    imgSource: images.breakfast.uri,
                    imgName: images.breakfast.imgName,
                    selected: this.props.selected === 1,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
            case 1:
                this.state = {
                    imgSource: images.dinner.uri,
                    imgName: images.dinner.imgName,
                    selected: this.props.selected === 2,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
            case 2:
                this.state = {
                    imgSource: images.icecream.uri,
                    imgName: images.icecream.imgName,
                    selected: this.props.selected === 3,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
            case 3:
                this.state = {
                    imgSource: images.lunch.uri,
                    imgName: images.lunch.imgName,
                    selected: this.props.selected === 4,
                    selectedColor: 'rgb(180, 180, 180)',
                };
                break;
       }
    }


    setSelected(isSelected){
        this.setState({selected: isSelected})
    }

    //only select food, because deselection happens when another food gets selected. --> needs to be handled in foodGroup
    selectFood = () =>{
        if(!this.state.selected){
            this.props.onFoodSelected(this.props.foodID)
        }
    }

    render(){
        if (this.props.active == null || this.props.active == true) {
            if(!this.state.selected){
                return(
                    <View style={styles.container}>
                        <TouchableHighlight style={{borderRadius: 3, backgroundColor: 'rgb(255,255,255)', justifyContent: 'center', alignItems: 'center'}} onPress={this.selectFood}>
                            <Image source={this.state.imgSource} style={styles.small} />
                        </TouchableHighlight> 
                    </View>                
                )
            }else{
                return(
                    <View style={styles.container}>
                        <TouchableHighlight style={{borderRadius: 3, backgroundColor: 'rgb(33,150,243)', justifyContent: 'center', alignItems: 'center'}} onPress={this.selectFood}>
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