import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import HomeScreenNavButton from "./screens/HomeScreenNavButton";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Challenges from "./screens/Challenges";
import Achievements from "./screens/Achievements";
import Wardrobe from "./screens/Wardrobe";
import ChallengesTest from "./screens/ChallengesTest";

import { Avatar } from "./avataaars-lib/react-native-avataaars";
import { observer } from "mobx-react";
import store from "./manager/GlutenBuddyStore";
import emotionStore from "./manager/EmotionStore";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Stack = createStackNavigator();

tickle = 0;

@observer
class HomeScreen extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <HomeScreenNavButton navigation={navigation}></HomeScreenNavButton>
        <TouchableOpacity onPress={() => this.onAvatarClick()}>
          <Avatar
            size={store.size}
            avatarStyle="Transparent"
            topType={store.topType}
            hairColor={store.hairColor}
            facialHairType={store.facialHairType}
            clotheType={store.clotheType}
            clotheColor={store.clotheColor}
            skinColor={store.skinColor}
            accessoriesType={emotionStore.accessoriesTypeEmotion}
            eyeType={emotionStore.eyeType}
            eyebrowType={emotionStore.eyebrowType}
            mouthType={emotionStore.mouthType}
          />
        </TouchableOpacity>
        <Text>Glutenbuddy v0.1 {"\n"}</Text>
        <Text>By</Text>
        <Text>Lukas Prutsch </Text>
        <Text> and </Text>
        <Text>Lisa Brandstätter </Text>
      </View>
    );
  }
  onAvatarClick() {
    if (tickle % 5 == 0) {
      emotionStore.setSuperHappy();
    } else if (tickle % 5 == 1) {
      emotionStore.setHappy();
    } else if (tickle % 5 == 2) {
      emotionStore.setNeutral();
    } else if (tickle % 5 == 3) {
      emotionStore.setSad();
    } else if (tickle % 5 == 4) {
      emotionStore.setSuperSad();
    }
    // for more options visit https://getavataaars.com/
    tickle++;
  }
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Challenges" component={Challenges} />
        <Stack.Screen name="Achievements" component={Achievements} />
        <Stack.Screen name="Wardrobe" component={Wardrobe} />
        <Stack.Screen name="ChallengesTest" component={ChallengesTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
