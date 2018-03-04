import { Component, OnInit, Input } from '@angular/core';
import { User, Userlogin } from '../user.model';
import { IdolService } from '../idol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user = {
    username: "",
    password: ""
  };
  

  constructor(
    private idolService: IdolService,
    private router: Router
  ) { };

  ngOnInit() {
  };

  signin(): void {
    this.idolService.signIn(this.user).subscribe((currentUser: User) => {
      let isAdmin = currentUser.isAdmin.toString();
      let _id = currentUser._id.toString();
      localStorage.setItem('username', currentUser.username);
      localStorage.setItem('password', this.user.password);
      localStorage.setItem('isAdmin', isAdmin);
      localStorage.setItem('_id', _id);
      this.goBack();
    });
  };
  
  goBack() {
    this.router.navigate(['/']);
  };
}
