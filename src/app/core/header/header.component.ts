import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  username: string;
  authenticatated = false;

  ngOnInit() {

    this.username = this.authService.getUsername();
    console.log('username', this.username);
    this.authenticatated = this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }

}
