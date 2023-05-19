import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginBody } from '../interfaces/LoginBody';
import { LoginResponse } from '../interfaces/LoginResponse';
import { JwtService } from './jwt/JwtService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private jwtService:JwtService) { }
  isLoggedIn=false;
  isAuthenticated(){
    let token = sessionStorage.getItem("token")
    if(token===null) return false;
    let decodedToken = this.jwtService.decodeToken(token)
    if(this.jwtService.isTokenExpired(decodedToken.exp)) return false
    return true
  }

  login(form:LoginBody){
    this.http.post<LoginResponse>("http://localhost:8090/auth/authenticate",form).subscribe(
      (data) =>{
        console.log(data)
        sessionStorage.setItem("token",data.token)
        console.log(this.jwtService.decodeToken(data.token));
      } ,
        
      (err) => console.log(err)
    )
  }
}
