
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
        var newDate = new Date(this.props.date)
        if(next){
            newDate.setDate(newDate.getDate() + 1);
        }else{
            newDate.setDate(newDate.getDate() - 1);
        }
        
        newDate.setDate(newDate.getDate() + daysDiffToProp);
        var newDateString = new Date(newDate).getDate() + "." + (new Date(newDate).getMonth()+1) + "." + new Date(newDate).getFullYear()
        this.setState({currDateString: newDateString});
        this.props.onDateChanged(newDate);
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