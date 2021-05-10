
export default Events = {
  "Symptom": 0,
  "Food": 1,
  "Emotion": 2,
  "GIP": 3,
  "LogEvent": 4,
};

export const Meals = {
  BREAKFAST: 0,
  LUNCH: 1,
  DINNER: 2,
}

export const Gluten = {
  FREE: 1,
  PRESENT: 0,
  UNKNOWN: 2,
}

export const Emotion = {
  UNHAPPY: 1,
  SLIGHTLY_UNHAPPY: 2,
  NEUTRAL: 3,
  SLIGHTLY_HAPPY: 4,
  HAPPY: 5
}

export const Severity = {
  LOW: 1,
  MODERATE: 2,
  SEVERE: 3,
}

export const Symptoms = {
  NO_SYMPTOMS: { id: 0, name: "NO_SYMPTOMS" },
  BLOATING: { id: 1, name: "BLOATING" },
  DIARRHEA: { id: 2, name: "DIARRHEA" },
  HEADACHE: { id: 3, name: "HEADACHE" },
  IRRITABILITY: { id: 4, name: "IRRITABILITY" },
  ABDOMINAL_DISCOMFORT: { id: 5, name: "ABDOMINAL_DISCOMFORT" },
  NAUSEA: { id: 6, name: "NAUSEA" },
  LOSS_OF_APPETITE: { id: 7, name: "LOSS_OF_APPETITE" },
  RUMBLING_IN_STOMACH: { id: 8, name: "RUMBLING_IN_STOMACH" },
  TENESMUS: { id: 9, name: "TENESMUS" },
  HUNGER_PAINS: { id: 10, name: "HUNGER_PAINS" },
  LOW_ENERGY: { id: 11, name: "LOW_ENERGY" },
  FOOD_CRAVING: { id: 12, name: "FOOD_CRAVING" }
}