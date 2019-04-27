
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
            Alert.alert(daysDiffToProp.toString);
            this.setState({currDateString: "next"});
        }else{
            daysDiffToProp--;
            Alert.alert(daysDiffToProp.toString);
            this.setState({currDateString: "vorheriger"});
        }
    }


    render(){
        return(
            <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly',
                alignItems:'stretch'
                }}>
                <View>
                    <Button title = "  <  " style={styles.arrowButton} onPress={() => this.changeDay(false)}/>
                </View>
                <View>
                    <Text style ={styles.dateText}> {this.state.currDateString} </Text>
                </View>
                <View>      
                    <Button title = "  >  " style={styles.arrowButton} onPress={() => this.changeDay(true)}/>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    arrowButton: {
        fontSize: 30,
        color: 'white',
      },
    dateText:{
        fontSize: 20,
    }
});