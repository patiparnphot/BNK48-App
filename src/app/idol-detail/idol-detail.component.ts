import { Component, OnInit, Input } from '@angular/core';
import { Idol } from '../idol.model';
import { Currently } from '../user.model';
import { Commentform } from '../comment.model';
import { ActivatedRoute } from '@angular/router';
import { IdolService } from '../idol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-idol-detail',
  templateUrl: './idol-detail.component.html',
  styleUrls: ['./idol-detail.component.css']
})
export class IdolDetailComponent implements OnInit {
  idol: Idol;
  currentUser: Currently;
  currently = {
    username: null,
    password: null,
    _id: null,
    isAdmin: false
  };
  addcomment: any = {
    text: ""
  };
  id = "";

  constructor(
    private route: ActivatedRoute,
    private idolService: IdolService,
    private router: Router
  ) {};

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getIdol();
    this.getCurrentUser();
  };
  
  getCurrentUser(): void {
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    let _id = localStorage.getItem('_id');
    let isAdmin = false;
    if(localStorage.getItem('isAdmin') == 'true'){
      isAdmin = true
    }
    if(username){
      this.currently.username = username;
      this.currently.password = password;
      this.currently._id = _id;
      this.currently.isAdmin = isAdmin;
      this.currentUser = this.currently;
    }
  };

  getIdol(): void {
    this.idolService.getIdol(this.id)
    .subscribe(idol => this.idol = idol);
  };

  deleteIdol(): void {
    this.idolService.deleteIdol(this.id).subscribe(() => this.goBack());
  };

  addComment(): void {
    this.idolService.addComment(this.id, this.addcomment).subscribe(idol => this.idol = idol);
  };

  updateComment(text: string, commentid: number): void{
    text = text.trim();
    if (!text) { return; }
    this.idolService.updateComment(this.id, commentid, { text } as Commentform).subscribe(idol => this.idol = idol);
  };

  deleteComment(commentid: number): void {
    this.idolService.deleteComment(this.id, commentid).subscribe(idol => this.idol = idol);
  };

  goBack() {
    this.router.navigate(['/']);
  };
}
