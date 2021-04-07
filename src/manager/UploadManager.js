export default class UploadManager {
  static UPLOAD_DATA_URL = 'https://jira.itcarlow.ie/desqol/upload_data';
  static UPLOAD_GIP_IMAGE_URL = 'https://jira.itcarlow.ie/desqol/upload_gip';
  static UPLOAD_PUSH_NOTIFICATION_URL = 'https://jira.itcarlow.ie/desqol/upload_push_token';
  
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
          data.events.length + ' events'
        );
        onSuccess();
      } else {
        console.warn('Upload failed!');
      }
    });
  }

  uploadGIPImage(image, onSuccess){
    var photo = {
      uri: image.uri,
      type: 'image/jpeg',
      name: 'gip.jpg',
    };
    
    var form = new FormData();
    form.append("image", photo);
    
    console.log('uploading image');

    console.log(image.uri);
    
    fetch(
      UploadManager.UPLOAD_GIP_IMAGE_URL,
      {
        body: form,
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Token': this.token
        },
      }
    ).then((response) => {
      if (response.ok) {
        console.log('Uploaded image sucessfully');
        onSuccess();
      } else {
        console.warn('Upload image failed!' + response.statusText + ":" + response.status);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  uploadPushToken(pushToken, onSuccess) {
    console.log('Uploading token for ' + this.token);
    fetch(UploadManager.UPLOAD_PUSH_NOTIFICATION_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Token': this.token,
      },
      body: JSON.stringify({'pushToken': pushToken}),
    }).then((response) => {
      console.log('XXX ' + JSON.stringify(response));
      if (response.ok) {
        console.log('Uploaded push token ' + pushToken);
        onSuccess();
      } else {
        console.warn('Upload of push token failed!');
      }
    });
  }
}
