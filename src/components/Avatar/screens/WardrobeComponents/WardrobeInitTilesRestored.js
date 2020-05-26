import React, { useState, useEffect } from "react";
import { View, ImageBackground } from "react-native";
import { Container, ContainerScrollView } from "./WardrobeInitTilesStyles";
import OneCategory from "./OneCategoryContainer/OneCategory";
import WardrobeItemsToDisplay from "../../services/wardrobeItems";
import AchievementManager from "./../../manager/AchievementManager";
import {observer} from 'mobx-react';
import store from "./../../store";

const WardrobeMain = ({ category }) => {
  const [slides, setSlides] = useState([]);
  const [dbLevel, setLevel] = useState();

  const onFetchSlides = async () => {
    let response = await WardrobeItemsToDisplay.fetchSlide(category);
    console.log("fucking response", response)
    setSlides(response);
  };

  const onFetchLevel = async () => {
    let lvl = await AchievementManager.getCurrentLevel();
    //console.log(lvl);
    store.setLevel(lvl);
    console.log("set level called in inittiles", lvl)
    //setLevel(lvl);
  }

  useEffect(() => {
    onFetchLevel();
    onFetchSlides();
  }, []);
  return (
    <View>
      <Container>
     {/*} <ImageBackground source={require('./../../assets/wardrobeBackground.png')} style={{}}>*/}
        <ContainerScrollView>
        
          {slides && dbLevel && category &&
            slides.map((slide, index) => (
              <OneCategory
                key={index}
                categoryIndex={category}
                slide={slide}
                horizontalContainerIndex={index}
                dbLevel={dbLevel}
              />
            ))}
        </ContainerScrollView>  
       {/**  </ImageBackground> */}
      </Container>
    </View>
  );
  
};
export default WardrobeMain;
