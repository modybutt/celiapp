
export default class TokenManager {
    static LOGIN_USER_URL = 'https://jira.itcarlow.ie/desqol-auth/login';
    static REGISTER_USER_URL = 'https://jira.itcarlow.ie/desqol-auth/registration';
    static OK = 200; // to del
    static FORBIDDEN = 403; // to del
    static CONFLICT = 409; // to del
    static BAD_REQUEST = 400; // to del

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
                if (statusCode === TokenManager.OK) {
                    onSuccess(res, { username, pw })
                } else if (statusCode === TokenManager.FORBIDDEN) {
                    onLoginFailed(res, { username, pw })
                }
            }).catch(error => {
                onError(error, { username, pw })
                //return { name: "network error", description: "" };
            });
    }

    registerUser(nickname, email, pw, onFatalError, onRegisterFailed, onSuccess) {

        fetch(TokenManager.REGISTER_USER_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //'X-Token': this.token,
            },
            body: JSON.stringify({
                "nickname": nickname,
                "email": email,
                "password": pw
            })
        })
            .then(this.processResponse)
            .then(res => {
                const { statusCode, data } = res;
                if (statusCode === TokenManager.OK) {
                    console.log("registration ok!");
                    onSuccess(res, { nickname, email, pw })
                    return;
                } else if (statusCode === 400 || statusCode === 403 || statusCode === 409) {
                    console.log("user already registerd || not whitelisted?", statusCode)
                    onRegisterFailed(res, { nickname, email, pw })
                    return;
                } else {
                    console.log("unhandled status code", statusCode)
                    return;
                }
            }).catch(error => {
                //onFatalError(error, {nickname, email, pw})
            });
    }
}
