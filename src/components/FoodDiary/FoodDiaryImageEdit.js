import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Icon} from 'expo';
import Colors from '../../constants/Colors';
import LanguageManager from '../../manager/LanguageManager';



export default class FoodDiaryImageEdit extends React.Component {

    state = {
        active: this.props.active == null ? true : this.props.active,
        snapshot: this.props.snapshot == null ? null : this.props.snapshot,
    }

    onPictureTaken(picture) {
        this.setState({snapshot: picture});

        if (this.props.onPictureTaken != null) {
            this.props.onPictureTaken(picture);
        }
    }

    render() {
        if (this.active == null || this.active == true) {
            if (this.state.snapshot == null) {
                return (
                    <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('Camera', {cb: (pic) => this.onPictureTaken(pic)})}>
                        <Icon.Ionicons name='md-camera' color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault} size={80} />
                    </TouchableOpacity>  
                );
            }

            return ( 
                <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('Camera', {cb: (pic) => this.onPictureTaken(pic)})}>
                    <Image source={Image.resolveAssetSource(this.state.snapshot)} style={styles[this.props.size] == null ? styles.small : styles[this.props.size]} />
                </TouchableOpacity>   
            );
        } else {
            if (this.state.snapshot == null) {
                return <Icon.Ionicons name='md-camera' color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault} size={80} />
            }

            return <Image source={Image.resolveAssetSource(this.state.snapshot)} style={styles[this.props.size] == null ? styles.small : styles[this.props.size]} />
        }
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    small: {
        borderWidth: 1,
        width: 150,
        height: 100,
    },
    medium: {
        borderWidth: 1,
        width: 250,
        height: 200,
    }
});