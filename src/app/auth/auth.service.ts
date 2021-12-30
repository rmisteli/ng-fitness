import {Injectable} from "@angular/core";

import {User} from "./user.model";
import {AuthData} from "./auth-data.model";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChanged = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChanged.next(true);
    this.router.navigate(['/training']);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChanged.next(true);
    this.router.navigate(['/training']);
  }

  logout() {
    this.user = null;
    this.authChanged.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
