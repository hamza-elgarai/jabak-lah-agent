import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError } from 'rxjs';
import clients from 'src/data/clients-data';
import { Client } from 'src/entity/Client';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit ,OnDestroy{
  constructor(private http:HttpClient,private authService:AuthService,private router:Router){}
  faTrashAlt=faTrashAlt;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  clients:Client[] = [];
  ngOnInit(): void {
    this.clients = clients;
    this.dtTrigger.next(null)



    //Temporary code for getting all clients , to be placed in a service
    let token = localStorage.getItem('token') || ''
    this.http.get("http://localhost:8090/clients",{
      headers:{
        Authorization:"Bearer "+token
      }
    }).subscribe(
      (data)=> {
        console.log(data);
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
