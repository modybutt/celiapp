import { observable, action } from "mobx";
import { create, persist } from "mobx-persist";
import { AsyncStorage } from "react-native";

const hydrate = create({
  storage: AsyncStorage,
});

class EmotionStore {
    @observable eyeType = "Default";
    @observable eyebrowType = "Default";
    @observable mouthType = "Smile";
    @observable accessoriesType = "Blank"; // No Glasses if avatar is sad
    @observable accessoriesTypeEmotion = "Blank";

    @action
    setFacialExpression = (num) => {
        switch (num){
            case 1: // super happy
                this.setSuperHappy();
                break;
            case 2: // happy
                this.setHappy();
                break;
            case 3: // neutral
                this.setNeutral();
                break;
            case 4: // super happy
                this.setSad();
                break;
            case 5: // super happy
                this.setSuperSad();
                break;
            default:
                console.error("SetFacialExpression Failed", num);
        }
    }

    @action
    setSuperHappy = () => {
        this.eyeType = "Happy";
        this.eyebrowType= "RaisedExcited";
        this.mouthType="Smile";
        this.accessoriesTypeEmotion="Blank"; // for testing purpose

    }

    @action
    setHappy = () => {
        this.eyeType = "Surprised";
        this.eyebrowType= "RaisedExcited";
        this.mouthType="Twinkle";
        this.accessoriesTypeEmotion="Blank"; // for testing purpose

    }

    @action
    setNeutral = () => {
        this.eyeType = "Default";
        this.eyebrowType= "Default";
        this.mouthType="Serious";
        this.accessoriesTypeEmotion="Blank"; // for testing purpose

    }

    @action
    setSad = () => {
        this.eyeType = "Close";
        this.eyebrowType= "RaisedExcited";
        this.mouthType="Sad";
        this.accessoriesTypeEmotion="Blank"; // for testing purpose

    }

    @action
    setSuperSad = () => {
        this.eyeType = "Cry";
        this.eyebrowType= "SadConcerned";
        this.mouthType="ScreamOpen";
        this.accessoriesTypeEmotion="Blank"; // for testing purpose
    }
}

const schema = {
    eyeType: true,
    eyebrowType: true,
    mouthType: true,
    accessoriesType: true,
};

const emotionStore = new EmotionStore();

const persistingStore = persist(schema)(emotionStore);
hydrate("eyeType", persistingStore);
hydrate("eyebrowType", persistingStore);
hydrate("mouthType", persistingStore);
hydrate("accessoriesType", persistingStore);

export default persistingStore;
