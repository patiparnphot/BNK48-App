import { Component, OnInit, Input } from '@angular/core';
import { IdolService } from '../idol.service';
import { Userreset } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  reset = {
    password: "",
    confirm: ""
  };
  token = "";

  constructor(
    private route: ActivatedRoute,
    private idolService: IdolService,
    private router: Router
  ) {};

  ngOnInit() {
    this.token = this.route.snapshot.params.token;
  };

  resetpassword(): void {
    this.idolService.reset(this.token, this.reset).subscribe(() => this.goBack())
  };

  goBack() {
    this.router.navigate(['/']);
  };
}
