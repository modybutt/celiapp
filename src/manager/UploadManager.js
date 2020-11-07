export default class UploadManager {
  static UPLOAD_DATA_URL = 'https://jira.itcarlow.ie/desqol/upload_data';
  //static REGISTRY_USER_URL ='https://jira.itcarlow.ie/desqol-auth/registration';
  static LOGIN_USER_URL = 'https://jira.itcarlow.ie/desqol-auth/login ';
  
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
    console.log('Uploading data for', this.token);
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
          data.events.length + ' events.'
        );
        onSuccess();
      } else {
        console.warn('Upload failed!');
      }
    });
  }

  registerNewUser(data, onSuccess) {
   // console.log('Register new user ' + this.token);

   /***************Payload to register new User*********************************/
   // var registery = JSON.stringify({"email":data.email,"password":data.password,"displayName":data.displayName});

   /****************Payload to login new User********************************* */
    var login = JSON.stringify({"email":data.email,"password":data.password});


    
    fetch(UploadManager.LOGIN_USER_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: login,
      redirect: 'follow'
    }).then((response) => {
      if (response.ok) {

        console.log('Registration successful'+' '+'Status: '+response.status);
  
        onSuccess();
      } else {
        console.warn('Registration failed!'+' '+'Status: '+response.status);
      }
    });
  }
}
