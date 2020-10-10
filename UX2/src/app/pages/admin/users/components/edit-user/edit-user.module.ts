import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {EditUserPage} from "./edit-user";
import {EditUserPageRoutingModule} from "./edit-user-routing.module";
import {ComponentsModule} from "../../../../../shared/components.module";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {UsersService} from "../../services/users.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditUserPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditUserPage
  ],
  providers: [
    AuthenticationService,
    UsersService,
  ]
})
export class EditUserPageModule {
}
