import { SQLite } from 'expo';

export default class DatabaseManager {

    constructor() {
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (DatabaseManager.instance == null) {
            DatabaseManager.instance = new DatabaseManager();
            this.instance.db = SQLite.openDatabase('app.db');
        }

        return this.instance;
    }

    insert(text, onError, onSuccess) {
      // is text empty?
      if (text === null || text === '') {
        return false;
      }
  
      this.db.transaction(tx => {
        tx.executeSql('insert into items (done, value) values (0, ?)', [text]);
      }, onError, onSuccess);
    }

    getAll(done, onError, onSuccess) {
      this.db.transaction(tx => {
        tx.executeSql('select * from items where done = ?;', [done ? 1 : 0], onSuccess, onError);
      });
    }
}