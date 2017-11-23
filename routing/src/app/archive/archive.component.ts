import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  year: number;
  month: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    let params = this.route.snapshot.paramMap;
    // this.route.snapshot.paramMap.get('year');
    // this.route.snapshot.paramMap.get('month');
    // these long lines were shorted by putting the repeating long part into a variable above
    this.year = +params.get('year');  // + to convert string to number
    this.month = +params.get('month');
  }

  // function tied to button at each archive page to allow user to go back to the main page
  viewAll() {
    this.router.navigate(['/']);
    // '/' is the "blank" path or home page
  }

}
