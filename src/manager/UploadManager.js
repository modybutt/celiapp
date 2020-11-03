export default class UploadManager {
  static UPLOAD_DATA_URL = 'https://jira.itcarlow.ie/desqol/upload_data';
  
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
    console.log("Uploading Logging", data);
    console.log('Uploading data for ' + this.token);
    fetch(UploadManager.UPLOAD_DATA_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Token': this.token,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        console.log('Uploaded ' +
          data.symptoms.length + ' symptoms and ' +
          data.events.length + ' events' +
          JSON.stringify(data)
        );
        onSuccess();
      } else {
        console.warn('Upload failed!');
      }
    });
  }
}
