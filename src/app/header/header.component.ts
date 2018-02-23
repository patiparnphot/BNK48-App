import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { IdolService } from '../idol.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private idolService: IdolService) { };

  ngOnInit() {
    this.getCurrentUser();
  };
  
  getCurrentUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('usersess'))
  };

  signout(): void {
    this.idolService.signOut().subscribe(() => localStorage.removeItem('usersess'))
  };
}
