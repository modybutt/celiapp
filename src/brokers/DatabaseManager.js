import { SQLite } from 'expo';
import { images as SymptomIcons } from '../components/SymptomTracker/SymptomIconButtonConstants';

export default class DatabaseManager {

    constructor() {
        this.insertSymptom = this.insertSymptom.bind(this);
        this.updateSymptom = this.updateSymptom.bind(this);
        this.fetchSymptoms = this.fetchSymptoms.bind(this);
        this.fetchHistory = this.fetchHistory.bind(this);
    }

    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (DatabaseManager.instance == null) {
            DatabaseManager.instance = new DatabaseManager();

            this.instance.db = SQLite.openDatabase('app.db');
            this.instance.db.transaction(tx => {
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS symptom_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT);');
              tx.executeSql(
                'INSERT OR IGNORE INTO symptom_items VALUES '
                + '(1, "' + SymptomIcons.cloating.imgName + '", "' + SymptomIcons.cloating.uri + '"),'
                + '(2, "' + SymptomIcons.diarrhea.imgName + '", "' + SymptomIcons.diarrhea.uri + '"),'
                + '(3, "' + SymptomIcons.headache.imgName + '", "' + SymptomIcons.headache.uri + '"),'
                + '(4, "' + SymptomIcons.irritability.imgName + '", "' + SymptomIcons.irritability.uri + '"),'
                + '(5, "' + SymptomIcons.stomachAcheimgName + '", "' + SymptomIcons.stomachAche + '"),'
                + '(6, "' + SymptomIcons.vomiting.imgName + '", "' + SymptomIcons.vomiting.uri + '"),'
                + '(7, "' + SymptomIcons.weightLoss.imgName + '", "' + SymptomIcons.weightLoss.uri + '");');
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS symptom_events (id INTEGER PRIMARY KEY AUTOINCREMENT, symptomID INTEGER NOT NULL, severity INTEGER NOT NULL, created INT, modified INT, note TEXT);');
            });
        }

        return this.instance;
    }

    // JSON.stringify(item)
    //createSymptom()

    insertSymptom(symptomID, severity, note, timestamp, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('INSERT INTO symptom_events (symptomID, severity, created, note) VALUES (?, ?, ?, ?)', [symptomID, severity, timestamp, note]);
      }, onError, onSuccess);
    }

    updateSymptom(eventID, severity, note, timestamp, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('UPDATE symptom_events SET (severity, modified, note) values (?, ?) WHERE id = ?', [severity, timestamp, note, eventID]);
      }, onError, onSuccess);
    }

    fetchSymptoms(timestamp, onError, onSuccess) {
      if (timestamp == null) {
        timestamp = Date.now();
      }

      let start = new Date(timestamp);
      let end = new Date(timestamp);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);

      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM symptom_items INNER JOIN symptom_events ON symptom_events.symptomID = symptom_items.id '
                    + 'WHERE symptom_events.created BETWEEN ? AND ? '
                    + 'ORDER BY symptom_events.created DESC', [start.getTime(), end.getTime()], onSuccess, onError);
      });
    }

    fetchHistory(onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM symptom_items INNER JOIN symptom_events ON symptom_events.symptomID = symptom_items.id '
                    + 'ORDER BY symptom_events.created DESC', null, onSuccess, onError);
      });
    }
}