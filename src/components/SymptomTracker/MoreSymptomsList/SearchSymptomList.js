import React from 'react';
import {View, Text, Alert,Dimensions, StyleSheet, Button} from 'react-native';
import TextInputSingleLine from '../../TextInputSingleLine';
import LanguageManager from '../../../manager/LanguageManager';
import HorizontalLine from '../../HorizontalLine';

export default class SearchSymptomList extends React.Component {

    constructor(props){
        super(props);
        this.searchEditedHandler = this.searchEditedHandler.bind(this);
        this.state = {
            searchString: ""
        }
    }

    searchEditedHandler = (name) =>{
        this.setState({
            searchString: name,
        });
    }

    search = () =>{
        Alert.alert("Search for: " + this.state.searchString)
    }

    render(){
        return(
            <View>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: 'center', width: Dimensions.get('window').width, height: 80}}>
                    <Text style={styles.TextStyle}>Suche: </Text>
                    <View style={{width:Dimensions.get('window').width-150, paddingBottom: 18}}>
                        <TextInputSingleLine ref={component => this._search = component} onTextChanged={this.searchEditedHandler}/>
                    </View>
                    <Button title={LanguageManager.getInstance().getText("SEARCH")} onPress={this.search}/>
                </View>       
            <HorizontalLine/>
            </View>

    )}
}

var styles = StyleSheet.create({
    TextStyle:{
       fontSize: 15,
       fontWeight: 'bold',
    }
   });