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

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CreateClientComponent,
    ClientsListComponent,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    DataTablesModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
