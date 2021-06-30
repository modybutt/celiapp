import React from "react";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { withNavigation } from "react-navigation";
import WardrobeCategoryShirt from "../WardrobeCategories/WardrobeCategoryShirt";
import WardrobeCategoryHairColor from "../WardrobeCategories/WardrobeCategoryHairColor";
import WardrobeCategoryGlasses from "../WardrobeCategories/WardrobeCategoryGlasses";
import WardrobeCategoryHairstyle from "../WardrobeCategories/WardrobeCategoryHairstyle";
import WardrobeCategorySkinColor from "../WardrobeCategories/WardrobeCategorySkinColor";
import Colors from "../../../../../constants/Colors";

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
      activeTintColor: Colors.textOnMainScreenColor,
      inactiveTintColor: Colors.tabIconDefault,
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: Colors.mainscreenColor,
      },
      indicatorStyle: {
        backgroundColor: Colors.textOnMainScreenColor,
      }
    },
    lazy: false,
  }
);

export default /*withNavigation*/(AppNavigator);
