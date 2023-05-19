import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginBody } from '../interfaces/LoginBody';
import { AuthService } from '../service/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(public router:Router,private authService:AuthService){}
  form:LoginBody = {
    username: "",
    password:""
  }

  submitLogin(){
    console.log(this.form);
    // console.log(this.form);
    this.authService.login(this.form)
  }



  ngOnInit(): void {
  }

}
