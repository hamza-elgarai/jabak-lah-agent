import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterBody } from '../interfaces/RegisterBody';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientRegisterService {

  constructor(private http:HttpClient,private auth:AuthService,private router:Router) { }

  url="https://jabak-lah-backend.onrender.com"
  registerClient(registerBody:RegisterBody){
    return this.http.post(this.url+'/client/auth/register',registerBody,{
      headers:{
        "Authorization": "Bearer "+this.auth.getToken()
      }
    })
  }
}
