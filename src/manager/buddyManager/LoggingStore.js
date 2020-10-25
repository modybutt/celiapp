import { observable, action } from "mobx";
import { create, persist } from "mobx-persist";
import { AsyncStorage, Platform } from "react-native";

const hydrate = create({
  storage: AsyncStorage,
});

class LoggingStore {  

@observable gamificationFlag = false;

  @action
  changeGamificationFlag = () => {
    this.gamificationFlag = !this.gamificationFlag;
  };
}

const schema = {
  gamificationFlag: true,
};

const store = new LoggingStore();

const persistingStore = persist(schema)(store);

hydrate("gamificationFlag", persistingStore);

export default persistingStore;
