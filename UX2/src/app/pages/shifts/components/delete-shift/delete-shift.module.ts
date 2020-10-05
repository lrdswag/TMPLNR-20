import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { DeleteShiftPageRoutingModule } from "./delete-shift-routing.module";
import { DeleteShiftPage } from "./delete-shift";
import {ComponentsModule} from "../../../../shared/components.module";
import {ShiftsService} from "../../services/shifts.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DeleteShiftPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    DeleteShiftPage
  ],
  providers: [
    ShiftsService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class DeleteShiftPageModule { }