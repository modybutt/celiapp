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
    
    if (this.gamificationFlag == false){
      this.gamificationFlag = true;
    } else {
      this.gamificationFlag = false;
    }
    
  };
 
}

const schema = {
  gamificationFlag: true,

};

const store = new LoggingStore();

const persistingStore = persist(schema)(store);
hydrate("gamificationFlag", persistingStore);

export default persistingStore;
