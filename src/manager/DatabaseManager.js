import * as SQLite from 'expo-sqlite';
import { images as SymptomIcons } from '../components/SymptomTracker/SymptomIconButtonConstants';

import BLOATING_ICON from '../assets/images/SymptomTracker/bloating.png';
import DIARRHEA_ICON from '../assets/images/SymptomTracker/diarrhea.png';
import HEADACHE_ICON from '../assets/images/SymptomTracker/headache.png';
import IRRITABILITY_ICON from '../assets/images/SymptomTracker/irritability.png';
import STOMACHACHE_ICON from '../assets/images/SymptomTracker/stomachAche.png';
import VOMITING_ICON from '../assets/images/SymptomTracker/vomiting.png';
import WEIGHT_LOSS_ICON from '../assets/images/SymptomTracker/weightLoss.png';
import USER_SYMPTOM_ICON from '../assets/images/SymptomTracker/userDefinedSymptom.png';
import Events from '../constants/Events';
import NotificationManager from './NotificationManager';

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
                (1, "BLOATING",     "' + BLOATING_ICON      + '", ' + now + ', ' + now + ', 0),\
                (2, "DIARRHEA",     "' + DIARRHEA_ICON      + '", ' + now + ', ' + now + ', 0),\
                (3, "HEADACHE",     "' + HEADACHE_ICON      + '", ' + now + ', ' + now + ', 0),\
                (4, "IRRITABILITY", "' + IRRITABILITY_ICON  + '", ' + now + ', ' + now + ', 0),\
                (5, "STOMACHACHE",  "' + STOMACHACHE_ICON   + '", ' + now + ', ' + now + ', 0),\
                (6, "VOMITING",     "' + VOMITING_ICON      + '", ' + now + ', ' + now + ', 0),\
                (7, "WEIGHT_LOSS",  "' + WEIGHT_LOSS_ICON   + '", ' + now + ', ' + now + ', 0),\
                (8, "SYMPTOM_8",    "' + USER_SYMPTOM_ICON  + '", ' + now + ', ' + now + ', 0),\
                (9, "SYMPTOM_9",    "' + USER_SYMPTOM_ICON  + '", ' + now + ', ' + now + ', 0),\
                (10, "SYMPTOM_10",  "' + USER_SYMPTOM_ICON  + '", ' + now + ', ' + now + ', 0),\
                (11, "SYMPTOM_11",  "' + USER_SYMPTOM_ICON  + '", ' + now + ', ' + now + ', 0),\
                (12, "SYMPTOM_12",  "' + USER_SYMPTOM_ICON  + '", ' + now + ', ' + now + ', 0),\
                (13, "SYMPTOM_13",  "' + USER_SYMPTOM_ICON  + '", ' + now + ', ' + now + ', 0),\
                (14, "SYMPTOM_14",  "' + USER_SYMPTOM_ICON  + '", ' + now + ', ' + now + ', 0),\
                (15, "SYMPTOM_15",  "' + USER_SYMPTOM_ICON  + '", ' + now + ', ' + now + ', 0),\
                (16, "SYMPTOM_16",  "' + USER_SYMPTOM_ICON  + '", ' + now + ', ' + now + ', 0);',
                (param) => alert("insert into symptoms: " + JSON.stringify(param)));
            
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

  //Public
  fetchSymptoms(onError, onSuccess) {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM symptoms ORDER BY usage DESC', null, onSuccess, onError);
    });
  }
  
  fetchUnrecordedSymptoms(tx, lastRecorded, onError, onSuccess) {
    tx.executeSql('SELECT * FROM symptoms WHERE modified > ?', [lastRecorded], onSuccess, onError);
  }

  //Public
  createSymptomEvent(symptomID, severity, note, timestamp, onError, onSuccess) {
    let objData = {
      symptomID,
      //name: "",
      //icon: "",
      severity,
      note
    }
    
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM symptoms WHERE id = ?',
        [symptomID], 
        (_, {rows: {_array}}) => {
          if(!!_array[0]){
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
  updateSymptomEvent(eventID, symptomID, severity, note, onError, onSuccess) {
    let objData = {
      symptomID,
      //name: "",
      //icon: "",
      severity,
      note
    }

    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM symptoms WHERE id = ?',
        [symptomID], 
        (_, {rows: {_array}}) => {
          objData.name = _array[0].name;
          objData.icon = _array[0].icon;

          this.updateEvent(eventID, objData, onError, onSuccess);
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
      type,
      tag,
      rating,
      icon,
      note
    }
    
      //every time a meal is added, it will trigger a notification to be scheduled 24 hours later.
      //All previously added notifications will be removed.
      NotificationManager.getInstance().scheduleNotification();

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
      tx.executeSql('UPDATE events SET (modified, objData) VALUES (?, ?) WHERE id = ?',
        [Date.now(), objData, eventID]);
    }, onError, onSuccess);
  }

  deleteEvent(eventID, onError, onSuccess) {
    this.db.transaction(tx => {
      tx.executeSql('DELETE FROM events WHERE id = ?', [eventID]);
    }, onError, onSuccess);
  }

  fetchEvents(timestamp, onError, onSuccess) {
    if (timestamp != null) {
      let start = new Date(timestamp);
      let end = new Date(timestamp);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);

      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM events '
                    + 'WHERE created BETWEEN ? AND ? '
                    + 'ORDER BY created DESC',
          [start.getTime(), end.getTime()], onSuccess, onError);
      });
    } else {
      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM events ORDER BY created DESC',
          null, onSuccess, onError);
      });
    }
  }
  
  fetchUnrecordedEvents(tx, lastRecorded, onError, onSuccess) {
    tx.executeSql('SELECT * FROM events WHERE modified > ?',
      [lastRecorded], onSuccess, onError);
  }

  /******************************************************************* 
   *                       Settings Database
   ********************************************************************/   

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
}
