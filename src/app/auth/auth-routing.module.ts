
import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';

const authRoutes = [
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent}
];

@NgModule({
  imports : [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
