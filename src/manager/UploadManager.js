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
  
  uploadData(data, onSuccess) {
    console.log('Uploading data for ' + this.token);
    fetch('http://jira.itcarlow.ie:443/desqol/upload_data', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Token': this.token,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        console.log("Upload succeeded!");
        onSuccess();
      } else {
        console.log("Upload failed!");
      }
    });
  }
}
