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

    changeRating(rating) {
        this.setState({rating});

        if (this.props.onRatingChanged != null) {
            this.props.onRatingChanged(rating);
        }
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
                <TouchableOpacity onPress={() => this.changeRating(1)} style={styles.star}>
                    <Icon.Ionicons name={this.iconName(1)} size={50} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeRating(2)} style={styles.star}>
                    <Icon.Ionicons name={this.iconName(2)} size={50} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeRating(3)} style={styles.star}>
                    <Icon.Ionicons name={this.iconName(3)} size={50} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeRating(4)} style={styles.star}>
                    <Icon.Ionicons name={this.iconName(4)} size={50} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeRating(5)} style={styles.star}>
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