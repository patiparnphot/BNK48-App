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
  user = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    avatar: null,
    admincode: "",
  };
  file = null;
  loading: boolean = false;

  constructor(
    private idolService: IdolService,
    private router: Router,
    private elem: ElementRef
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
  
  upload() {
    let files = this.elem.nativeElement.querySelector("#file").files;
    if(files){
      let file = files[0];
      let formData = new FormData();
      formData.append('file', file, file.name);
      this.loading = true;
      this.idolService.upload(formData).subscribe(resp => {
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
