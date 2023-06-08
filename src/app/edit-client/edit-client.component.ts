import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../service/agent/agent.service';
import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  constructor(public navigate:Location, private route: ActivatedRoute,private agentService:AgentService,private toastr: ToastrService){}
  client:any={};
  
  versement=0;
  editBody= {} as {fname:string,lname:string,email:string,tel:string}

  ngOnInit(){
    this.client.compteBancaire={}
    this.client.type={}
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.agentService.getClient(id).subscribe(
        (client:any)=>{ 
          this.client = client
          const {fname,lname,email,tel} = this.client
          this.editBody= {fname,lname,email,tel}
        }
      )
      // Use the received object as needed
    });
  }

  submitEdit(){
    if(!this.editBody.fname || !this.editBody.lname || !this.editBody.email || !this.editBody.tel){
      this.toastr.error("Des champs sont manquants","Erreur!!")
      return
    }


    const phoneRegex = /^0\d{9}$/
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if(!phoneRegex.test(this.editBody.tel)){
      this.toastr.error("Format de numéro de téléphone : 0XXXXXXXXX")
      return;
    }
    if(!emailRegex.test(this.editBody.email)){
      this.toastr.error("E-mail est erroné")
      return
    }
    this.agentService.editClient(this.client.id,this.editBody).subscribe(
      (data:any)=> {

        this.toastr.success(data.message,"Succès!!")
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
        console.log(error.status);
        this.toastr.error(error.error.message,"Erreur!!")
      }
    )

    
  }
  submitVerser(){
    if(this.versement<0){
      this.toastr.warning("Veuillez rentrer une valeur positive")
      return 
    }
    if(this.versement===0 || this.versement===null) return;
    this.agentService.addSolde(this.client.id,this.versement).subscribe(
      (data:any)=>{
        this.toastr.success(data.message,"Succès!!")
        this.client.compteBancaire.solde += this.versement
        this.versement=0;
      },
      (error:HttpErrorResponse)=>{
        this.toastr.error(error.error.message,"Erreur!!")
      }
    )
  }
}
