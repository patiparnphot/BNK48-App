import { Component, OnInit } from '@angular/core';
import { Currently } from '../user.model';
import { Router } from '@angular/router';
import { IdolService } from '../idol.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: Currently;
  user = {
    username: "",
    password: ""
  };
  currently = {
    username: null,
    password: null,
    _id: null,
    isAdmin: false
  };

  constructor(
    private idolService: IdolService,
    private router: Router
  ) {};

  ngOnInit() {
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

  signout(): void {
    this.idolService.signOut();
    localStorage.clear();
    this.goBack();
  };
    
  goBack(): void {
    this.router.navigate(['/signin']);
  };
}
