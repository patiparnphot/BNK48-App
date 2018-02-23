import { Component, OnInit, Input } from '@angular/core';
import { Idol } from '../idol.model';
import { User } from '../user.model';
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
  currentUser: User;
  addcomment: Commentform;

  constructor(
    private route: ActivatedRoute,
    private idolService: IdolService,
    private router: Router
  ) {};

  ngOnInit() {
    this.getIdol();
    this.getCurrentUser();
  };
  
  getCurrentUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('usersess'))
  };

  getIdol(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.idolService.getIdol(id)
    .subscribe(idol => this.idol = idol);
  };

  deleteIdol(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.idolService.deleteIdol(id).subscribe(() => this.goBack());
  };

  addComment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.idolService.addComment(id, this.addcomment).subscribe(idol => this.idol = idol);
  };

  updateComment(text: String, commentid: number): void{
    text = text.trim();
    if (!text) { return; }
    const id = +this.route.snapshot.paramMap.get('id');
    this.idolService.updateComment(id, commentid, { text } as Commentform).subscribe(idol => this.idol = idol);
  };

  deleteComment(commentid: number): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.idolService.deleteComment(id, commentid).subscribe(idol => this.idol = idol);
  };

  goBack() {
    this.router.navigate(['/']);
  };
}
