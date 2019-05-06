import { SQLite } from 'expo';

import Alert from 'react-native';

export default class DatabaseManager {

    constructor() {
        this.insertSymptom = this.insertSymptom.bind(this);
        this.updateSymptom = this.updateSymptom.bind(this);
        this.fetchSymptoms = this.fetchSymptoms.bind(this);
        this.fetchStaticData = this.fetchStaticData.bind(this);
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
                + '(1, "Cloating", "../assets/images/SymptomTracker/cloating.png"), '
                + '(2, "Diarrhea", "../assets/images/SymptomTracker/diarrhea.png"), '
                + '(3, "Headache", "../assets/images/SymptomTracker/headache.png"), '
                + '(4, "Irritability", "../assets/images/SymptomTracker/irritability.png"), '
                + '(5, "StomacheAche", "../assets/images/SymptomTracker/stomacheAche.png"), '
                + '(6, "Vomiting", "../assets/images/SymptomTracker/vomiting.png"), '
                + '(7, "WeightLoss", "../assets/images/SymptomTracker/weightLoss.png");');
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS symptom_events (id INTEGER PRIMARY KEY AUTOINCREMENT, symptomID INTEGER NOT NULL, severity INTEGER NOT NULL, created INT, modified INT, note TEXT);');
            });
        }

        return this.instance;
    }

    //createSymptom()

    insertSymptom(symptomID, severity, note, timestamp, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('INSERT INTO symptom_events (symptomID, severity, created, note) VALUES (?, ?, ?, ?)', [symptomID, severity, timestamp, note]);
      }, onError, onSuccess);
    }

    updateSymptom(symptomID, severity, note, timestamp, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('UPDATE symptom_events SET (severity, modified, note) values (?, ?) WHERE id = ?', [severity, timestamp, note, symptomID]);
      }, onError, onSuccess);
    }

    fetchSymptoms(onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM symptom_events INNER JOIN symptom_items ON symptom_events.symptomID = symptom_items.id;', null, onSuccess, onError);
      });
    }

    // DEPRECATED
    fetchStaticData(onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM symptom_items;', null, onSuccess, onError);
      });
    }
}