import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule , Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { PasswordChangeGuard } from './guard/password-change.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'clients', component: ClientsListComponent,canActivate:[AuthGuard,PasswordChangeGuard]},
  { path: 'client/:id', component: EditClientComponent,canActivate:[AuthGuard,PasswordChangeGuard]},
  { path: 'create-client', component: CreateClientComponent,canActivate:[AuthGuard,PasswordChangeGuard]},
  { path: 'change-password', component: ChangePasswordComponent,canActivate:[AuthGuard]},
];

@NgModule({
  providers: [AuthService,AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }