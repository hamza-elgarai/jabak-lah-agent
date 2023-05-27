import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginBody } from '../interfaces/LoginBody';
import { LoginResponse } from '../interfaces/LoginResponse';
import { JwtService } from './jwt/JwtService';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../interfaces/DecodedToken';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private jwtService:JwtService,private router:Router) { }
  isLoggedIn=false;
  isAuthenticated(){
    let token = localStorage.getItem("token")
    if(token===null) return false;
    return true
  }
  

  login(form:LoginBody){
    this.http.post<LoginResponse>("http://localhost:8090/agent/auth/authenticate",form).subscribe(
      (data) =>{
        console.log(data)
        localStorage.setItem("token",data.token)
        localStorage.setItem("refreshToken",data.refreshToken)
        this.router.navigateByUrl('/clients')
        console.log(this.jwtService.decodeToken(data.token));
      } ,
        
      (err:HttpErrorResponse) =>{
        console.log("login error");
        console.log(err);
  
      }
    )
  }

  refreshLogin():Observable<HttpEvent<any>>{
    let refreshToken = localStorage.getItem('refreshToken')|| '';
    return this.http.post<HttpEvent<any>>("http://localhost:8090/agent/auth/refresh",{token:refreshToken})
    
  }

  setToken(token:string){
    localStorage.setItem('token',token)
  }
  getToken(){
    return localStorage.getItem('token')||''
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }
  setRefreshToken(refreshToken:string){
    localStorage.setItem('token',refreshToken)
  }
  getUsername(){
  
    let decodedToken:DecodedToken = jwtDecode(this.getToken())
    return decodedToken.sub
  }

  changePassword(body:LoginBody){
    this.http.post("http://localhost:8090/agent/auth/change-password",body).subscribe(
      (data)=>{
        console.log(data);
        this.router.navigateByUrl("/clients")
      } 
        
    )
  }
  getIsPasswordChanged():Observable<boolean>{
    if(!this.isAuthenticated()) this.router.navigateByUrl('/')
    let username = this.getUsername()
    return this.http.post<boolean>("http://localhost:8090/agent/auth/is-password-changed",{username:username})
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    console.log("logout successful");
  }
}
