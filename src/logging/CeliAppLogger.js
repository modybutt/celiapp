import {AsyncStorage} from "react-native";


const logFlag = {
    gamificationFlag: require('./gamificationInfo.json'),
  }
  
  export default class CeliAppLogger {
  
    /**
     * @returns {CeliAppLogger}
     */
    static getInstance() {
        if (CeliAppLogger.instance == null) {
            CeliAppLogger.instance = new CeliAppLogger();
          this.instance.gamification = logFlag.gamificationFlag;
        }
  
        return this.instance;
    }
  
    getGamificationFlag() {
      return logFlag.gamificationFlag.gamification;
    }
  

    changeGamificationFlag = async () => {

        var flag =!(logFlag.gamificationFlag.gamification);

        try {
          await AsyncStorage.setItem(
            '@gamification:key',
            flag
          );
        } catch (error) {
          // Error saving data
        }
      };

  }