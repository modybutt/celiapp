import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Icon} from 'expo';
import Colors from '../../constants/Colors';
import LanguageManager from '../../manager/LanguageManager';



export default class FoodDiaryImageEdit extends React.Component {

    state = {
        snapshot: null,
    }

    onPictureTaken(picture) {
        this.setState({snapshot: picture});

        if (this.props.onPictureTaken != null) {
            this.props.onPictureTaken(picture);
        }
    }

    render() {
        if (this.state.snapshot == null) {
            return (
                <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('Camera', {cb: (pic) => this.onPictureTaken(pic)})}>
                    <Icon.Ionicons name='md-camera' color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault} size={80} />
                </TouchableOpacity>  
            );
        }

        return ( 
            <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('Camera', {cb: (pic) => this.onPictureTaken(pic)})}>
                <Image source={Image.resolveAssetSource(this.state.snapshot)} style={styles.snapshot} />
            </TouchableOpacity>   
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    snapshot: {
        borderWidth: 1,
        width: 150,
        height: 100,
    }
});