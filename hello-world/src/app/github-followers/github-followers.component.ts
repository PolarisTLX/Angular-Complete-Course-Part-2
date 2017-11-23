import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// to combine Observables to be able to have more than one:
import 'rxjs/add/observable/combineLatest';
// to avoid calling .subscribe within a .subscribe:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService) { }

  ngOnInit() {
    // to combine Observables to be able to have more than one:
    Observable.combineLatest([
      // this array holds the list of observables:
      this.route.paramMap,
      this.route.queryParamMap
    ])
      // to combine the .subscribes:
      .switchMap(combined => {
      // switchMap is used instead of .map
      // to avoid compilations errors due to the kinds of objects each part/Observable returns
      let id = combined[0].get('id');  // combined[0] is the 1st Observable above
      let page = combined[1].get('page');  // combined[1] is the 2nd Observable above


      return this.service.getAll()
      // below is no longer needed:
      // .subscribe(followers => this.followers = followers);
    })
      .subscribe(followers => this.followers = followers); // {
      // all this code was moved above (or modified) to combine the subscribes:
      // .subscribe(combined => {
      //   let id = combined[0].get('id');  // combined[0] is the 1st Observable above
      //   let page = combined[1].get('page');  // combined[1] is the 2nd Observable above
      //
      // // this.service.getAll({ id: id, page: page })
      // this.service.getAll()
      //   .subscribe(followers => this.followers = followers);
   // });

    // the two Observables below have been combined into one new one above

    // this.route.paramMap
    //   .subscribe(params => {
    //
    //   });
    // // let id = this.route.snapshot.paramMap.get('id');
    //
    // this.route.queryParamMap
    //   .subscribe(params => {
    //
    //   });
    // // let page = this.route.snapshot.queryParamMap.get('page');

  }
}
