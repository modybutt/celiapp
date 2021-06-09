import * as SQLite from 'expo-sqlite';
import { images as SymptomIcons } from '../components/SymptomTracker/SymptomIconButtonConstants';

import BLOATING_ICON from '../assets/images/SymptomTracker/bloating.png';
import DIARRHEA_ICON from '../assets/images/SymptomTracker/diarrhea.png';
import HEADACHE_ICON from '../assets/images/SymptomTracker/headache.png';
import IRRITABILITY_ICON from '../assets/images/SymptomTracker/irritability.png';
import STOMACHACHE_ICON from '../assets/images/SymptomTracker/stomach_ache.png';
import STOMACH_RUMBLE_ICON from '../assets/images/SymptomTracker/rumbling_stomache.png';
import VOMITING_ICON from '../assets/images/SymptomTracker/vomiting.png';
import USER_SYMPTOM_ICON from '../assets/images/SymptomTracker/userDefinedSymptom.png';
import LOSS_OF_APPETITE_ICON from '../assets/images/SymptomTracker/lossOfAppetite.png';
import HUNGER_PAIN_ICON from '../assets/images/SymptomTracker/hunger_pains.png';
import FOOD_CRAVING_ICON from '../assets/images/SymptomTracker/food_craving.png';
import TENESMUS_ICON from '../assets/images/SymptomTracker/tenesmus.png';
import LOW_ENERGY_ICON from '../assets/images/SymptomTracker/low_energy.png';
import Events from '../constants/Events';

export default class DatabaseManager {

