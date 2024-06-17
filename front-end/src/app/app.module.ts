import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import pt from '@angular/common/locales/pt';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NZ_I18N, pt_BR } from "ng-zorro-antd/i18n";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { TesteComponent } from "./pages/teste/teste.component";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";

registerLocaleData(pt);
@NgModule({
  declarations: [
    WelcomeComponent,
    TesteComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzDropDownModule,
    NzBreadCrumbModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
  ],
})
export class AppModule { }