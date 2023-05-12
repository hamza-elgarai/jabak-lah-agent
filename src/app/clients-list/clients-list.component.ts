import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import clients from 'src/data/clients-data';
import { Client } from 'src/entity/Client';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit ,OnDestroy{
  faTrashAlt=faTrashAlt;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  clients:Client[] = [];
  ngOnInit(): void {
    this.clients = clients;
    this.dtTrigger.next(null); 
    
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
