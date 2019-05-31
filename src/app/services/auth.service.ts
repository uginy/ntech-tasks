import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}
  private userdata;

  public loginUser(userInfo: User) {
    this.userdata = userInfo;
    // Solution if user trying to refresh the page.
    localStorage.setItem('userdata', JSON.stringify(this.userdata));
  }

  public getUser() {
    if (!this.userdata) {
      // Solution if user trying to refresh the page. Getting data from localstorage.
      this.userdata = JSON.parse(localStorage.getItem('userdata'));
    }
    return this.userdata;
  }
  public logout() {
    localStorage.removeItem('userdata');
    this.userdata = undefined;
  }
}
