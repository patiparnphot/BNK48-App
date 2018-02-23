import { Component, OnInit, Input } from '@angular/core';
import { Userlogin } from '../user.model';
import { IdolService } from '../idol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: Userlogin;
  

  constructor(
    private idolService: IdolService,
    private router: Router
  ) { };

  ngOnInit() {
  };

  signin(): void {
    this.idolService.signIn(this.user).subscribe(resp => {
      localStorage.setItem('usersess', JSON.stringify(resp));
      this.goBack();
    });
  };
  
  goBack() {
    this.router.navigate(['/']);
  };
}
