export default class UploadManager {
  /**
   * @returns {UploadManager}
   */
  static getInstance() {
    if (UploadManager.instance == null) {
      UploadManager.instance = new UploadManager();
    }
    
    return UploadManager.instance;
  }
  
  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
  
  uploadData(data) {
    console.log('Uploading data for ' + this.token);
    fetch('http://localhost:5004/desqol/upload_data', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Token': this.token,
      },
      body: JSON.stringify(data),
    });
  }
}
