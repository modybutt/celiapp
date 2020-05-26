import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import Background from "../assets/images/wiesecut.png";
import Gluton from "../components/Gluton";
import MenuButton from '../components/MenuButton';
import PopUpMenu from '../components/PopUpMenu';
import LanguageManager from '../manager/LanguageManager';
import CircleDisplayFull from '../components/CircleDisplayFull';
import Avatar from '../components/Avatar/App'



export default class HomeScreen extends React.Component {
  onPopupEvent(eventName, index) {
    if (eventName !== 'itemSelected') {
      return;
    }

    switch (index) {
      case 0: this.props.navigation.navigate('Settings'); break;
      // case 1: this.props.navigation.navigate('Camera'); break;
      case 1: this.props.navigation.navigate('Gear'); break;
      default: this.props.navigation.navigate('Debug'); break;
    }
  }
  
  render() {
    return (
      <View style={styles.background}>
        <CircleDisplayFull 
                progBarX={75}
                progBarY={130}
                progBarBorderWidth={35}
                progBarBigRadius={130}
                progBarSmallRadius={12}
                NoInputColour={'grey'} 
                GlutenColour={'red'} 
                NoGlutenColour={'green'} 
                SymptomOnlyColour={'blue'} 
                FinishedBackGroundColour={'#3399FF'}
                UnfinishedBackGroundColour={'#999'}
                InsideCircleBGColour={'#fff'}
        /> 
        {/* Avatar here!*/ }
        <Text>Here we go!</Text>
        <Avatar></Avatar>
         <MenuButton navigation={this.props.navigation}/>
      </View>
	  );
  }  
}

const styles = StyleSheet.create({
  background: {
    width: '100%', 
    height: '100%',
  },
  popup: {
    position: 'absolute',
    right: 40,
    top: 40,
  },
  gluton: {
    //position: 'absolute',
    top: '25%',
    //left: '25%',
    width: '100%',
    alignItems: 'center'
  },
});

