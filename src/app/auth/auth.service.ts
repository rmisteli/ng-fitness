import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthData} from "./auth-data.model";
import {TrainingService} from "../training/training.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChanged = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        this.authChanged.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChanged.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.afAuth.signOut();
  }


  isAuth() {
    return this.isAuthenticated;
  }
}
