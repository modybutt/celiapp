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
              /** SYMPTOM TRACKER */
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS symptom_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT);');
              tx.executeSql(
                'INSERT OR IGNORE INTO symptom_items VALUES '
                + '(1, "' + SymptomIcons.cloating.imgName + '", "' + SymptomIcons.cloating.uri + '"),'
                + '(2, "' + SymptomIcons.diarrhea.imgName + '", "' + SymptomIcons.diarrhea.uri + '"),'
                + '(3, "' + SymptomIcons.headache.imgName + '", "' + SymptomIcons.headache.uri + '"),'
                + '(4, "' + SymptomIcons.irritability.imgName + '", "' + SymptomIcons.irritability.uri + '"),'
                + '(5, "' + SymptomIcons.stomachAcheimgName + '", "' + SymptomIcons.stomachAche.uri + '"),'
                + '(6, "' + SymptomIcons.vomiting.imgName + '", "' + SymptomIcons.vomiting.uri + '"),'
                + '(7, "' + SymptomIcons.weightLoss.imgName + '", "' + SymptomIcons.weightLoss.uri + '");');
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS symptom_events (id INTEGER PRIMARY KEY AUTOINCREMENT, symptomID INTEGER NOT NULL, severity INTEGER NOT NULL, created INT, modified INT, note TEXT);');
              /** FOOD TRACKER */
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS meal_events (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type INT, tag INT, rating INT, created INT, modified INT, note TEXT);');
              /** EMOTION TRACKER */
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS emotion_events (id INTEGER PRIMARY KEY AUTOINCREMENT, type INT, created INT, modified INT, note TEXT);');

              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, type INT, created INT, objData TEXT);');
            }, () => alert("DB Setup failed!"));
        }

        return this.instance;
    }

    // JSON.stringify(item)

    /******************************************************************* 
     *                          SYMPTOM TRACKER 
     *******************************************************************/

    //createSymptom()

    insertSymptom(symptomID, severity, note, timestamp, onError, onSuccess) {
      event = {
        severity: severity,
        note: note
      }
      
      this.db.transaction(tx => {
        tx.executeSql('INSERT INTO symptom_events (symptomID, severity, created, note) VALUES (?, ?, ?, ?)', [symptomID, severity, timestamp, note]);
      }, onError, onSuccess);
    }

    updateSymptom(eventID, severity, note, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('UPDATE symptom_events SET (severity, modified, note) VALUES (?, ?) WHERE id = ?', [severity, Date.now(), note, eventID]);
      }, onError, onSuccess);
    }

    fetchSymptoms(timestamp, onError, onSuccess) {
      if (timestamp != null) {
        let start = new Date(timestamp);
        let end = new Date(timestamp);
        start.setHours(0, 0, 0);
        end.setHours(23, 59, 59);

        this.db.transaction(tx => {
          tx.executeSql('SELECT * FROM symptom_items INNER JOIN symptom_events ON symptom_events.symptomID = symptom_items.id '
                      + 'WHERE symptom_events.created BETWEEN ? AND ? '
                      + 'ORDER BY symptom_events.created DESC', [start.getTime(), end.getTime()], onSuccess, onError);
        });
      } else {
        this.db.transaction(tx => {
          tx.executeSql('SELECT * FROM symptom_items INNER JOIN symptom_events ON symptom_events.symptomID = symptom_items.id '
                      + 'ORDER BY symptom_events.created DESC', null, onSuccess, onError);
        });
      }
    }

    /******************************************************************* 
     *                          FOOD TRACKER 
     *******************************************************************/   

    insertMeal(name, type, tag, rating, timestamp, note, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('INSERT INTO meal_events (name, type, tag, rating, created, note) VALUES (?, ?, ?, ?, ?, ?)', [name, type, tag, rating, timestamp, note]);
      }, onError, onSuccess);
    }

    updateMeal(mealID, name, type, tag, rating, note, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('UPDATE meal_events SET (name, type, tag, rating, modified, note) VALUES (?, ?, ?, ?, ?, ?) WHERE id = ?', [name, type, tag, rating, Date.now(), note, mealID]);
      }, onError, onSuccess);
    }

    fetchMeals(timestamp, onError, onSuccess) {
      if (timestamp != null) {
        let start = new Date(timestamp);
        let end = new Date(timestamp);
        start.setHours(0, 0, 0);
        end.setHours(23, 59, 59);

        this.db.transaction(tx => {
          tx.executeSql('SELECT * FROM meal_events '
                      + 'WHERE meal_events.created BETWEEN ? AND ? '
                      + 'ORDER BY meal_events.created DESC', [start.getTime(), end.getTime()], onSuccess, onError);
        });
      } else {
        this.db.transaction(tx => {
          tx.executeSql('SELECT * FROM meal_events '
                      + 'ORDER BY meal_events.created DESC', null, onSuccess, onError);
        });
      }
    }

    /******************************************************************* 
     *                          EMOTION TRACKER 
     ********************************************************************/

    insertEmotion(type, timestamp, note, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('INSERT INTO emotion_events (type, created, note) VALUES (?, ?, ?)', [type, timestamp, note]);
      }, onError, onSuccess);
    }

    updateEmotion(emotionID, type, note, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('UPDATE emotion_events SET (type, modified, note) VALUES (?, ?, ?) WHERE id = ?', [type, Date.now(), note, emotionID]);
      }, onError, onSuccess);
    }

    fetchEmotions(timestamp, onError, onSuccess) {
      if (timestamp != null) {
        let start = new Date(timestamp);
        let end = new Date(timestamp);
        start.setHours(0, 0, 0);
        end.setHours(23, 59, 59);

        this.db.transaction(tx => {
          tx.executeSql('SELECT * FROM emotion_events '
                      + 'WHERE emotion_events.created BETWEEN ? AND ? '
                      + 'ORDER BY emotion_events.created DESC', [start.getTime(), end.getTime()], onSuccess, onError);
        });
      } else {
        this.db.transaction(tx => {
          tx.executeSql('SELECT * FROM emotion_events '
                      + 'ORDER BY emotion_events.created DESC', null, onSuccess, onError);
        });
      }
    }

    /******************************************************************* 
     *                          TRACKER LOGGER
     ********************************************************************/   

