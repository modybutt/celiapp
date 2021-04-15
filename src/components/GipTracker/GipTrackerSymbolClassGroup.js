
import React from 'react';
import { View, Text, Alert,StyleSheet } from 'react-native';
import ImageButton from '../ImageButton';

// constants
import {
    images
} from './GipTrackerClassConstants';

export default class GipTrackerSymbolClassGroup extends React.Component {

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
                    imgSource: images.gluten.uri,
                    imgSourceActive: images.gluten_active.uri,
                    imgName: images.gluten.imgName,
                };
            case 1:
                return {
                    imgSource: images.nogluten.uri,
                    imgSourceActive: images.nogluten_active.uri,
                    imgName: images.nogluten.imgName,
                };
            case 2:
                return {
                    imgSource: images.noidea.uri,
                    imgSourceActive: images.noidea_active.uri,
                    imgName: images.noidea.imgName,
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
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

});