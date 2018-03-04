import { Component, OnInit, Input } from '@angular/core';
import { Idol, Idolform } from '../idol.model';
import { Cloudinary } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IdolService } from '../idol.service';

@Component({
  selector: 'app-editidol',
  templateUrl: './editidol.component.html',
  styleUrls: ['./editidol.component.css']
})
export class EditidolComponent implements OnInit {
  idol: Idol;
  file = null;
  loading: boolean = false;
  uploadData = {
    filename: "",
    filetype: "",
    value: ""
  };
  newsrc = null;
  id = "";
  editidol = {
    idol: null
  };

  constructor(
    private route: ActivatedRoute,
    private idolService: IdolService,
    private location: Location
  ) {};

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getIdol();
  };
    
  preUpload(event) {
    if(event.target.files.length > 0){
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadData.filename = file.name;
        this.uploadData.filetype = file.type;
        this.uploadData.value = reader.result.split(',')[1];
        this.file = reader.result;
      };
    }
  };

  upload() {
    if(this.file){
      this.loading = true;
      this.idolService.upload(this.uploadData).subscribe((result: Cloudinary) => {
        this.newsrc = result.secure_url;
        this.loading = false;
      });
    }
  };

  getIdol(): void {
    this.idolService.getIdol(this.id)
    .subscribe(idol => this.idol = idol);
  };
  
  updateIdol(): void {
    this.editidol.idol = this.idol;
    this.idolService.updateIdol(this.id, this.editidol);
    this.goBack();
  };
  
  goBack(): void {
    this.location.back();
  };
}
