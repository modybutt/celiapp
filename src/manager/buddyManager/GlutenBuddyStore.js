import { observable, action } from "mobx";
import { create, persist } from "mobx-persist";
import { AsyncStorage, Platform } from "react-native";

const hydrate = create({
  storage: AsyncStorage,
});

class GlutenBuddyStore {  

// default values:
@observable size = 150;
@observable avatarStyle = Platform.OS === 'ios' ? "Circle" : "Transparent";
@observable topType = "ShortHairShortFlat";
@observable accessoriesType = "Blank"; // categoryGlasses
@observable hairColor = "Black";
@observable facialHairType = "Blank"; // e.g. MoustacheMagnum; BeardMedium -> Not for teenagers;
@observable facialHairColor = "Black";
@observable clotheType = "ShirtCrewNeck";
@observable clotheColor = "Black";
@observable skinColor = "Tanned";
@observable graphicType = "Skull";

@observable activeTopTypeId = 20022;
@observable activeAccessoriesTypeId = 30001;
@observable activeHairColorId = 50001;
@observable activeFacialHairTypeId = 70001;
@observable activeFacialHairColorId = 60001;
@observable activeClotheTypeId = 10001;
@observable activeClotheColorId = 90001;
@observable activeSkinColorId = 40001;
@observable activeGraphicTypeId = 80001;

// semi persistent points:
@observable score = 0;
@observable nextLevel = 1000;
@observable currentLevel = 1;
// for progress bar:
@observable thisLevelBegin = 0;
@observable thisLevelEnd = 1000;
@observable progressBarProgress = 0.0;


  @action
  setTopType = (value) => {
    this.topType = value;
  };
  @action
  setAccessoriesType = (value) => {
    this.accessoriesType = value;
  };
  @action
  setHairColor = (value) => {
    this.hairColor = value;
  };
  @action
  setFacialHairType = (value) => {
    this.facialHairType = value;
  };
  @action
  setFacialHairColor = (value) => {
    this.facialHairColor = value;
  };
  @action
  setClotheType = (value) => {
    this.clotheType = value;
  };
  @action
  setClotheColor = (value) => {
    this.clotheColor = value;
  };
  @action
  setSkinColor = (value) => {
    this.skinColor = value;
  };
  @action
  setGraphicType = (value) => {
    this.graphicType = value;
  };
  @action
  setActiveTopTypeId = (value) => {
    this.activeTopTypeId = value;
  };
  @action
  setActiveAccessoriesTypeId = (value) => {
    this.activeAccessoriesTypeId = value;
  };
  @action
  setActiveHairColorId = (value) => {
    this.activeHairColorId = value;
  };
  @action
  setActiveFacialHairTypeId = (value) => {
    this.activeFacialHairTypeId = value;
  };
  @action
  setActiveFacialHairColorId = (value) => {
    this.activeFacialHairColorId = value;
  };
  @action
  setActiveClotheTypeId = (value) => {
    this.activeClotheTypeId = value;
  };
  @action
  setActiveClotheColorId = (value) => {
    this.activeClotheColorId = value;
  };
  @action
  setActiveSkinColorId = (value) => {
    this.activeSkinColorId = value;
  };
  @action
  setActiveGraphicTypeId = (value) => {
    this.activeGraphicTypeId = value;
  };

  @action
  setScore = (value) => {
    this.score = value;
  };

  @action
  setNextLevelScore = (value) => {
    this.nextLevel = value;
  };
  @action
  setCurrentLevel = (value) => {
    this.currentLevel = value;
  };

  @action
  setThisLevelBegin = (value) => {
    this.thisLevelBegin = value;
  };
  @action
  setThisLevelEnd = (value) => {
    this.thisLevelEnd = value;
  };

  @action
  setProgressBarProgress = (value) => {
    this.progressBarProgress = value;
  };
}

const schema = {
  size: true,
  avatarStyle: true,
  topType: true,
  accessoriesType: true,
  hairColor: true,
  facialHairType: true,
  facialHairColor: true,
  clotheType: true,
  clotheColor: true,
  skinColor: true,
  graphicType: true,

  activeTopTypeId: true,
  activeAccessoriesTypeId: true,
  activeHairColorId: true,
  activeFacialHairTypeId: true,
  activeFacialHairColorId: true,
  activeClotheTypeId: true,
  activeClotheColorId: true,
  activeSkinColorId: true,
  activeGraphicTypeId: true,
};

const store = new GlutenBuddyStore();

const persistingStore = persist(schema)(store);
hydrate("size", persistingStore);
hydrate("avatarStyle", persistingStore);
hydrate("topType", persistingStore);
hydrate("accessoriesType", persistingStore);
hydrate("hairColor", persistingStore);
hydrate("facialHairType", persistingStore);
hydrate("facialHairColor", persistingStore);
hydrate("clotheType", persistingStore);
hydrate("clotheColor", persistingStore);
hydrate("skinColor", persistingStore);
hydrate("graphicType", persistingStore);
hydrate("score", persistingStore);
hydrate("currentLevel", persistingStore);
hydrate("thisLevelBegin", persistingStore); // for progress bar
hydrate("thisLevelEnd", persistingStore); // for progress bar
hydrate("progressBarProgress", persistingStore); // for progress bar

export default persistingStore;
