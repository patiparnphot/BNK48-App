import { Component, OnInit } from '@angular/core';
import { Userprofile } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { IdolService } from '../idol.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userprofile: Userprofile;

  constructor(
    private route: ActivatedRoute,
    private idolService: IdolService
  ) {};

  ngOnInit() {
    this.getUserProfile();
  };

  getUserProfile(): void {
    const authorid = +this.route.snapshot.paramMap.get('authorid');
    this.idolService.getUserProfile(authorid)
    .subscribe(userprofile => this.userprofile = userprofile);
  };

}
