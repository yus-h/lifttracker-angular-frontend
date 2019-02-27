import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user.model';
import { Userinfo } from '../shared/userinfo';

@Injectable()
export class AuthService {

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {

  }

  signupUser(user: User) {
    return this.httpClient.post('http://localhost:8080/users/sign-up', user , { responseType: 'json' });
  }


  // TODO - what happens if jwtToken is invalid?
  // TODO - need to invalidate token if we return a 401 from query?
  // https://stackoverflow.com/questions/47449477/session-storage-in-angular-2-observable
  signinUser(user: User) {
    // return this.httpClient.post('http://localhost:8080/login', user , { responseType: 'json' });
    // this.httpClient.post('http://localhost:8080/login', user);

    this.httpClient.post('http://localhost:8080/login', user).subscribe(
      (res: Userinfo) => {
        console.log('SUCCESS login up:');
        console.log(res);

        localStorage.setItem('jwtToken', res.jwtToken);
        localStorage.setItem('username', res.username);

        this.router.navigate(['../'], {relativeTo: this.route});
      },
      err => {
        console.log('Error occured', err);
      }
    );
  }

  logout() {
    console.log('logging out');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    this.router.navigate(['/']);

  }

  getUsername() {
    // console.log('getting username:', this.username);
    // return this.username;
    return localStorage.getItem('username');
  }

  getToken() {
    // return this.token;
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated() {
    // console.log('is authenticated?', localStorage.getItem('jwtToken') != null);
    // console.log('this.token', localStorage.getItem('jwtToken'));
    return localStorage.getItem('jwtToken') != null;
  }
}
