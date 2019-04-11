import auth0 from 'auth0-js';

class Auth {
  accessToken;
  idToken;
  profile;
  expiresAt;

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'zebi.auth0.com',
      audience: 'https://zebi.auth0.com/userinfo',
      clientID: 'kwPbmKxIpo82aBbuiJif1An7BnLSeT6R',
      redirectUri: window.origin + '/callback',
      responseType: 'token id_token',
      scope: 'openid email profile'
    });
    this.authFlag = 'isLoggedIn';

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.silentAuth = this.silentAuth.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  getProfile() {
    return this.profile;
  }

  setSession(authResult) {
    // Set auth flag in localStorage
    localStorage.setItem(this.authFlag, JSON.stringify(true));

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    this.profile = {
      studentUUID: authResult.idTokenPayload["https://raft.one/uuid"],
      email: authResult.idTokenPayload.email,
      firstName: authResult.idTokenPayload.given_name,
      lastName: authResult.idTokenPayload.family_name,
      linkedInPhotoURL: authResult.idTokenPayload.picture
    };

    console.log(this.profile);
  }

  handleAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        console.log(authResult);
        if (err) {
          localStorage.removeItem(this.authFlag);
          return reject(err);
        }
        if (!authResult || !authResult.idToken || !authResult.accessToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) {
          localStorage.removeItem(this.authFlag);
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });    
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    this.profile = null;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      return_to: window.location.origin
    });
  }

  isAuthenticated() {
    return JSON.parse(localStorage.getItem(this.authFlag));
  }
}

const auth = new Auth();

export default auth;
