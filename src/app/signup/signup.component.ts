import { Component, ViewChild, OnInit, Input, ElementRef } from '@angular/core';
import { Userform } from '../user.model';
import { IdolService } from '../idol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('avatar') avatar: ElementRef;
  user: Userform;

  constructor(
    private idolService: IdolService,
    private router: Router
  ) { };

  ngOnInit() {
  };

  fileSelected(event): void {
    this.user.avatar = event;
  };

  register(): void {
    this.idolService.register(this.user).subscribe(resp => {
      localStorage.setItem('usersess', JSON.stringify(resp));
      this.goBack();
    });
  };
  
  goBack() {
    this.router.navigate(['/']);
  };
}
