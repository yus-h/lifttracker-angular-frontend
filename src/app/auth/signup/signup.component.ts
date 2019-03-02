import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    const user: User = new User(username, password);


    console.log('signing up', user);


    // this.authService.signupUser(user);

    this.authService.signupUser(user)
      .subscribe(
        // TODO how to differentiate between different status codes
        (res) => {
          console.log('SUCCESS signed up:');
          console.log(res);
          // this.exerciseService.notifySubscribersOfChange();
          // this.router.navigate(['../' + res.id], {relativeTo: this.route});
        },
        err => {
          console.log('Error occured', err);
        }
      );
  }

}
