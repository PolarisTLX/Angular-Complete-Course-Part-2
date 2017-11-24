// this file is to only allow users to deeper pages if they are logged in

import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
// export class AuthGuardService {
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  // canActivate() {
  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) { return true; }

    // isLoggedIn() is false, then whereever user tries to go, redirect to the login page
    // the second argument is to allow the site to store the INTENDED destination
    // so that use is sent there after they are asked to log in, like they wanted
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
