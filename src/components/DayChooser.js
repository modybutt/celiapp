
import React from 'react';
import {Text, View, Button, StyleSheet, Alert} from 'react-native';

var daysDiffToProp = 0

export default class DayChooser extends React.Component{



    constructor(props){
        super(props);
        this.state = {
            currDate: this.props.date,
            currDateString: new Date(this.props.date).getDate() + "." + (new Date(this.props.date).getMonth()+1) + "." + new Date(this.props.date).getFullYear()
        }
    }

    changeDay(next){
        if(next){
            daysDiffToProp++;
        }else{
            daysDiffToProp--;
        }
        var newDate = new Date(this.props.date)
        newDate.setDate(newDate.getDate() + daysDiffToProp);
        var newDateString = new Date(newDate).getDate() + "." + (new Date(newDate).getMonth()+1) + "." + new Date(newDate).getFullYear()
        this.setState({currDateString: newDateString});
    }


    render(){
        return(
            <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly',
                alignItems:'stretch'
                }}>
                <View>
                    <Button buttonStyle={styles.button} title = "  <  "  onPress={() => this.changeDay(false)}/>
                </View>
                <View>
                    <Text style ={styles.dateText}> {this.state.currDateString} </Text>
                </View>
                <View>      
                    <Button buttonStyle={styles.button} title = "  >  " onPress={() => this.changeDay(true)}/>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    dateText:{
        fontSize: 20,
    },
    button: {
        fontSize: 30,
        backgroundColor: '#00aeef',
        borderColor: 'red',
        borderWidth: 5,
        borderRadius: 15       
     }
});