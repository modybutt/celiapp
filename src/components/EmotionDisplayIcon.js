import React, { useState } from "react";
import DatabaseManager from "../manager/DatabaseManager";
import Events from "../constants/Events";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

function getNewestSymptomfromEvents(array){
    var onlysymptoms = array.filter(event => event.eventType == Events.Symptom);
    if(onlysymptoms.length == 0){
        return null;
    } else {
        return JSON.parse(onlysymptoms[0].objData)
    }
}

export default function EmotionDisplayIcon(props){
    var showimg = true;
    [symptom, setsymptom] = useState(null);
    DatabaseManager.getInstance().fetchEvents(null, (_, error) => {alert(error)}, (_, {rows: { _array }}) => {setsymptom(getNewestSymptomfromEvents(_array))});
    if(symptom === null){
        showimg = false;
    }
    if(showimg){
        return(
            <View style={props.style}>
                <Image
                    source={Image.resolveAssetSource(symptom.icon)}
                    style={{
                        resizeMode: "center",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </View>
        )
    } else {
        return (
            <View style={props.style}></View>
        )
    }

}
