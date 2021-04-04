import Events, { Meals, Emotion, Gluten, Severity, Symptoms } from '../../constants/Events';

export default class MockDB {

  constructor(eventList) {
    this.eventList = eventList
  }

  fetchEventsBetween(start, end, error, success) {

    _array = this.eventList

    data = { rows: { _array } }

    success(0, data);
  }

  static symptom = (date, symptom, severity, note) =>
  ({
    "created": Date.parse(date),
    "deleted": null,
    "eventType": 0,
    "id": 1158,
    "modified": Date.parse(date),
    "objData": "{\"symptomID\":" + symptom.id + ",\"severity\":" + severity + ",\"note\":\"" + note + "\",\"name\":\"" + symptom.name + "\",\"icon\":\"28\"}",
  })

  static meal = (date, type, gluten) =>
  ({
    "created": Date.parse(date),
    "deleted": null,
    "eventType": 1,
    "id": 1146,
    "modified": Date.parse(date),
    "objData": "{\"name\":\"\",\"type\":" + type + ",\"tag\":" + gluten + ",\"rating\":0,\"icon\":null,\"note\":\"\"}",
  })

  static emotion = (date, mood) =>
  ({
    "created": Date.parse(date),
    "deleted": null,
    "eventType": 2,
    "id": 1134,
    "modified": Date.parse(date),
    "objData": "{\"type\":" + mood + ",\"note\":\"My note \"}",
  })

  static interaction = (date) => (
    {
      "created": Date.parse(date),
      "deleted": null,
      "eventType": 4,
      "id": 1123,
      "modified": Date.parse(date),
      "objData": "{\"interactionInfo\":\"OPEN\",\"componentName\":\"GlutenbuddyRoot\",\"timestamp\":1617300349075,\"gamification\":true}",
    }
  )
}

test('mock db works as expected', () => {
  events = []
  events.push(MockDB.symptom("01 Apr 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, ""))
  events.push(MockDB.meal("01 Apr 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN))
  events.push(MockDB.emotion("01 Apr 2021 19:07:20.05", Emotion.NEUTRAL))
  events.push(MockDB.interaction("01 Apr 2021 19:07:20.05"))

  const mockDB = new MockDB(events)
  p = new Promise((resolve, reject) => {
    mockDB.fetchEventsBetween(
      new Date(),
      new Date(),
      () => reject("Error fetching events for previous 7 days"),
      (_, { rows: { _array } }) => resolve(_array)
    );
  });

  return p.then(data => {
    expect(data.length).toEqual(4)
  })

});


test('create a symptom', () => {
  const s = MockDB.symptom("01 Apr 2021 19:07:20.05", Symptoms.LOSS_OF_APPETITE, 1, "")

  const expected = {
    "created": 1617300440050,
    "deleted": null,
    "eventType": 0,
    "id": 1158,
    "modified": 1617300440050,
    "objData": "{\"symptomID\":7,\"severity\":1,\"note\":\"\",\"name\":\"LOSS_OF_APPETITE\",\"icon\":\"28\"}",
  }

  expect(s).toEqual(expected)
})

test('create a meal', () => {
  const s = MockDB.meal("01 Apr 2021 19:07:20.05", Meals.DINNER, Gluten.UNKNOWN)

  const expected = {
    "created": 1617300440050,
    "deleted": null,
    "eventType": 1,
    "id": 1146,
    "modified": 1617300440050,
    "objData": "{\"name\":\"\",\"type\":2,\"tag\":2,\"rating\":0,\"icon\":null,\"note\":\"\"}",
  }

  expect(s).toEqual(expected)

})


test('create a emotion', () => {
  const s = MockDB.emotion("01 Apr 2021 19:07:20.05", Emotion.NEUTRAL)

  const expected = {
    "created": 1617300440050,
    "deleted": null,
    "eventType": 2,
    "id": 1134,
    "modified": 1617300440050,
    "objData": "{\"type\":3,\"note\":\"My note \"}",
  }

  expect(s).toEqual(expected)

})

test('create a interaction', () => {
  const s = MockDB.interaction("01 Apr 2021 19:07:20.05")

  const expected = {
    "created": 1617300440050,
    "deleted": null,
    "eventType": 4,
    "id": 1123,
    "modified": 1617300440050,
    "objData": "{\"interactionInfo\":\"OPEN\",\"componentName\":\"GlutenbuddyRoot\",\"timestamp\":1617300349075,\"gamification\":true}",
  }

  expect(s).toEqual(expected)

})