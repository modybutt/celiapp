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

function shallowEqual(object1, object2) {
    if(object1==null ||  object2 == null) return false;
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
  
    return true;
  }


export default function EmotionDisplayIcon(props){
    var showimg = true;
    [symptom, setsymptom] = useState(null);

    DatabaseManager.getInstance().fetchEvents(null, (_, error) => {alert(error)}, (_, {rows: { _array }}) => {
    newSymptom=getNewestSymptomfromEvents(_array);
    if(!shallowEqual(newSymptom, symptom)){
        console.log(symptom)
        console.log(newSymptom)
        setsymptom(newSymptom)
        }
    });
    
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
                <Text style={styles.text}>Latest Symptom</Text>
            </View>
        )
    } else {
        return (
            <View style={props.style}></View>
        )
    }

}

const styles = StyleSheet.create({
  text: {
    paddingTop: 10,
    textAlign: 'center',
    lineHeight: 12,
    fontSize: 10,
  }
});