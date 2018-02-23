import { Component, OnInit } from '@angular/core';
import { Idols } from '../idol.model';
import { IdolService } from '../idol.service';

@Component({
  selector: 'app-idols',
  templateUrl: './idols.component.html',
  styleUrls: ['./idols.component.css']
})
export class IdolsComponent implements OnInit {
  idols: Idols[];

  constructor(private idolService: IdolService) { };

  ngOnInit() {
    this.getIdols();
  };

  getIdols(): void {
    this.idolService.getIdols()
    .subscribe(idols => this.idols = idols);
  };
  
}
