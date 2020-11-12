
export default class TokenManager {
    static LOGIN_USER_URL = 'https://jira.itcarlow.ie/desqol-auth/login';
    static REGISTER_USER_URL = 'https://jira.itcarlow.ie/desqol-auth/registration';

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
        this.fetchNewToken(email, pw, onError, onLoginFailed, onSuccess);
    }

    refreshToken(username, pw, onError, onLoginFailed, onSuccess) {
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
                if (statusCode === 200) {
                    onSuccess(res, { username, pw })
                } else if (statusCode === 403) {
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
                if (statusCode === 200) {
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
                // eat up
                //onFatalError(error, {nickname, email, pw})
            });
    }
}
