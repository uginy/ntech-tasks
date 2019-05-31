import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userdata = this.authService.getUser();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.userdata) {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
