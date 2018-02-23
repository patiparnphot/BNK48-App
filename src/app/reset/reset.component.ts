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
  reset: Userreset;

  constructor(
    private route: ActivatedRoute,
    private idolService: IdolService,
    private router: Router
  ) {};

  ngOnInit() {
  };

  resetpassword(): void {
    const token = +this.route.snapshot.paramMap.get('token');
    this.idolService.reset(token, this.reset).subscribe(() => this.goBack())
  };

  goBack() {
    this.router.navigate(['/']);
  };
}
