import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginBody } from '../interfaces/LoginBody';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  constructor(public router:Router,private authService:AuthService){}
  form:LoginBody = {
    username: this.authService.getUsername(),
    password:""
  }

  changePassword(){
    console.log(this.form)
    // console.log(this.form);
    this.authService.changePassword(this.form)
  }



  ngOnInit(): void {
    this.authService.getIsPasswordChanged().subscribe(
      (data)=> {
        if(data===true) this.router.navigateByUrl('/clients')
      }
    )
  }
}
