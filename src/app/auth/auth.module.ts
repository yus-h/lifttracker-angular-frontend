
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  SigninComponent,
  SignupComponent],
  imports: [
    FormsModule,
    AuthRoutingModule,
    HttpClientModule // TODO should we be importing every service in every module?
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
