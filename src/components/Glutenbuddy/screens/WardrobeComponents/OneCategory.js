import React, { Component } from "react";
import {
  TouchableOpacity,
  Alert,
  ImageBackground,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Piece } from "../../avataaars-lib/react-native-avataaars/dist";
import styled from "styled-components/native";
import { observer } from "mobx-react";
import store from "../../../../manager/buddyManager/GlutenBuddyStore";
import { showMessage, hideMessage } from "react-native-flash-message";
import CeliLogger from "../../../../analytics/analyticsManager";
import Interactions from '../../../../constants/Interactions';
import Colors from '../../../../constants/Colors'


var selectedCategory = "SelectedCategory";

class OneLevel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { categoryIndex, slide } = this.props;
    return (
      <OneLevelStyles>
        <Title>{slide.title}</Title>
        <SlideScroll>
          {slide.items &&
            slide.section &&
            slide.items.map((item, index) => (
              <OneItem
                key={index}
                item={item}
                categoryIndex={categoryIndex}
                slide={slide}
                section={slide.section}
                sectionId={slide.sectionId}
              />
            ))}
        </SlideScroll>
      </OneLevelStyles>
    );
  }
}

export default OneLevel;

//OneItem
@observer
class OneItem extends Component {
  constructor(props) {
    super(props);
    this.onItemSelected = this.onItemSelected.bind({});
  }

  render() {
    const { item, section, sectionId, categoryIndex, slide } = this.props;
    const unlocked = store.currentLevel >= slide.minLevel;
    const selected = this.getActiveItem(categoryIndex) === item.id;
    return (
      <View>
        <TouchableOpacity
          style={
            unlocked && selected
              ? styles.oneItemContainerSelected
              : unlocked
              ? styles.oneItemContainerUnlocked
              : styles.oneItemContainerLocked
          }
          onPress={() => {
            var allowed = this.onItemSelected({
              self: this,
              id: item.id,
              sectionId: sectionId,
              shirtId: item.shirtId,
              clotheColor: item.clotheColor,
              glassesId: item.glassesId,
              skinId: item.skinId,
              haircutId: item.haircutId,
              hairColor: item.hairColor,
              eyeType: "Default",
              minScore: item.minScore,
              minLevel: slide.minLevel,
            });
          }}
        >
          <Piece
            sectionId={sectionId}
            pieceType={section}
            pieceSize="100"
            eyeType={"Default"}
            accessoriesType={item.glassesId}
            topType={item.hairColor ? store.topType : item.haircutId} // if hairColor == null : fill with item.haricutId: else: store.topType
            hairColor={item.hairColor}
            clotheType={item.shirtId}
            clotheColor={item.clotheColor}
            skinColor={item.skinId}
          />
          <ContainerSubtitle>
            <Text style={unlocked ? styles.textLvlOk : styles.textLvlNotOk}>
              {item.imgSubtitle}
            </Text>
            <SubtitleDescription>{item.imgDescription}</SubtitleDescription>
          </ContainerSubtitle>
        </TouchableOpacity>
      </View>
    );
  }

  onItemSelected(obj) {
    var currentScore = store.score;
    var currentLevel = store.currentLevel;
    console.log(currentLevel, "currentlevel");
    if (currentLevel < obj.minLevel) {
      var msg =
        "Your level is (" +
        (obj.minLevel - currentLevel) +
        ") too low. Add some entries to unlock this item.";
      showMessage({
        message: "Nope",
        description: msg,
        type: "warning",
      });
      console.log("nope, you cant put this on!");
      CeliLogger.addLog(selectedCategory, Interactions.ACCESS_DENIED + "!, tried putting on objId: " + obj.id);
      return false;
    }
    activeId = obj.id;
    //CeliLogger.addLog(selectedCategory, Interactions.ACCESS_GRANTED + ", access granted, putting on objId: " + obj.id);

    switch (obj.sectionId) {
      case 1:
        store.setClotheType(obj.shirtId);
        store.setClotheColor(obj.clotheColor);
        store.setActiveClotheTypeId(activeId);
        CeliLogger.addLog(selectedCategory + " " + obj.sectionId, Interactions.CHANGED_CLOTHES + "new shirtId: " + obj.shirtId + ", color: " + obj.clotheColor);
        break;
      case 2:
        store.setTopType(obj.haircutId);
        store.setActiveTopTypeId(activeId);
        CeliLogger.addLog(selectedCategory + " " + obj.sectionId, Interactions.CHANGED_CLOTHES + "new hairstyleId: " + obj.haircutId);
        break;
      case 3:
        store.setAccessoriesType(obj.glassesId);
        store.setActiveAccessoriesTypeId(activeId);
        CeliLogger.addLog(selectedCategory + " " + obj.sectionId, Interactions.CHANGED_CLOTHES + "new glassesId: " + obj.glassesId);
        break;
      case 4:
        store.setSkinColor(obj.skinId);
        store.setActiveSkinColorId(activeId);
        CeliLogger.addLog(selectedCategory + " " + obj.sectionId, Interactions.CHANGED_CLOTHES + "new skinId: " + obj.skinId);
        break;
      case 5:
        store.setHairColor(obj.hairColor);
        store.setActiveHairColorId(activeId);
        CeliLogger.addLog(selectedCategory + " " + obj.sectionId, Interactions.CHANGED_CLOTHES + "new hairColor: " + obj.hairColor);
        break;
      case 6:
        break;
      default:
        CeliLogger.addLog("OneItem", Interactions.ERROR);
    }
    return true;
  }

  // for CSS only:
  getActiveItem(catIndex) {
    switch (catIndex) {
      case 1:
        return store.activeClotheTypeId;
      case 2:
        return store.activeTopTypeId;
      case 3:
        return store.activeAccessoriesTypeId;
      case 4:
        return store.activeSkinColorId;
      case 5:
        return store.activeHairColorId;
      default:
        console.log("OneCategory: loading active Items failed!", catIndex);
    }
  }
}

const styles = StyleSheet.create({
  textLvlOk: {
    color: Colors.textOnMainScreenColor,
    fontWeight: "bold",
    fontSize: 14, // px
    padding: 2,
    backgroundColor: Colors.mainscreenColor,
    textAlign: "center",
  },
  textLvlNotOk: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14, // px
    padding: 2,
    backgroundColor: "grey",
    textAlign: "center",
  },
  oneItemContainerSelected: {
    width: 104,
    padding: (0, 0),
    marginRight: 8,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: Colors.mainscreenColor,
    backgroundColor: "rgba(255,245,245,1)" //"#b5d1ff", //, #4db9d6  "#AAF0D1", //  90EE90
  },
  oneItemContainerUnlocked: {
    width: 100,
    padding: (0, 0),
    marginRight: 8,
    borderRadius: 10,
    backgroundColor: "white",//"#b5d1ff", //, #4db9d6  "#AAF0D1", //  90EE90
    opacity: 1
  },
  oneItemContainerLocked: {
    width: 100,
    padding: (0, 0),
    marginRight: 8,
    borderWidth: 0,
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "white",
    opacity: 0.3
  },
});

export const OneLevelStyles = styled.View`
  padding: 0px 20px;
`;

export const Title = styled.Text`
  color: #123;
  font-size: 23px;
  font-weight: bold;
`;

export const SlideScroll = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})``;

// contains subtitles and descriptions
export const ContainerSubtitle = styled.View`
  flex-direction: column;
  padding: 0px 0px;
  text-align: center;
  /* backgroundColor: green; */
`;

/* beschreibung des items */
export const SubtitleDescription = styled.Text`
  color: #888;
  font-size: 12px;
  text-align: center;
`;
