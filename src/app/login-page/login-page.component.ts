import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginBody } from '../interfaces/LoginBody';
import { AuthService } from '../service/auth.service';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(public router:Router,private authService:AuthService,private toastr:ToastrService){}
  form:LoginBody = {
    username: "",
    password:""
  }

  submitLogin(){
    console.log(this.form);
    // console.log(this.form);
    this.authService.login(this.form).subscribe(
      (data) =>{
        console.log(data)
        localStorage.setItem("token",data.token)
        localStorage.setItem("refreshToken",data.refreshToken)
        this.router.navigateByUrl('/clients')
      } ,
        
      (err:HttpErrorResponse) =>{
        console.log("login error");
        console.log(err);
          this.toastr.error((err.error.error==='Agent not found')?"Agent non trouvé":"Erreur inconnue")
      }
    )
  }



  ngOnInit(): void {
  }

}
