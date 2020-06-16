import { observable, action } from "mobx";
import { create, persist } from "mobx-persist";
import { AsyncStorage } from "react-native";

const hydrate = create({
  storage: AsyncStorage,
});

class GlutenBuddyStore {
  @observable title = "Hello World2";

  // default values:
  @observable id = 0;
  @observable size = 200;
  @observable avatarStyle = "Transparent";
  @observable topType = "LongHairBob";

  @observable accessoriesType = "Blank"; // No Glasses
  @observable hairColor = "BrownDark";
  @observable facialHairType = "Blank"; // MoustacheMagnum; BeardMedium
  @observable clotheType = "Hoodie";
  @observable clotheColor = "PastelBlue";
  @observable eyeType = "Default";
  @observable eyebrowType = "Default";
  @observable mouthType = "Smile";
  @observable skinColor = "Brown";

  @observable activeTopTypeId = 0;
  @observable activeAccessoriesTypeId = 0;
  @observable activeHairColorId = 0;
  @observable activeFacialHairTypeId = 0;
  @observable activeClotheTypeId = 0;
  @observable activeClotheColorId = 0;
  @observable activeEyeTypeId = 0;
  @observable activeEyebrowTypeId = 0;
  @observable activeMouthTypeId = 0;
  @observable activeSkinColorId = 0;

  // semi persistent points:
  @observable score = 0;
  @observable nextLevel = 1000;
  @observable currentLevel = 1;
  // for progress bar:
  @observable thisLevelBegin = 0;
  @observable thisLevelEnd = 1000;
  @observable progressBarProgress = 0.0;

  //@observable tempAvatarChange = [0, "itemId", "color"];


  @action setId = (id) => {
    this.id = id;
  };
  //@observable
  @action onChangeAvatarItem = (val) => {
    this.title = val;
    console.log("store: called with:", val);
    //this.forceUpdate();
  };

  //@action setTempAvatarChange = (sectionId, itemId, color = "Blue02") => {
    //this.tempAvatarChange[0] = sectionId;
    //this.tempAvatarChange[1] = itemId;
    //this.tempAvatarChange[2] = color;
  //};
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
  setEyeType = (value) => {
    this.eyeType = value;
  };
  @action
  setEyebrowType = (value) => {
    this.eyebrowType = value;
  };
  @action
  setMouthType = (value) => {
    this.mouthType = value;
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
  setActiveEyeTypeId = (value) => {
    this.activeEyeTypeId = value;
  };
  @action
  setActiveEyebrowTypeId = (value) => {
    this.activeEyebrowTypeId = value;
  };
  @action
  setActiveMouthTypeId = (value) => {
    this.activeMouthTypeId = value;
  };
  @action
  setActiveSkinColorId = (value) => {
    this.activeSkinColorId = value;
  };

  @observable activeTopTypeId = 0;
  @observable activeAccessoriesTypeId = 0;
  @observable activeHairColorId = 0;
  @observable activeFacialHairTypeId = 0;
  @observable activeClotheTypeId = 0;
  @observable activeClotheColorId = 0;
  @observable activeEyeTypeId = 0;
  @observable activeEyebrowTypeId = 0;
  @observable activeMouthTypeId = 0;
  @observable activeSkinColorId = 0;

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
  id: true,
  title: true,
  size: true,
  avatarStyle: true,
  topType: true,
  accessoriesType: true,
  hairColor: true,
  facialHairType: true,
  clotheType: true,
  clotheColor: true,
  eyeType: true,
  eyebrowType: true,
  mouthType: true,
  skinColor: true,

  // which item ID is currentry active?:
  activeTopTypeId: true,
  activeAccessoriesTypeId: true,
  activeHairColorId: true,
  activeFacialHairTypeId: true,
  activeClotheTypeId: true,
  activeClotheColorId: true,
  activeEyeTypeId: true,
  activeEyebrowTypeId: true,
  activeMouthTypeId: true,
  activeSkinColorId: true,
};

const store = new GlutenBuddyStore();

const persistingStore = persist(schema)(store);
hydrate("id", persistingStore);
hydrate("title", persistingStore);
hydrate("size", persistingStore);
hydrate("avatarStyle", persistingStore);
hydrate("topType", persistingStore);
hydrate("accessoriesType", persistingStore);
hydrate("hairColor", persistingStore);
hydrate("facialHairType", persistingStore);
hydrate("clotheType", persistingStore);
hydrate("clotheColor", persistingStore);
hydrate("eyeType", persistingStore);
hydrate("eyebrowType", persistingStore);
hydrate("mouthType", persistingStore);
hydrate("skinColor", persistingStore);
hydrate("score", persistingStore);
hydrate("currentLevel", persistingStore);
hydrate("thisLevelBegin", persistingStore); // for progress bar
hydrate("thisLevelEnd", persistingStore); // for progress bar
hydrate("progressBarProgress", persistingStore); // for progress bar

export default persistingStore;
