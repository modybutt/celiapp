import React from "react";

//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// TODO:
//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import CategoryShirt from "./WardrobeCategories/WardrobeCategoryShirt";
import WardrobeCategoryHairColor from "./WardrobeCategories/WardrobeCategoryHairColor";
import WardrobeCategoryEyeColor from "./WardrobeCategories/WardrobeCategoryEyeColor";
import WardrobeCategoryGlasses from "./WardrobeCategories/WardrobeCategoryGlasses";
import WardrobeCategoryHairstyle from "./WardrobeCategories/WardrobeCategoryHairstyle";
import WardrobeCategorySkinColor from "./WardrobeCategories/WardrobeCategorySkinColor";

import { observable, computed } from "mobx";



const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
  tabBarOptions={{
    scrollEnabled: true,
    tabStyle: { width: 'auto' },
  }}
    initialRouteName="Shirt"// if not defined: auto start at first element (e.g. shirt)
    activeColor="#fff"
  >
    <Tab.Screen
      name="Shirt"
      component={CategoryShirt}
      options={{
        tabBarLabel: "Shirt",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Hairstyle"
      component={WardrobeCategoryHairstyle}
      options={{
        tabBarLabel: "Hairstyle",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Glasses"
      component={WardrobeCategoryGlasses}
      options={{
        tabBarLabel: "Glasses",
        tabBarColor: "#1f65ff",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Skin color"
      component={WardrobeCategorySkinColor}
      options={{
        tabBarLabel: "Skin color",
        tabBarColor: "#694fad",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="HairColor1"
      component={WardrobeCategoryHairColor}
      options={{
        tabBarLabel: "Haircolor",
        tabBarColor: "#d02860",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />

<Tab.Screen
      name="EyeColor"
      component={WardrobeCategoryEyeColor}
      options={{
        tabBarLabel: "Eye color",
        tabBarColor: "#d02860",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#009387",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Overview",
      }}
    />
  </HomeStack.Navigator>
);

// replace above Stackscreen-component {component name} with this one to get a header for this component.
const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1f65ff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <DetailsStack.Screen
      name="Details"
      component={DetailsScreen}
      options={{}}
    />
  </DetailsStack.Navigator>
);
