
import React from 'react';
import { Text, View, StyleSheet, } from 'react-native';


export default class DayConclusion extends React.Component {


    render() {


        return (
            <View style={styles.container}>
                <Text>
                    Day Conclusion
                </Text>
                <Text>
                    you ate a snack named Name at Time , you had No Idea whether it contained Gluten.
                </Text>
                <Text>
                    you registered  a mild headache  at Time
                </Text>
                <Text>
                    you ate a lunch named Tomatosoup and cheese cracker at Time , you think it containted No Gluten . You noted: “asked the cook specifically whether the soup contained Gluten”
                </Text>
                <Text>
                    you registered a  good energy level  at Time and noted: “ I am feeling good but I am not sure whether that is because of the food that I ate”
                </Text>

            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        display: 'flex',
    }

});