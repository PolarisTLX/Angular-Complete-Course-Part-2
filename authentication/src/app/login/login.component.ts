import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => {
        if (result) {
          // first line below is to store if the user had an intended destination before they were re-routed to login first
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          // you will returnUrl in the browser address
          this.router.navigate([returnUrl || '/']);
          // if there was an intended destination first "returnUrl", send them there, if not send them back to the standard home page '/'
        } else {
          this.invalidLogin = true;
        }
      });
  }
}
