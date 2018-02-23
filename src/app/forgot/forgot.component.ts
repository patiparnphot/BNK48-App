import { Component, OnInit, Input } from '@angular/core';
import { IdolService } from '../idol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  email: String;

  constructor(
    private idolService: IdolService,
    private router: Router
  ) { };

  ngOnInit() {
  }

  forgotpassword(): void {
    this.idolService.forgot(this.email).subscribe(() => this.goBack())
  };

  goBack() {
    this.router.navigate(['/']);
  };
}
