import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdolDetailComponent }  from './idol-detail/idol-detail.component';
import { IdolsComponent }   from './idols/idols.component';
import { UserprofileComponent }   from './userprofile/userprofile.component';
import { SigninComponent }   from './signin/signin.component';
import { SignupComponent }   from './signup/signup.component';
import { EditidolComponent }   from './editidol/editidol.component';
import { ForgotComponent }   from './forgot/forgot.component';
import { ResetComponent }   from './reset/reset.component';
import { ShareidolComponent }      from './shareidol/shareidol.component';

const routes: Routes = [
  { path: '', redirectTo: '/idols', pathMatch: 'full' },
  { path: 'idols', component: IdolsComponent },
  { path: 'shareidol', component: ShareidolComponent },
  { path: 'users/:authorid', component: UserprofileComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'idols/:id/edit', component: EditidolComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset/:token', component: ResetComponent },
  { path: 'idols/:id', component: IdolDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
