import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
// export class GithubProfileComponent implements OnInit {
export class GithubProfileComponent {

  // constructor(private route: ActivatedRoute) { }
  constructor(private router: Router) { }

  submit() {
    this.router.navigate(['/followers'], {
      queryParams: { page: 1, order: 'newest'}
    });
  }

  // ngOnInit() {
  //   // route parameters are defined as Observables, which is the line of code below
  //   // this allows Angular to not destroy and recreate a whole component everytime when only the route needs to be changed
  //   this.route.paramMap.subscribe(params => {
  //       // console.log(params);
  //       // let id = +params.get('id'); // the + is to convert the string into a number
  //       // console.log(id);
  //       console.log(params.get('id'));
  //     })
  //
  //   // if certain that user MUST move a way from this page for a certain action, can use a "snapshot":
  //   let id = this.route.snapshot.paramMap.get('id');
  //   console.log(id);
  // }

}
