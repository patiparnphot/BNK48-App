import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IdolsComponent } from './idols/idols.component';
import { ShareidolComponent } from './shareidol/shareidol.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { IdolDetailComponent } from './idol-detail/idol-detail.component';
import { EditidolComponent } from './editidol/editidol.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';

import { IdolService }  from "./idol.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IdolsComponent,
    ShareidolComponent,
    UserprofileComponent,
    SigninComponent,
    SignupComponent,
    IdolDetailComponent,
    EditidolComponent,
    ForgotComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [IdolService],
  bootstrap: [AppComponent]
})
export class AppModule { }
