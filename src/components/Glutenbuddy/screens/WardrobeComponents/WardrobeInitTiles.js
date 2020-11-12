import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import OneCategory from "./OneCategory";
import CeliLogger from '../../../../analytics/analyticsManager';


const WardrobeMain = ({ category }) => {
  const [slides, setSlides] = useState([]);

  const onFetchSlides = async () => {
    let response = fetchAvatarJson(category);
    setSlides(response);
  };

  const fetchAvatarJson = () => {
    switch (category) {
      case 1:
        return require("../../../../config/avatarCategoryItems/categoryShirt.json");
      case 2:
        return require("../../../../config/avatarCategoryItems/categoryHaircut.json");
      case 3:
        return require("../../../../config/avatarCategoryItems/categoryGlasses.json");
      case 4:
        return require("../../../../config/avatarCategoryItems/categorySkinColor.json");
      case 5:
        return require("../../../../config/avatarCategoryItems/categoryHairColor.json");
      default:
        console.error("WardrobeInitTiles.js: Index not Valid!");
    }
  };

  useEffect(() => {
    onFetchSlides();
  }, []);
  return (
    <View>
      <Container>
        <ContainerScrollView>
          {slides &&
            category &&
            slides.map((slide, index) => (
              <OneCategory
                key={index}
                categoryIndex={category}
                slide={slide}
                horizontalContainerIndex={index}
              />
            ))}
        </ContainerScrollView>
      </Container>
    </View>
  );
};
export default WardrobeMain;

// actual backgroundColor below tabbar
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f2f2f2;
`;

export const ContainerScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;
