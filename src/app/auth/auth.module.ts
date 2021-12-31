import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

import {AuthRoutingModule} from "./auth-routing.module";
import {SharedModel} from "../shared/shared.model";

import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModel,
    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule {}
