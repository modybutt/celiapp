import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'expo';


export default class FoodDiaryRatingBar extends React.Component {
    
    state = {
        rating: this.props.rating == null ? 0 : this.props.rating,
        active: this.props.active == null ? true : this.props.active,
    }

    changeRating(rating) {
        this.setState({rating});

        if (this.props.onRatingChanged != null) {
            this.props.onRatingChanged(rating);
        }
    }

    iconName(index) {
        if (index <= this.state.rating) {
            return "md-star";
        } else if (index - 0.55 <= this.state.rating) {
            return "md-star-half";
        } else {
            return "md-star-outline";
        }
    }

    render() {
        if (this.state.active == true) {
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.changeRating(1)}>
                        <Icon.Ionicons name={this.iconName(1)} size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeRating(2)}>
                        <Icon.Ionicons name={this.iconName(2)} size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeRating(3)}>
                        <Icon.Ionicons name={this.iconName(3)} size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeRating(4)}>
                        <Icon.Ionicons name={this.iconName(4)} size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeRating(5)}>
                        <Icon.Ionicons name={this.iconName(5)} size={50} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Icon.Ionicons name={this.iconName(1)} size={50} />
                    <Icon.Ionicons name={this.iconName(2)} size={50} />
                    <Icon.Ionicons name={this.iconName(3)} size={50} />
                    <Icon.Ionicons name={this.iconName(4)} size={50} />
                    <Icon.Ionicons name={this.iconName(5)} size={50} />
                </View>
            );
        }
    }  
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});