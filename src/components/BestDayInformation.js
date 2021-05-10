import React from 'react';
import {StyleSheet, Alert, View, Text, Modal, Pressable ,TouchableOpacity, TouchableWithoutFeedback , Dimensions} from 'react-native';


export default class BestDayInformation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("show info")
        return (
            <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={() => {Alert.alert("Modal has been closed.");}}
            >
                <Pressable style={[styles.fullscreenContainer]}  onPress={()=> {console.log("onPress");this.props.touchHandler()}} onPressIn={()=> {console.log("onPressIn");this.props.touchHandler()}}>

                    <View style={[styles.subContainer] } >
                        <Text style={styles.text}
                              onLayout={event => {
                                  const layout = event.nativeEvent.layout;
                                  console.log("layouttxt:", layout)}}>
                            Your BEST DAY is calculated by adding your entries times what you have entered in each entry.
                        </Text>
                        <Text style={styles.text}>
                            For symptoms: 1, 2, 3 points for mild, moderate, severe  respectively and 5 for no symptom
                        </Text>
                        <Text style={styles.text}>
                            Food: & GIP: 3 points for no gluten, 1 point no idea, 0 points for Gluten.
                        </Text>
                        <Text style={styles.text}>
                            Energy: 1 to 5 with 1 for low energy emoiji and 5 high energy level emoiji
                        </Text>
                    </View>

                </Pressable>

            </Modal>
        );


    }
}

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    fullscreenContainer: {
        //position: 'absolute',
        width: WIDTH,
        height: HEIGHT,
        top:0,
        backgroundColor: 'rgba(100,100,100,0.5)',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 200,
    },
    subContainer: {
        width: '80%',
        padding: 10,
        bottom: 0,
        left:0,
        right:0,
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderRadius: 20,
        zIndex: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: '#FFF',
        paddingTop: 5,
        paddingBottom: 5,
        zIndex: 150,
    },



});