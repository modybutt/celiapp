import * as SQLite from 'expo-sqlite';
import { images as SymptomIcons } from '../components/SymptomTracker/SymptomIconButtonConstants';

export default class DatabaseManager {

    /**
     * @returns {DatabaseManager}
     */
    static getInstance() {
        if (DatabaseManager.instance == null) {
            DatabaseManager.instance = new DatabaseManager();

            this.instance.db = SQLite.openDatabase('app.db');
            this.instance.db.transaction(tx => {
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS symptoms (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT, created INT, modified INT, usage INT);', 
                (param) => alert("create table symptoms: " + JSON.stringify(param)));            
              tx.executeSql(
                'INSERT OR IGNORE INTO symptoms (id, name, icon, created, usage) VALUES '
                + '(1, "CLOATING", "' + require('../assets/images/SymptomTracker/cloating.png') + '", ' + Date.now() + ',0),'
                + '(2, "DIARRHEA", "' + require('../assets/images/SymptomTracker/diarrhea.png') + '", ' + Date.now() + ',0),'
                + '(3, "HEADACHE", "' + require('../assets/images/SymptomTracker/headache.png') + '", ' + Date.now() + ',0),'
                + '(4, "IRRITABILITY", "' + require('../assets/images/SymptomTracker/irritability.png') + '", ' + Date.now() + ',0),'
                + '(5, "STOMACHACHE", "' + require('../assets/images/SymptomTracker/stomachAche.png') +'", ' + Date.now() + ',0),'
                + '(6, "VOMITING", "' + require('../assets/images/SymptomTracker/vomiting.png') + '", ' + Date.now() + ',0),'
                + '(7, "WEIGHT_LOSS", "' + require('../assets/images/SymptomTracker/weightLoss.png') + '", ' + Date.now() + ',0);',
                (param) => alert("insert into symptoms: " + JSON.stringify(param)));
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, eventType INT, created INT, modified INT, objData TEXT);', 
                (param) => alert("create table events: " + JSON.stringify(param)));
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEX UNIQUE, objData TEXT);', 
                (param) => alert("create table settings: " + JSON.stringify(param)));
            }, (error) => alert("DB init: " + JSON.stringify(error)));
        }

        return this.instance;
    }

    /******************************************************************* 
     *                          SYMPTOM TRACKER 
     *******************************************************************/

    createSymptom(name, icon, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('INSERT INTO symptoms (name, icon, created, usage) VALUES (?, ?, ?, 0)', [name, icon, Date.now()])
      }, onError, onSuccess);
    }

    updateSymptom(symptomID, name, icon, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('UPDATE symptoms SET (name, icon, modified) VALUES (?, ?, ?) WHERE id = ?', [name, icon, Date.now(), symptomID]);
      }, onError, onSuccess);
    }

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
        tx.executeSql('SELECT * FROM symptoms ORDER BY usage DESC', null, onSuccess, onError);
      });      
    }

    createSymptomEvent(symptomID, severity, note, timestamp, onError, onSuccess) {
      let objData = {
        symptomID,
        //name: "",
        //icon: "",
        severity,
        note
      }
      
      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM symptoms WHERE id = ?', [symptomID], 
          (_, {rows: {_array}}) => {
            objData.name = _array[0].name;
            objData.icon = _array[0].icon;
            //objData.usage = _array[0].usage;

            this.createEvent(0, timestamp, objData, onError, null);
            this.updateSymptomUsage(symptomID, onError, onSuccess);
          }, 
          (_, param) => alert("-create events: " + JSON.stringify(param)));
      });
    }

    updateSymptomEvent(eventID, symptomID, severity, note, onError, onSuccess) {
      let objData = {
        symptomID,
        //name: "",
        //icon: "",
        severity,
        note
      }

      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM symptoms WHERE id = ?', [symptomID], 
          (_, {rows: {_array}}) => {
            objData.name = _array[0].name;
            objData.icon = _array[0].icon;

            this.updateEvent(eventID, objData, onError, onSuccess);
          }, 
          (_, param) => alert("-create events: " + JSON.stringify(param)));
      });
    }

    /******************************************************************* 
     *                          FOOD TRACKER 
     *******************************************************************/   

    createMealEvent(name, type, tag, rating, note, icon, timestamp, onError, onSuccess) {
      let objData = {
        name,
        type,
        tag,
        rating,
        icon,
        note
      }
      
      this.createEvent(1, timestamp, objData, onError, onSuccess);
    }

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

    createEmotionEvent(type, note, timestamp, onError, onSuccess) {
      let objData = {
        type,
        note
      }
      
      this.createEvent(2, timestamp, objData, onError, onSuccess);
    }

    updateEmotionEvent(eventID, type, note, onError, onSuccess) {
      let objData = {
        type,
        note
      }

      this.updateEvent(eventID, objData, onError, onSuccess);
    }    

    /******************************************************************* 
     *                          EVENT TRACKER
     ********************************************************************/   

    createEvent(eventType, timestamp, objData, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('INSERT INTO events (eventType, created, objData) VALUES (?, ?, ?)', [eventType, timestamp, JSON.stringify(objData)]);
      }, onError, onSuccess);
    }

    updateEvent(eventID, objData, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('UPDATE events SET (modified, objData) VALUES (?, ?) WHERE id = ?', [Date.now(), objData, eventID]);
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
                      + 'ORDER BY created DESC', [start.getTime(), end.getTime()], onSuccess, onError);
        });
      } else {
        this.db.transaction(tx => {
          tx.executeSql('SELECT * FROM events ORDER BY created DESC', null, onSuccess, onError);
        });
      }
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
          tx.executeSql('SELECT * FROM settings WHERE name = ?', [name], onSuccess, onError);
        });
      }
    }

    saveSettings(name, objData, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('REPLACE INTO settings (name, objData) VALUES (?, ?)', [name, JSON.stringify(objData)]);
      }, onError, onSuccess);
    }
}