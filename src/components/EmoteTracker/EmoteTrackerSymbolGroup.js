
import React from 'react';
import {View, Text, Alert} from 'react-native';
import EmoteTrackerSymbol from './EmoteTrackerSymbol';

export default class EmoteTrackerSymbolGroup extends React.Component{

    constructor(props) {
       super(props);
       this.emoteSelectedHandler = this.emoteSelectedHandler.bind(this);
       this.state = {
           bla: true,
           selectedSymbolID: 0
       } 
    }


    emoteSelectedHandler(emotionID){
        this.setState({
            selectedSymbolID: emotionID,
        });
        this.props.onEmotionChanged(emotionID)
    }


    render(){
        return(
            <View style={{
                height:100,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 25,
            }}>
                <EmoteTrackerSymbol emoteID = {1} onEmoteSelected = {this.emoteSelectedHandler}/>
                <EmoteTrackerSymbol emoteID = {2} onEmoteSelected = {this.emoteSelectedHandler}/>
                <EmoteTrackerSymbol emoteID = {3} onEmoteSelected = {this.emoteSelectedHandler}/>
                <EmoteTrackerSymbol emoteID = {4} onEmoteSelected = {this.emoteSelectedHandler}/> 
                <EmoteTrackerSymbol emoteID = {5} onEmoteSelected = {this.emoteSelectedHandler}/>
            </View>
        )
    }


}
