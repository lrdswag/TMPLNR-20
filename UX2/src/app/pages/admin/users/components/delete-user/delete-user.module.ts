import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { DeleteUserPage } from "./delete-user";
import { DeleteUserPageRoutingModule } from "./delete-user-routing.module";
import {ComponentsModule} from "../../../../../shared/components.module";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {UsersService} from "../../services/users.service";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        DeleteUserPageRoutingModule,
        ComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [
    DeleteUserPage
  ],
  providers: [
    AuthenticationService,
    UsersService,
  ]
})
export class DeleteUserPageModule { }
