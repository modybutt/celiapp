import { SQLite } from 'expo';
import { images as SymptomIcons } from '../components/SymptomTracker/SymptomIconButtonConstants';

export default class DatabaseManager {

    constructor() {
        this.insertSymptom = this.insertSymptom.bind(this);
        this.updateSymptom = this.updateSymptom.bind(this);
        this.fetchSymptoms = this.fetchSymptoms.bind(this);
        this.insertMeal = this.insertMeal.bind(this);
        this.updateMeal = this.updateMeal.bind(this);
        this.fetchMeals = this.fetchMeals.bind(this);
        this.insertEmotion = this.insertEmotion.bind(this);
        this.updateEmotion = this.updateEmotion.bind(this);
        this.fetchEmotions = this.fetchEmotions.bind(this);
        this.fetchTrackings = this.fetchTrackings.bind(this);
    }

    /**
     * @returns {DatabaseManager}
     */
    static getInstance() {
        if (DatabaseManager.instance == null) {
            DatabaseManager.instance = new DatabaseManager();

            this.instance.db = SQLite.openDatabase('app.db');
            this.instance.db.transaction(tx => {
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS symptoms (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT, created INT, modified INT, usage INT);');
              tx.executeSql(
                'INSERT OR IGNORE INTO symptoms VALUES '
                + '(1, "Cloating", ' + require('../assets/images/SymptomTracker/cloating.png') + ', 0),'
                + '(2, "Diarrhea", ' + require('../assets/images/SymptomTracker/diarrhea.png') + ', 0),'
                + '(3, "Headache", ' + require('../assets/images/SymptomTracker/headache.png') + ', 0),'
                + '(4, "Irritability", ' + require('../assets/images/SymptomTracker/irritability.png') + ', 0),'
                + '(5, "Stomachache", ' + require('../assets/images/SymptomTracker/stomachAche.png') + ', 0),'
                + '(6, "Vomiting", ' + require('../assets/images/SymptomTracker/vomiting.png') + ', 0),'
                + '(7, "WeightLoss", ' + require('../assets/images/SymptomTracker/weightLoss.png') + ', 0);');
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, eventType INT, created INT, modified INT, objData TEXT);');
            }, () => alert("DB Setup failed!"));
        }

        return this.instance;
    }

    /******************************************************************* 
     *                          SYMPTOM TRACKER 
     *******************************************************************/

    createSymptom(name, icon, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('INSERT INTO symptoms (name, icon, created) VALUES (?, ?, ?)', [name, icon, Date.now()])
      }, onError, onSuccess);
    }

    updateSymptom(symptomID, name, icon, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('UPDATE symptoms SET (name, icon, modified) VALUES (?, ?, ?) WHERE id = ?', [name, icon, Date.now(), symptomID]);
      }, onError, onSuccess);
    }

    /******************************************************************* 
     *                          FOOD TRACKER 
     *******************************************************************/   

    

    /******************************************************************* 
     *                          EMOTION TRACKER 
     ********************************************************************/

    

    /******************************************************************* 
     *                          EVENT TRACKER
     ********************************************************************/   

    insertEvent(eventType, timestamp, objData, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('INSERT INTO events (eventType, created, objData) VALUES (?, ?, ?)', [eventType, timestamp, objData]);
      }, onError, onSuccess);
    }

    updateEvent(eventID, objData, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('UPDATE events SET (modified, objData) VALUES (?, ?) WHERE id = ?', [Date.now(), objData, eventID]);
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
                      + 'WHERE events.created BETWEEN ? AND ? '
                      + 'ORDER BY created DESC',  [start.getTime(), end.getTime()], onSuccess, onError);
        });
      } else {
        this.db.transaction(tx => {
          tx.executeSql('SELECT * FROM events ORDER BY created DESC', null, onSuccess, onError);
        });
      }
    }   
}