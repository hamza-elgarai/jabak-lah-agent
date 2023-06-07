import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterBody } from '../interfaces/RegisterBody';
import { ClientRegisterService } from '../service/clients.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  constructor(public navigate:Location,private clientRegisterService:ClientRegisterService,private router:Router,private toastr:ToastrService){}


  selectedType= {id:0,plafond:0} as {id:number, plafond:number};

  registerBody:RegisterBody = {
    fname:"",
    lname:"",
    email:"",
    tel:"",
    password:"defaultpassword",
    solde:0,
    idType:0
}


  setType(type:{id:number,plafond:number}){
    this.selectedType=type; 
    this.registerBody.idType=type.id;
  }
  submitRegister(){
    let valid=true;
    Object.values(this.registerBody).forEach((value)=> {
      if(value===0 || value==="") {
        valid=false;
        return;
      }
    })
    console.log(valid);
    if(valid){
      this.clientRegisterService.registerClient(this.registerBody).subscribe(
        (data:any)=> {
          if(data.message!=='Client créé'){
            this.toastr.error(data.message,'Erreur')
          }
          else{
            this.toastr.success(data.message)
            this.router.navigateByUrl('/clients')
          }
        },
        (err)=> console.log(err)
      )
    }
    else{
      this.toastr.error("Veuillez remplir tous les champs et choisir un type","Erreur: Données manquantes")
    }
  }


}
