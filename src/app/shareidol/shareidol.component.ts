import { Component, OnInit, Input } from '@angular/core';
import { Idolform } from '../idol.model';
import { Cloudinary } from '../user.model';
import { IdolService } from '../idol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shareidol',
  templateUrl: './shareidol.component.html',
  styleUrls: ['./shareidol.component.css']
})
export class ShareidolComponent implements OnInit {
  idol: any = {
    firstname: "",
    lastname: "",
    nickname: "",
    aka: "",
    birthday: "",
    height: null,
    bloodgroup: "",
    address: "",
    favcolor: "",
    favfood: "",
    hobby: "",
    lang: "",
    edu: {
      university: "",
      highschool: ""
    },
    description: "",
    image: ""
  };
  file = null;
  loading: boolean = false;
  uploadData = {
    filename: "",
    filetype: "",
    value: ""
  };
  shareidol = {
    idol: null
  };

  constructor(
    private idolService: IdolService,
    private router: Router
  ) { };

  ngOnInit() {
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
        this.idol.image = result.secure_url;
        this.loading = false;
      });
    }
  };
  
  shareIdol(): void {
    this.shareidol.idol = this.idol;
    this.idolService.shareIdol(this.shareidol).subscribe(() => this.goBack());
  };
  
  goBack() {
    this.router.navigate(['/']);
  }

}
