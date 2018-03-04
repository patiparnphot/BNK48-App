import { Component, ViewChild, OnInit, Input, ElementRef } from '@angular/core';
import { User, Userform, Cloudinary } from '../user.model';
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
    admincode: ""
  };
  file = null;
  loading: boolean = false;
  uploadData = {
    filename: "",
    filetype: "",
    value: ""
  };

  constructor(
    private idolService: IdolService,
    private router: Router,
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
        this.user.avatar = result.secure_url;
        this.loading = false;
      });
    }
  };

  register(): void {
    this.idolService.register(this.user).subscribe((currentUser: User) => {
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