  static APP_DB = 'app.db';
  /**
   * @returns {DatabaseManager}
   */
  static getInstance() {

    if (DatabaseManager.instance == null) {
      DatabaseManager.instance = new DatabaseManager();

      this.instance.db = SQLite.openDatabase(DatabaseManager.APP_DB);

      // this.instance.db.transaction(tx => {
      //   tx.executeSql('DROP TABLE IF EXISTS settings;');
      //   tx.executeSql('DROP TABLE IF EXISTS events;');
      //   tx.executeSql('DROP TABLE IF EXISTS symptoms;');
      // }, (error) => alert("DB init: " + JSON.stringify(error)));

      this.instance.db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS symptoms (\
                id INTEGER PRIMARY KEY AUTOINCREMENT,\
                name TEXT,\
                icon TEXT,\
                created INT,\
                modified INT,\
                usage INT);',
          (param) => alert("create table symptoms: " + JSON.stringify(param)));

        let now = Date.now();

        tx.executeSql(
          'INSERT OR IGNORE INTO symptoms (id, name, icon, created, modified, usage) VALUES \
                (1,  "BLOATING",               "' + BLOATING_ICON + '", ' + now + ', ' + now + ', 0),\
                (2,  "DIARRHEA",               "' + DIARRHEA_ICON + '", ' + now + ', ' + now + ', 0),\
                (3,  "HEADACHE",               "' + HEADACHE_ICON + '", ' + now + ', ' + now + ', 0),\
                (4,  "IRRITABILITY",           "' + IRRITABILITY_ICON + '", ' + now + ', ' + now + ', 0),\
                (5,  "ABDOMINAL_DISCOMFORT",   "' + STOMACHACHE_ICON + '", ' + now + ', ' + now + ', 0),\
                (6,  "NAUSEA",                 "' + VOMITING_ICON + '", ' + now + ', ' + now + ', 0),\
                (7,  "LOSS_OF_APPETITE",       "' + LOSS_OF_APPETITE_ICON + '", ' + now + ', ' + now + ', 0),\
                (8,  "RUMBLING_IN_STOMACH",    "' + STOMACH_RUMBLE_ICON + '", ' + now + ', ' + now + ', 0),\
                (9,  "TENESMUS",               "' + TENESMUS_ICON + '", ' + now + ', ' + now + ', 0),\
                (10, "HUNGER_PAINS",           "' + HUNGER_PAIN_ICON + '", ' + now + ', ' + now + ', 0),\
                (11, "LOW_ENERGY",             "' + LOW_ENERGY_ICON + '", ' + now + ', ' + now + ', 0),\
                (12, "FOOD_CRAVING",           "' + FOOD_CRAVING_ICON + '", ' + now + ', ' + now + ', 0);',
          (param) => alert("insert into symptoms: " + JSON.stringify(param)));

        // See https://github.com/itcgames/celiapp/issues/82#issuecomment-734470136
        // to explain the following UPDATEs.

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + BLOATING_ICON + '" WHERE id = 1;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + DIARRHEA_ICON + '" WHERE id = 2;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + HEADACHE_ICON + '" WHERE id = 3;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + IRRITABILITY_ICON + '" WHERE id = 4;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + STOMACHACHE_ICON + '" WHERE id = 5;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + VOMITING_ICON + '" WHERE id = 6;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + LOSS_OF_APPETITE_ICON + '" WHERE id = 7;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + STOMACH_RUMBLE_ICON + '" WHERE id = 8;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + TENESMUS_ICON + '" WHERE id = 9;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + HUNGER_PAIN_ICON + '" WHERE id = 10;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + LOW_ENERGY_ICON + '" WHERE id = 11;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'UPDATE symptoms SET icon = "' + FOOD_CRAVING_ICON + '" WHERE id = 12;',
          (param) => alert("update symptoms: " + JSON.stringify(param)));

        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS events (\
                id INTEGER PRIMARY KEY AUTOINCREMENT,\
                eventType INT,\
                created INT,\
                modified INT,\
                objData TEXT);',
          (param) => alert("create table events: " + JSON.stringify(param)));

        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS settings (\
                id INTEGER PRIMARY KEY AUTOINCREMENT,\
                name TEX UNIQUE,\
                objData TEXT);',
          (param) => alert("create table settings: " + JSON.stringify(param)));

        tx.executeSql('INSERT OR IGNORE INTO settings (name, objData) VALUES \
              ("lastRecorded", ' + now + ')',
          (param) => alert("insert into settings: " + JSON.stringify(param)));

        tx.executeSql('INSERT OR IGNORE INTO settings (name, objData) VALUES \
              ("dbCreated", ' + now + ')',
          (param) => alert("insert into settings: " + JSON.stringify(param)));

        tx.executeSql(
          'ALTER TABLE events ADD COLUMN deleted INT;',
          [],
          (success, other) => console.log("Column added: " + JSON.stringify(success) + JSON.stringify(other)),
          (error) => console.log("Error adding column, probably because it already exists " + JSON.stringify(error)));

        //sets the database version. Use this for future migrations  
        tx.executeSql('PRAGMA user_version = 1', [],
          (success, other) => console.log("Database schema version set to 1: " + JSON.stringify(success) + JSON.stringify(other)));

      }, (error) => alert("DB init error: " + JSON.stringify(error)));
    }

    return this.instance;
  }

  /******************************************************************* 
   *                          SYMPTOM TRACKER 
   *******************************************************************/

  createSymptom(name, icon, onError, onSuccess) {
    this.db.transaction(tx => {
      let date = Date.now();
      tx.executeSql('INSERT INTO symptoms (name, icon, created, modified, usage) VALUES (?, ?, ?, ?, 0)',
        [name, icon, date, date])
    }, onError, onSuccess);
  }

  //Unused
  updateSymptom(symptomID, name, icon, onError, onSuccess) {
    this.db.transaction(tx => {
      tx.executeSql('UPDATE symptoms SET (name, icon, modified) VALUES (?, ?, ?) WHERE id = ?',
        [name, icon, Date.now(), symptomID]);
    }, onError, onSuccess);
  }

  //Public
  deleteSymptom(symptomID, onError, onSuccess) {
    this.db.transaction(tx => {
      // tx.executeSql('DELETE FROM events WHERE id = ?', [symptomID]);
      tx.executeSql('DELETE FROM symptoms WHERE id = ?', [symptomID]);
    }, onError, onSuccess);
  }

  updateSymptomUsage(symptomID, onError, onSuccess) {
    this.db.transaction(tx => {
      tx.executeSql('UPDATE symptoms SET usage = usage + 1 WHERE id = ?', [symptomID]);
    }, onError, onSuccess);
  }

  fetchSymptoms(onError, onSuccess) {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM symptoms ORDER BY name ASC', null, onSuccess, onError);
    });
  }

  fetchUnrecordedSymptoms(tx, lastRecorded, onError, onSuccess) {
    tx.executeSql('SELECT * FROM symptoms WHERE modified > ?', [lastRecorded], onSuccess, onError);
  }

  //Public
  createSymptomEvent(symptomID, severity,  note, timestamp, onError, onSuccess) {
    let objData = {
      symptomID,
      severity,
      note
    }

    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM symptoms WHERE id = ?',
        [symptomID],
        (_, { rows: { _array } }) => {
          if (!!_array[0]) {
            objData.name = _array[0].name;
            objData.icon = _array[0].icon;
          }
          //objData.usage = _array[0].usage;
          this.createEvent(Events.Symptom, timestamp, objData, onError, null);
          this.updateSymptomUsage(symptomID, onError, onSuccess);
        },
        (_, param) => alert("create events: " + JSON.stringify(param)));
    });
  }


  //unused
  updateSymptomEvent(eventID, symptomID, severity, note, dateTime, onError, onSuccess) {
    let objData = {
      symptomID,
      severity,
      note
    }

    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM symptoms WHERE id = ?',
        [symptomID],
        (_, { rows: { _array } }) => {
          objData.name = _array[0].name;
          objData.icon = _array[0].icon;

          console.log("saving event:",eventID, objData, dateTime)

          this.updateEventWithTime(eventID, objData, dateTime, onError, onSuccess);
        },
        (_, param) => alert("create events: " + JSON.stringify(param)));
    });
  }

  /******************************************************************* 
   *                          FOOD TRACKER 
   *******************************************************************/

  //public
  createMealEvent(name, type, tag, rating, note, icon, timestamp, onError, onSuccess) {
    let objData = {
      name,
      type, //gluten yes no ?
      tag,  //breakfast lunch dinner
      rating,
      icon,
      note
    }
    
    objData['culprit'] = false;

    //every time a meal is added, it will trigger a notification to be scheduled 24 hours later.
    //All previously added notifications will be removed.
    //NotificationManager.getInstance().scheduleNotification();

    this.createEvent(Events.Food, timestamp, objData, onError, onSuccess);
  }

  //unused
  updateMealEvent(eventID, name, type, tag, rating, note, onError, onSuccess) {
    let objData = {
      name,
      type,
      tag,
      rating,
      //icon,
      note
    }

    this.updateEvent(eventID, objData, onError, onSuccess);
  }
  
  toggleCulpritOnMealEvent(item, onError, onSuccess) {
    let objData = JSON.parse(item.objData);    
    if (objData.culprit == true) {
      objData.culprit = false;
    } else {
      objData.culprit = true;
    }
    
    this.updateEvent(item.id, objData, onError, onSuccess);
  }

  /******************************************************************* 
   *                          EMOTION TRACKER 
   ********************************************************************/

  //Public
  createEmotionEvent(type, note, timestamp, onError, onSuccess) {
    let objData = {
      type,
      note
    }

    this.createEvent(Events.Emotion, timestamp, objData, onError, onSuccess);
  }

  /******************************************************************* 
   *                          LOG_EVENT TRACKER 
   ********************************************************************/
  // create log event:
  createLogEvent(objData, onError, onSuccess) {
    /*let objData = {
      name,
      type,
      tag,
      rating,
      icon,
      note
    }
    */
    // objData.timestamp should become just 'timestamp'
    console.log(objData.timestamp)
    this.createEvent(Events.LogEvent, objData.timestamp, objData, onError, onSuccess);
  }


  //unused
  updateEmotionEvent(eventID, type, note, onError, onSuccess) {
    let objData = {
      type,
      note
    }

    this.updateEvent(eventID, objData, onError, onSuccess);
  }

  /******************************************************************* 
  *                          GIP TRACKER 
  ********************************************************************/

  //Public
  createGIPEvent(result, note, photo, timestamp, onError, onSuccess) {
    let objData = {
      result,
      note,
      photo,
      timestamp
    }

    this.createEvent(Events.GIP, timestamp, objData, onError, onSuccess);
  }

  /******************************************************************* 
   *                          EVENT TRACKER
   ********************************************************************/

  createEvent(eventType, timestamp, objData, onError, onSuccess) {
    this.db.transaction(tx => {
      tx.executeSql('INSERT INTO events (eventType, created, modified, objData) VALUES (?, ?, ?, ?)',
        [eventType, timestamp, timestamp, JSON.stringify(objData)]);
    }, onError, onSuccess);
  }

  updateEvent(eventID, objData, onError, onSuccess) {
    this.db.transaction(tx => {
      tx.executeSql('UPDATE events SET modified = ?, objData = ? WHERE id = ?',
        [Date.now(), JSON.stringify(objData), eventID]);
    }, onError, onSuccess);
  }

  updateEventWithTime(eventID, objData, newCreatedDate, onError, onSuccess) {
    this.db.transaction(tx => {
      tx.executeSql('UPDATE events SET created = ?, modified = ?, objData = ? WHERE id = ?',
          [newCreatedDate, Date.now(), JSON.stringify(objData), eventID]);
    }, onError, onSuccess);
  }

  deleteEvent(eventID, onError, onSuccess) {
    this.db.transaction(tx => {
      //tx.executeSql('DELETE FROM events WHERE id = ?', [eventID]);
      tx.executeSql('UPDATE events SET deleted =  ?, modified = ? WHERE id = ?', [Date.now(), Date.now(), eventID]);
    }, onError, onSuccess);
  }

  fetchEventsCount(onError, onSuccess) {
    this.db.transaction(tx => { //ignore log events (eventtype=4)
      tx.executeSql(`SELECT COUNT(*) as noEvents,
            strftime('%d', created / 1000, 'unixepoch') as day,
            strftime('%m', created / 1000, 'unixepoch') as month,
            strftime('%Y', created / 1000, 'unixepoch') as year
            FROM events WHERE deleted IS NULL AND eventType <> 4
            GROUP BY year, month, day;`,
        [], onSuccess, onError);
    });
  }

  fetchEventsCountAfterDate(timestamp, onError, onSuccess){
    let end = new Date(timestamp);
    end.setHours(23, 59, 59);
    this.db.transaction(tx => { //ignore log events (eventtype=4)
      tx.executeSql(`SELECT COUNT(*) as noEvents
            FROM events WHERE deleted IS NULL AND eventType <> 4 AND created > ?`,
          [end.getTime()], onSuccess, onError);
    });
  }

  fetchEvents(timestamp, onError, onSuccess) {

    if (timestamp != null) {
      let start = new Date(timestamp);
      let end = new Date(timestamp);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);

      this.fetchEventsBetween(start, end, onError, onSuccess);
    } else {
      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM events WHERE deleted IS NULL ORDER BY created DESC',
          null, onSuccess, onError);
      });
    }
  }

  fetchEventsBeforeDate(timestamp, onError, onSuccess) {
    const cutOffTime = timestamp === null ?  new Date(): new Date(timestamp);
    cutOffTime.setHours(23, 59, 59);
    console.log("getting evets before", cutOffTime.getTime())
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM events '
          + 'WHERE deleted IS NULL AND created < ?'
          + 'ORDER BY created DESC',
          [cutOffTime.getTime()], onSuccess, onError);
    });
  }

  fetchEventsBetween(start, end, onError, onSuccess) {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM events '
        + 'WHERE deleted IS NULL AND created BETWEEN ? AND ?  '
        + 'ORDER BY created DESC',
        [start.getTime(), end.getTime()], onSuccess, onError);
    });
  }


  fetchUnrecordedEvents(tx, lastRecorded, onError, onSuccess) {
    console.log("--> last recorded content", lastRecorded)
    tx.executeSql('SELECT * FROM events WHERE modified > ?',
      [lastRecorded], onSuccess, onError);
  }

  /******************************************************************* 
   *                       Settings Database
   ********************************************************************/

   getDailyGoals(){
      return new Promise((resolve, reject)=>
      
        this.loadSettings(null,
          (_, error) => { alert("error loading settings" + JSON.stringify(error)); reject(error)},
          (_, { rows: { _array } }) => 
          {
            let settings = {};		
            for (var i in _array)
            {
              settings[_array[i].name] = JSON.parse(_array[i].objData);
            }		
            resolve({
              dailyGoals:
              {
                dailySymptoms: settings.noSymptoms || 3,
                dailyEmotions: settings.noEmotions || 3,
                dailyMeals: settings.noMeals || 3,
                dailyGips: settings.noGips || 1
              }
            })					
          }
        )
      )
   }


  loadSettings(name, onError, onSuccess) {
    if (name == null) {
      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM settings', null, onSuccess, onError);
      });
    } else {
      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM settings WHERE name = ?',
          [name], onSuccess, onError);
      });
    }
  }

  saveSettings(name, objData, onError, onSuccess) {
    this.db.transaction(tx => {
      tx.executeSql('REPLACE INTO settings (name, objData) VALUES (?, ?)',
        [name, JSON.stringify(objData)]);
    }, onError, onSuccess);
  }

  fetchUnrecordedData(onError, onSuccess) {
    let unrecordedData = {};

    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM settings WHERE name = "lastRecorded"',
        null,
        (_, { rows: { _array } }) => {
          let lastRecorded = Math.round(_array[0].objData, 0);
          console.log('lastRecorded is ' + lastRecorded);
          this.fetchUnrecordedSymptoms(
            tx,
            lastRecorded,
            onError,
            (_, { rows: { _array } }) => { unrecordedData.symptoms = _array; }
          );

          this.fetchUnrecordedEvents(
            tx,
            lastRecorded,
            onError,
            (_, { rows: { _array } }) => { unrecordedData.events = _array; }
          );
        },
        onError);
    },
      (_, error) => console.error(JSON.stringify(error)),
      (_, success) => onSuccess(null, unrecordedData));
  }

  updateLastRecorded() {
    this.db.transaction(tx => {
      tx.executeSql('UPDATE settings SET objData = ? WHERE name = "lastRecorded"', [Date.now()]);
    },
      (_, error) => console.error(JSON.stringify(error)),
      (_, success) => console.log('Updated lastRecorded')
    );
  }

  getDBCreatedDate() {

    const createdDate = new Promise((resolve, _) => {
      this.db.transaction(tx =>
        tx.executeSql('SELECT * FROM settings WHERE name = ?',
          ["dbCreated"],
          (_, { rows: { _array } }) => {
            console.log("creation date =", _array[0]);
            resolve(_array[0].objData);
          },
          (err) => console.log("error:", err)
        )
      )
    });

    const earliestDate = new Promise((resolve, _) => {
      console.log("getting earliest record =");
      this.db.transaction(tx =>
        tx.executeSql('SELECT * FROM events ORDER BY created ASC LIMIT 1;',
          null,
          (_, { rows: { length, _array } }) => {
            console.log("earliest record =", _array[0]);
            if(length ==0 || !_array[0]) 
              resolve(0)
            else
              resolve(_array[0].created)
          }),
          (err) => console.log("error:", err)
        )
      
    });

    return Promise.all([createdDate, earliestDate])
        .then(([created, earliest]) =>{
          console.log("created, earliest", [created, earliest] )
          if(earliest === 0 || created < earliest) return (created);
          return (earliest);
        });
  }
}