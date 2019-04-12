import auth0 from 'auth0-js';

class Auth {
  accessToken;
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
    this.authFlag = 'is_logged_in';
    this.profileFlag = 'profile';
    this.idTokenFlag = 'id_token';

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
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
    return localStorage.getItem(this.idTokenFlag);
  }

  getProfile() {
    return JSON.parse(localStorage.getItem(this.profileFlag));
  }

  setSession(authResult) {
    // Set auth flag in localStorage
    localStorage.setItem(this.authFlag, JSON.stringify(true));

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    localStorage.setItem(this.idTokenFlag, authResult.idToken);
    this.expiresAt = expiresAt;
    localStorage.setItem(this.profileFlag, JSON.stringify({
      studentUUID: authResult.idTokenPayload["https://raft.one/uuid"],
      email: authResult.idTokenPayload.email,
      firstName: authResult.idTokenPayload.given_name,
      lastName: authResult.idTokenPayload.family_name,
      linkedInPhotoURL: authResult.idTokenPayload.picture
    }));
  }

  handleAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          this.emptyLocalStorage();
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
    if (this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            this.emptyLocalStorage();
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });    
    }
  }

  logout() {
    this.accessToken = null;
    this.expiresAt = 0;

    this.emptyLocalStorage();

    this.auth0.logout({
      return_to: window.location.origin
    });
  }

  emptyLocalStorage() {
    localStorage.removeItem(this.authFlag);
    localStorage.removeItem(this.idTokenFlag);
    localStorage.removeItem(this.profileFlag);
  }

  // this is Auth0 authentication, NOT actual authentication
  isAuthenticated() {
    return JSON.parse(localStorage.getItem(this.authFlag));
  }
}

const auth = new Auth();

export default auth;
