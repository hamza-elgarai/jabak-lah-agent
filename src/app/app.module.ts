import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StatusPipe } from './pipe/StatusPipe';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ToastNoAnimationModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CreateClientComponent,
    ClientsListComponent,
    StatusPipe,
    ChangePasswordComponent,
    EditClientComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    DataTablesModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    ToastNoAnimationModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
