
import React from 'react';
import {View, Text, Alert} from 'react-native';
import EmoteTrackerSymbol from './EmoteTrackerSymbol';

export default class EmoteTrackerSymbolGroup extends React.Component{

    constructor(props) {
       super(props);
       this.emoteSelectedHandler = this.emoteSelectedHandler.bind(this);
       this.state = {
           bla: true,
           selectedSymbolID: 0,
       } 
    }


    emoteSelectedHandler(emotionID){
        
        //shouldComponentUpdate = true
        
        this.setState({
            selectedSymbolID: emotionID,
        });

        this.setState({
            selectedSymbolID: emotionID,
        });


        this._emote1.setSelected(emotionID == 1)
        this._emote2.setSelected(emotionID == 2)
        this._emote3.setSelected(emotionID == 3)     
        this._emote4.setSelected(emotionID == 4)
        this._emote5.setSelected(emotionID == 5)

        this.props.onEmotionChanged(emotionID)

        //this.forceUpdate()
    }


    render(){
        //Alert.alert("re-rendered")
        return(
            <View style={{
                height:60,
                flexDirection: 'row',
                justifyContent: 'space-around',
                //alignItems: 'center',
                marginBottom: 140
            }}>           
                <EmoteTrackerSymbol ref={component => this._emote1 = component} emoteID = {1} onEmoteSelected = {this.emoteSelectedHandler} selected = {this.state.selectedSymbolID}/>
                <EmoteTrackerSymbol ref={component => this._emote2 = component} emoteID = {2} onEmoteSelected = {this.emoteSelectedHandler} selected = {this.state.selectedSymbolID}/>
                <EmoteTrackerSymbol ref={component => this._emote3 = component} emoteID = {3} onEmoteSelected = {this.emoteSelectedHandler} selected = {3}/>
                <EmoteTrackerSymbol ref={component => this._emote4 = component} emoteID = {4} onEmoteSelected = {this.emoteSelectedHandler} selected = {this.state.selectedSymbolID}/> 
                <EmoteTrackerSymbol ref={component => this._emote5 = component} emoteID = {5} onEmoteSelected = {this.emoteSelectedHandler} selected = {this.state.selectedSymbolID}/>
            </View>
        )
    }


}