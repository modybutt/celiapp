import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import {
    images
} from './EmoteTracker/EmoteTrackerConstants';

export default function EmotionDisplayIcon(props){
    var emotionimage;
    var showimg = true;
    switch(props.emotionID){
        case 0:
            showimg = false;
            break;
        case 1:
            emotionimage = images.unhappy;
            break;
        case 2:
            emotionimage = images.slightlyUnhappy;
            break;
        case 3:
            emotionimage = images.neither;
            break;
        case 4:
            emotionimage = images.slightlyHappy;
            break;
        case 5:
            emotionimage = images.happy;
            break;
    }
    if(showimg){
        return(
            <View>
                <Image
                    source={emotionimage}
                    style={{
                        resizeMode: "center",
                    }}
                />
            </View>
        )
    } else {
        return(<View></View>);
    }

}
