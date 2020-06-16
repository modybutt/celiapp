import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreenNavButton from "./screens/HomeScreenNavButton";
// TODO:
//import { NavigationContainer } from "@react-navigation/native";
//import { createStackNavigator } from "@react-navigation/stack";
import Challenges from "./screens/Challenges";
import Achievements from "./screens/Achievements";
import Wardrobe from "./screens/Wardrobe";
import ChallengesTest from "./screens/ChallengesTest";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HomeScreenNavButton navigation={navigation}></HomeScreenNavButton>
      <Text>Glutenbuddy v0.1 {"\n"}</Text>
      <Text>By</Text>
      <Text>Lukas Prutsch </Text>
      <Text> and </Text>
      <Text>Lisa Brandstätter </Text>
    </View>
  );
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
