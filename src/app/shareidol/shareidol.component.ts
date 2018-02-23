import { Component, OnInit, Input } from '@angular/core';
import { Idolform } from '../idol.model';
import { IdolService } from '../idol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shareidol',
  templateUrl: './shareidol.component.html',
  styleUrls: ['./shareidol.component.css']
})
export class ShareidolComponent implements OnInit {
  idol: Idolform;

  constructor(
    private idolService: IdolService,
    private router: Router
  ) { };

  ngOnInit() {
  }
  
  shareIdol (): void {
    this.idolService.shareIdol(this.idol).subscribe(() => this.goBack());
  };
  
  goBack() {
    this.router.navigate(['/']);
  }

}
