import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'expo';


export default class RatingBar extends React.Component {
    
    state = {
        rating: 0,
    }

    onRatingChanged(rating) {
        if (this.props.onRatingChanged != null) {
            this.props.onRatingChanged(rating);
        }

        this.setState({rating});
    }

    iconName(index) {
        if (index > this.state.rating) {
            return "md-star-outline";
        } else {
            return "md-star";
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.onRatingChanged(1)} style={styles.star}>
                    <Icon.Ionicons name={this.iconName(1)} size={50} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onRatingChanged(2)} style={styles.star}>
                    <Icon.Ionicons name={this.iconName(2)} size={50} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onRatingChanged(3)} style={styles.star}>
                    <Icon.Ionicons name={this.iconName(3)} size={50} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onRatingChanged(4)} style={styles.star}>
                    <Icon.Ionicons name={this.iconName(4)} size={50} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onRatingChanged(5)} style={styles.star}>
                    <Icon.Ionicons name={this.iconName(5)} size={50} />
                </TouchableOpacity>
            </View>
        );
    }  
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});