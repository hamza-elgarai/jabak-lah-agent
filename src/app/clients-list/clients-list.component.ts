import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError } from 'rxjs';
import clients from 'src/data/clients-data';
import { Client } from 'src/entity/Client';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AgentService } from '../service/agent/agent.service';
import { DecodedToken } from '../interfaces/DecodedToken';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit ,OnDestroy{
  constructor(private http:HttpClient,private agentService:AgentService,private authService:AuthService,private router:Router,private toastr:ToastrService){}
  faTrashAlt=faTrashAlt;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  clients:any[] = [];
  ngOnInit(): void {



    //Temporary code for getting all clients , to be placed in a service
    this.agentService.getClients().subscribe(
      (data)=> {
        console.log(data);
        this.clients = data
        console.log("data is found indeed");
      },
      (err)=> {
        console.log(err);
        console.log("Error finding the data");
      }
    )
    
  }

  //Method to handle logout
  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/')
  }

  deleteClient(id:number,event:Event){
    event.stopPropagation()
    this.agentService.deleteClient(id).subscribe(
      (deleted)=>{
        console.log(deleted);
        this.clients = this.clients.filter(client=> client["id"]!==id)
        this.toastr.success("Succès","Le client est supprimé")
      } 
    )
  }
  editClient(client:any){
    this.router.navigate(["/client",client.id])
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
