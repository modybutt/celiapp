
import React from 'react';
import { View, Text, Alert,StyleSheet } from 'react-native';
import ImageButton from '../ImageButton';

// constants
import {
    images
} from './EmoteTrackerConstants';

export default class EmoteTrackerSymbolGroup extends React.Component {

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
            case 1:
                return {
                    imgSource: images.unhappy.uri,
                    imgSourceActive: images.unhappy_active.uri,
                    imgName: images.unhappy.imgName,
                };
            case 2:
                return {
                    imgSource: images.slightlyUnhappy.uri,
                    imgSourceActive: images.slightlyUnhappy_active.uri,
                    imgName: images.slightlyUnhappy.imgName,
                };
            case 3:
                return {
                    imgSource: images.neither.uri,
                    imgSourceActive: images.neither_active.uri,
                    imgName: images.neither.imgName,
                };
            case 4:
                return {
                    imgSource: images.slightlyHappy.uri,
                    imgSourceActive: images.slightlyHappy_active.uri,
                    imgName: images.slightlyHappy.imgName,
                };
            case 5:
                return {
                    imgSource: images.happy.uri,
                    imgSourceActive: images.happy_active.uri,
                    imgName: images.happy.imgName,
                };

        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.selectedID !== this.props.selectedID){
            this.setState({
                selectedID: this.props.selectedID
            });
        }
    }

    render() {
            return (
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonSubContainer}>
                        <ImageButton displayText={false} color={this.props.color} id={1} image={this.getImage(1)} onPressed={this.selectedHandler} isActive={this.state.selectedID == 1} />
                        <ImageButton displayText={false} color={this.props.color} id={2} image={this.getImage(2)} onPressed={this.selectedHandler} isActive={this.state.selectedID == 2} />
                        <ImageButton displayText={false} color={this.props.color} id={3} image={this.getImage(3)} onPressed={this.selectedHandler} isActive={this.state.selectedID == 3} />
                        <ImageButton displayText={false} color={this.props.color} id={4} image={this.getImage(4)} onPressed={this.selectedHandler} isActive={this.state.selectedID == 4} />
                        <ImageButton displayText={false} color={this.props.color} id={5} image={this.getImage(5)} onPressed={this.selectedHandler} isActive={this.state.selectedID == 5} />
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