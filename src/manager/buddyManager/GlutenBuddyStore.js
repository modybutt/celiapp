import { observable, action } from "mobx";
import { create, persist } from "mobx-persist";
import { AsyncStorage, Platform } from "react-native";

const hydrate = create({
  storage: AsyncStorage,
});

class GlutenBuddyStore {  

// default values:
@observable size = 200;
@observable avatarStyle = Platform.OS === 'ios' ? "Circle" : "Transparent";
@observable topType = "ShortHairShortCurly";
@observable accessoriesType = "Blank"; // categoryGlasses
@observable hairColor = "Black";
@observable facialHairType = "Blank"; // e.g. MoustacheMagnum; BeardMedium -> Not for teenagers;
@observable clotheType = "CollarSweater";
@observable clotheColor = "PastelBlue";
@observable skinColor = "Tanned";

@observable activeTopTypeId = 20011;
@observable activeAccessoriesTypeId = 30048;
@observable activeHairColorId = 50063;
@observable activeFacialHairTypeId = 0;
@observable activeClotheTypeId = 10002;
@observable activeClotheColorId = 10002;
@observable activeSkinColorId = 40055;

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
  clotheType: true,
  clotheColor: true,
  skinColor: true,

  activeTopTypeId: true,
  activeAccessoriesTypeId: true,
  activeHairColorId: true,
  activeFacialHairTypeId: true,
  activeClotheTypeId: true,
  activeClotheColorId: true,
  activeSkinColorId: true,
};

const store = new GlutenBuddyStore();

const persistingStore = persist(schema)(store);
hydrate("size", persistingStore);
hydrate("avatarStyle", persistingStore);
hydrate("topType", persistingStore);
hydrate("accessoriesType", persistingStore);
hydrate("hairColor", persistingStore);
hydrate("facialHairType", persistingStore);
hydrate("clotheType", persistingStore);
hydrate("clotheColor", persistingStore);
hydrate("skinColor", persistingStore);
hydrate("score", persistingStore);
hydrate("currentLevel", persistingStore);
hydrate("thisLevelBegin", persistingStore); // for progress bar
hydrate("thisLevelEnd", persistingStore); // for progress bar
hydrate("progressBarProgress", persistingStore); // for progress bar

export default persistingStore;
