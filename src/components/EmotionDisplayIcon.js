import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

const images = {
	unhappy: {
		imgName: "UNHAPPY", 
		uri: require('../assets/images/EmoteTracker/unhappy.png')
	},
	slightlyUnhappy: {
		imgName: "SLIGHTLY_UNHAPPY", 
		uri: require('../assets/images/EmoteTracker/slightlyUnhappy.png')
	},
	neither: {
		imgName: "NEITHER",
		uri: require('../assets/images/EmoteTracker/neither.png')
	},
	slightlyHappy: {
		imgName: "SLIGHTLY_HAPPY", 
		uri: require('../assets/images/EmoteTracker/slightlyHappy.png')
	},
	happy: {
		imgName:"HAPPY", 
		uri: require('../assets/images/EmoteTracker/happy.png')	
	},
}

export default function EmotionDisplayIcon(props){
    var emotionimage;
    var showimg = true;
    switch(props.emotionID){
        default:
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
            <View style={props.style}>
                <Image
                    source={emotionimage.uri}
                    style={{
                        resizeMode: "center",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </View>
        )
    } else {
        return(<View style={props.style}>
                
            <Image source={images.happy.uri}                     style={{
                        resizeMode: "center",
                        height: "100%",
                        width: "100%",
                    }}></Image>
        </View>);
    }

}
