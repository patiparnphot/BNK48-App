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
  @ViewChild("fileInput") fileInput: ElementRef;
  user = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    avatar: null,
    admincode: "",
  };
  file: String = null;
  loading: boolean = false;

  constructor(
    private idolService: IdolService,
    private router: Router
  ) { };

  ngOnInit() {
  };

  // fileSelected(event) {
  //   let reader = new FileReader();
  //   if(event.target.files && event.target.files.length > 0) {
  //     let file = event.target.files[0];
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.user.avatar = "data:" + file.type + ";base64," + reader.result.split(',')[1]
  //     };
  //   }
  // };
  
  preUpload(event) {
    if(event.target.files.length > 0){
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.file = reader.result;
      };
    }
  };
  
  upload() {
    if(this.file){
      this.loading = true;
      this.idolService.upload(this.file).subscribe(resp => {
        this.user.avatar = resp;
        this.loading = false;
      });
    }
  };
  
  clearFile() {
    this.user.avatar = null;
    this.file = null;
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
