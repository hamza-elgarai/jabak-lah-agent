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
  types= [
    {id:1,plafond:200},
    {id:2,plafond:2000},
    {id:3,plafond:50000}
  ]

  registerBody:RegisterBody = {
    fname:"",
    lname:"",
    email:"",
    tel:"",
    password:"defaultpassword",
    solde:200,
    idType:0
}


  setType(id:number){
    this.selectedType=this.types.find((type)=> type.id===id)||{id:0,plafond:0}; 
    this.registerBody.idType=this.selectedType.id;
  }
  submitRegister(){
    let valid=true;
    Object.values(this.registerBody).forEach((value)=> {
      if(value===0 || value==="") {
        valid=false;
        return;
      }
    })
    if(valid){
      const phoneRegex = /^0\d{9}$/
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      if(!phoneRegex.test(this.registerBody.tel)){
        this.toastr.error("Format de numéro de téléphone n'est pas valide")
        return
      }
      if(!emailRegex.test(this.registerBody.email)){
        this.toastr.error("E-mail est erroné")
        return
      }
      if(this.registerBody.solde>this.selectedType.plafond){
        this.toastr.warning("Le solde dépasse le plafond")
        return
      }
      if(this.registerBody.solde<200){
        this.toastr.warning("Le solde minimum est 200 DH")
        return
      }

    }


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
