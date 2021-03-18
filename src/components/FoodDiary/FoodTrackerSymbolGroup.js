
import React from 'react';
import { View, Text, Alert,StyleSheet } from 'react-native';
import ImageButton from '../ImageButton';

// constants
import {
    images
} from './FoodTrackerConstants';

export default class FoodTrackerSymbolGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedID: props.selectedID,
        }
    }

    selectedHandler = (id) => {
        this.setState({
            selectedID: id,
        });
        this.props.onChancedId(id);
    }

    getImage(id) {
        switch (id) {
            case 0:
                return {
                    imgSource: images.breakfast.uri,
                    imgSourceActive: images.breakfast_active.uri,
                    imgName: images.breakfast.imgName,
                };
            case 1:
                return {
                    imgSource: images.dinner.uri,
                    imgSourceActive: images.dinner_active.uri,
                    imgName: images.dinner.imgName,
                };
            case 2:
                return {
                    imgSource: images.icecream.uri,
                    imgSourceActive: images.icecream_active.uri,
                    imgName: images.icecream.imgName,
                };
            case 3:
                return {
                    imgSource: images.lunch.uri,
                    imgSourceActive: images.lunch_active.uri,
                    imgName: images.lunch.imgName,
                };
        }
    }

    render() {
            return (
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonSubContainer}>
                        <ImageButton displayText={true} color={this.props.color} id={0} image={this.getImage(0)} onPressed={this.selectedHandler} isActive={this.state.selectedID == 0} />
                        <ImageButton displayText={true} color={this.props.color} id={1} image={this.getImage(1)} onPressed={this.selectedHandler} isActive={this.state.selectedID == 1} />
                        <ImageButton displayText={true} color={this.props.color} id={2} image={this.getImage(2)} onPressed={this.selectedHandler} isActive={this.state.selectedID == 2} />
                        <ImageButton displayText={true} color={this.props.color} id={3} image={this.getImage(3)} onPressed={this.selectedHandler} isActive={this.state.selectedID == 3} />
                    </View>
                </View>
            );   
    }
}

var styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonSubContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

});