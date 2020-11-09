
export default class TokenManager {
    static LOGIN_USER_URL = 'https://jira.itcarlow.ie/desqol-auth/login';
    static STATUS_LOGIN_OK = 200;
    static WRONG_CREDENTIALS = 403;

    static getInstance() {
        if (TokenManager.instance == null) {
            TokenManager.instance = new TokenManager();
        }
        return this.instance;
    }

    processResponse(response) {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1]
        }));
    }

    login(email, pw, onError, onLoginFailed, onSuccess) {
        console.log("Tkn Mngr: logging in!");
        this.fetchNewToken(email, pw, onError, onLoginFailed, onSuccess);
    }

    refreshToken(username, pw, onError, onLoginFailed, onSuccess) {
        console.log("Tkn Mngr: refreshing Tkn!");
        this.fetchNewToken(username, pw, onError, onLoginFailed, onSuccess);
    }

    fetchNewToken(username, pw, onError, onLoginFailed, onSuccess) {

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
        })
            .then(this.processResponse)
            .then(res => {
                const { statusCode, data } = res;
                if (statusCode === TokenManager.STATUS_LOGIN_OK) {
                    onSuccess(res, { username, pw })
                } else if (statusCode === TokenManager.WRONG_CREDENTIALS) {
                    onLoginFailed(res, { username, pw })
                }
            }).catch(error => {
                onError(error, {username, pw})
                //return { name: "network error", description: "" };
            });
    }
}
