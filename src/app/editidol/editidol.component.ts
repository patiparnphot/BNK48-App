import { Component, OnInit, Input } from '@angular/core';
import { Idol, Idolform } from '../idol.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IdolService } from '../idol.service';

@Component({
  selector: 'app-editidol',
  templateUrl: './editidol.component.html',
  styleUrls: ['./editidol.component.css']
})
export class EditidolComponent implements OnInit {
  idol: Idol;
  idolform: Idolform;

  constructor(
    private route: ActivatedRoute,
    private idolService: IdolService,
    private location: Location
  ) {};

  ngOnInit() {
    this.getIdol();
    this.getIdolform();
  };

  getIdol(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.idolService.getIdol(id)
    .subscribe(idol => this.idol = idol);
  };
  
  getIdolform(): void {
    this.idolform.firstname = this.idol.firstname;
    this.idolform.lastname = this.idol.lastname;
    this.idolform.nickname = this.idol.nickname;
    this.idolform.aka = this.idol.aka;
    this.idolform.height = this.idol.height;
    this.idolform.bloodgroup = this.idol.bloodgroup;
    this.idolform.address = this.idol.address;
    this.idolform.favcolor = this.idol.favcolor;
    this.idolform.favfood = this.idol.favfood;
    this.idolform.hobby = this.idol.hobby;
    this.idolform.lang = this.idol.lang;
    this.idolform.edu.university = this.idol.edu.university;
    this.idolform.edu.highschool = this.idol.edu.highschool;
    this.idolform.image = this.idol.image;
    this.idolform.description = this.idol.description;
  };
  
  updateIdol(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.idolService.updateIdol(id, this.idolform).subscribe(() => this.goBack());
  };
  
  goBack(): void {
    this.location.back();
  };
}
