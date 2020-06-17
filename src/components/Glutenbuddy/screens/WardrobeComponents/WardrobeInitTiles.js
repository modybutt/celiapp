import React, { useState, useEffect } from "react";
import { View, ImageBackground } from "react-native";
import { Container, ContainerScrollView } from "./WardrobeInitTilesStyles";
import OneCategory from "./OneCategory";
import WardrobeItemsToDisplay from "../../../../config/wardrobeItems";

const WardrobeMain = ({ category }) => {
  const [slides, setSlides] = useState([]);

  const onFetchSlides = async () => {
    let response = await WardrobeItemsToDisplay.fetchSlide(category);
    setSlides(response);
  };

  useEffect(() => {
    //onFetchLevel();
    onFetchSlides();
  }, []);
  return (
    <View>
      <Container>
     {/*} <ImageBackground source={require('./../../assets/wardrobeBackground.png')} style={{}}>*/}
        <ContainerScrollView>
        
          {slides && category &&
            slides.map((slide, index) => (
              <OneCategory
                key={index}
                categoryIndex={category}
                slide={slide}
                horizontalContainerIndex={index}
              />
            ))}
        </ContainerScrollView>  
       {/**  </ImageBackground> */}
      </Container>
    </View>
  );
  
};
export default WardrobeMain;
