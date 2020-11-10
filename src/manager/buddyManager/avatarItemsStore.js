import { observable, action } from "mobx";
import { create, persist } from "mobx-persist";
import { AsyncStorage, Platform } from "react-native";
import { WardrobeItems } from "../../config/wardrobeItems"

const hydrate = create({
  storage: AsyncStorage,
});

class AvatarItemStore {  

@observable hairColor = "Black";
@observable activeHairColorId = 50063;
@observable myItems = WardrobeItems.getInstance().categoryShirt;

  @action
  setHairColor = (value) => {
    this.hairColor = value;
    
  };

  @action
  setActiveHairColorId = (value) => {
    this.activeHairColorId = value;
  };
}

const schema = {
  topType: true,
  activeHairColorId: true,
};

const store = new AvatarItemStore();

const persistingStore = persist(schema)(store);

hydrate("hairColor", persistingStore);


export default persistingStore;
