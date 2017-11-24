import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) {
   return this.http.post('/api/authenticate',
      JSON.stringify(credentials))
        .map(response => {
          // console.log(response.json());
          let result = response.json();
          // if user puts in an invalid e-mail, what comes back is null
          // so check if result is not null below:
          if (result && result.token) {
            localStorage.setItem('token', result.token);
            return true;
          }
          // if login is not valid:
          return false;
        });
  }

  // to logout, simply delete the token in the local storage
  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {

    // there is a helper function built into AngularJWT to do all the below in one line:
    return tokenNotExpired();

    // what the built in function above does is all this below:
    // // get the JWT token, and check if it is not expired
    // let jwtHelper = new JwtHelper();
    // let token = localStorage.getItem('token');
    //
    // // check if token is valid / not null
    // if (!token) {
    //   return false;
    // }
    //
    // let expirationDate = jwtHelper.getTokenExpirationDate(token);
    // let isExpired = jwtHelper.isTokenExpired(token);
    //
    // // console.log("Expiration:", expirationDate);
    // // console.log("isExpired:", isExpired);
    //
    // // if it passes the above, the token is not expired
    // return !isExpired;
  }


  // to determine if user is an admin:
  // just add to the link in question *ngIf="authService.currentUser.admin"
  // authService is this file, currentUser is the function below
  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) { return null; }

    return new JwtHelper().decodeToken(token);
}


}
