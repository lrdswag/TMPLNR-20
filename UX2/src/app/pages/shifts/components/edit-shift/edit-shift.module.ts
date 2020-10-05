import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {EditShiftPage} from "./edit-shift";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {EditShiftPageRoutingModule} from "./edit-shift-routing.module";
import {ComponentsModule} from "../../../../shared/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../../services/authentication.service";
import {ShiftsService} from "../../services/shifts.service";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditShiftPageRoutingModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditShiftPage
  ],
  providers: [
    AuthenticationService,
    ShiftsService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class EditShiftPageModule {
}