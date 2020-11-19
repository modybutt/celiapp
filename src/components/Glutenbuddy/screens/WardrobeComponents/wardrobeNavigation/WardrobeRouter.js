import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withNavigation } from "react-navigation";
import WardrobeCategoryShirt from "../WardrobeCategories/WardrobeCategoryShirt";
import WardrobeCategoryHairColor from "../WardrobeCategories/WardrobeCategoryHairColor";
import WardrobeCategoryGlasses from "../WardrobeCategories/WardrobeCategoryGlasses";
import WardrobeCategoryHairstyle from "../WardrobeCategories/WardrobeCategoryHairstyle";
import WardrobeCategorySkinColor from "../WardrobeCategories/WardrobeCategorySkinColor";

const AppNavigator = createMaterialTopTabNavigator(
  {
    CategoryShirt: WardrobeCategoryShirt,
    CategoryHairColor: WardrobeCategoryHairColor,
    //CategoryEyeColor: WardrobeCategoryEyeColor,
    CategoryGlasses: WardrobeCategoryGlasses,
    CategoryHairstyle: WardrobeCategoryHairstyle,
    CategorySkinColor: WardrobeCategorySkinColor
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "tomato",
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: "#4295f5",
      },
    },
    lazy: false,
  }
);

export default /*withNavigation*/(AppNavigator);
