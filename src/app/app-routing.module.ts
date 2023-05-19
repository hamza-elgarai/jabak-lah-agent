import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule , Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'clients', component: ClientsListComponent,canActivate:[AuthGuard]},
  { path: 'create-client', component: CreateClientComponent,canActivate:[AuthGuard]}
];

@NgModule({
  providers: [AuthService,AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }