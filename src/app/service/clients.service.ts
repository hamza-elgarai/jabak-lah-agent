import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterBody } from '../interfaces/RegisterBody';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientRegisterService {

  constructor(private http:HttpClient,private router:Router) { }

  registerClient(registerBody:RegisterBody){
    return this.http.post('http://localhost:8090/client/auth/register',registerBody)
  }
}