// symptom: id, name, icon
// -event:  id, symptomID, severity, created, modified, note
// meal:    id, name, type, tag, rating, created, modified, note
// emote:   id, type, created, modified

// track: id, tableID, rowID, (name, icon, iconColor, created, modified)

    fetchTrackings(timestamp, onError, onSuccess) {
      if (timestamp != null) {
        let start = new Date(timestamp);
        let end = new Date(timestamp);
        start.setHours(0, 0, 0);
        end.setHours(23, 59, 59);

        this.db.transaction(tx => {
          tx.executeSql('SELECT symptom_events.id, symptom_items.name, symptom_items.icon, symptom_events.created FROM symptom_items INNER JOIN symptom_events ON symptom_events.symptomID = symptom_items.id '
                      + 'WHERE symptom_events.created BETWEEN ? AND ? '
                      + 'UNION ALL SELECT meal_events.id, meal_events.name, NULL AS icon, meal_events.created FROM meal_events '
                      + 'WHERE meal_events.created BETWEEN ? AND ? '
                      //+ 'UNION ALL SELECT emotion_events.id, NULL AS name, emotion_events.icon, emotion_events.created FROM emotion_events '
                      //+ 'WHERE emotion_events.created BETWEEN ? AND ? '
                      + 'ORDER BY created DESC',  [start.getTime(), end.getTime(), start.getTime(), end.getTime()], onSuccess, onError);
        });
      } else {
        this.db.transaction(tx => {
          tx.executeSql('SELECT symptom_events.id, symptom_items.name, symptom_items.icon, symptom_events.created FROM symptom_items INNER JOIN symptom_events ON symptom_events.symptomID = symptom_items.id '
                      + 'UNION ALL SELECT meal_events.id, meal_events.name, NULL AS icon, meal_events.created FROM meal_events '
                      //+ 'UNION SELECT * FROM emotion_events '
                      + 'ORDER BY created DESC', null, onSuccess, onError);
        });
      }
    }      
}