import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import SymptomTrackerScreen from '../screens/SymptomTrackerScreen';
import FoodDiaryScreen from '../screens/FoodDiaryScreen';
import EmoteTrackerScreen from '../screens/EmoteTrackerScreen';

const AddSymptomStack = createStackNavigator({
  AddSymptom: SymptomTrackerScreen,
});

const AddMealStack = createStackNavigator({
  AddMeal: FoodDiaryScreen,
});

const AddEmoteStack = createStackNavigator({
  AddEmote: EmoteTrackerScreen,
});

export default {
  AddSymptom: AddSymptomStack,
  AddMeal: AddMealStack,
  AddEmote: AddEmoteStack
};