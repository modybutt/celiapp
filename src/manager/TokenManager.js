
export default class TokenManager {
    static LOGIN_USER_URL = 'https://jira.itcarlow.ie/desqol-auth/login ';

    static getInstance() {
        if (TokenManager.instance == null) {
            TokenManager.instance = new TokenManager();

            //this.instance.db = SQLite.openDatabase(TokenManager.APP_DB);


        }
        return this.instance;
    }


    login(email, pw, onError, onSuccess){
        console.log("--> logging in!");
        this.fetchNewToken(email, pw, onError, onSuccess);
    }

    refreshToken(username, pw, onError, onSuccess){
        console.log("--> refreshing token!");
        this.fetchNewToken(username, pw, onError, onSuccess);
    }

    fetchNewToken(username, pw, onError, onSuccess) {

        //console.log("trying to print from tokenmanager", username, pw)

        fetch(TokenManager.LOGIN_USER_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //'X-Token': this.token,
            },
            body: JSON.stringify({
                "email": username,
                "password": pw
            })
        //}).then((response) => response.json())
        
        }).then((response) => response.json())
        .then((json) => {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", json)
            if (json.ok) {
              console.log('Logged In', json.text());
              onSuccess(json.json());
            } else {
              console.warn('login failed!');
              onError();
            }
          });
    }
}            
            
            
           /* 
            
            (response) => response.json())
        .then((json) => {
            console.log("returned to then --", json);
            return json;
        })
        .catch((error) => {
            console.log(error);
        }) */




        // working:
        