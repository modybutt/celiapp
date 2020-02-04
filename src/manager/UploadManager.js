export default class UploadManager {
    
  static DESTINATION_FOLDER_ID = '1ngwQBE20rxrFKrwyrod8dctKyPF6Bdm7';
  static SCOPES = ['https://www.googleapis.com/auth/drive'];
  
  /**
   * @returns {UploadManager}
   */
  static getInstance() {
    if (UploadManager.instance == null) {
      UploadManager.instance = new UploadManager();
    }
    
    return UploadManager.instance;
  }
  
  setCredentials(credentials) {
    this.credentials = credentials;
  }

  getCredentials() {
    return this.credentials;
  }
  
  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
  
  uploadData(data) {
    console.log('Uploading data...');
  }
}
