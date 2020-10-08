import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {UsersService} from "../../users/services/users.service";
import {PendingApprovalShiftsPage} from "./pending-approval-shifts";
import {PendingApprovalShiftsRoutingModule} from "./pending-approval-shifts-routing.module";
import {AuthenticationService} from "../../../../services/authentication.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";
import {ComponentsModule} from "../../../../shared/components.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PendingApprovalShiftsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PendingApprovalShiftsPage
  ],
  providers: [
    ShiftsService,
  UsersService,
  AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true}
  ]
})
export class PendingApprovalShiftsModule { }