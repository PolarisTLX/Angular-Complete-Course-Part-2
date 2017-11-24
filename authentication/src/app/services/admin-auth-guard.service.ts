// this file is to allow access to "/admin" part of site, only if the user JWT token has admin: true

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    // make sure that the user is not null && check the admin property
    // could make this shorter by putting the repeating part into a variable before it
    if (this.authService.currentUser && this.authService.currentUser.admin) {
      return true;
    }

    this.router.navigate(['/no-access']);
    return false;
  }

}
