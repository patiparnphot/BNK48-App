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
  authorid = "";

  constructor(
    private route: ActivatedRoute,
    private idolService: IdolService
  ) {};

  ngOnInit() {
    this.authorid = this.route.snapshot.params.authorid;
    this.getUserProfile();
  };

  getUserProfile(): void {
    this.idolService.getUserProfile(this.authorid)
    .subscribe((userprofile: Userprofile) => this.userprofile = userprofile);
  };

}
