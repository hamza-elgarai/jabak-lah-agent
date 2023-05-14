import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  selectedType= {id:0,plafond:0} as {id:number, plafond:number};
  setType(type:{id:number,plafond:number}){
    this.selectedType=type; 
  }

  constructor(public navigate:Location){}

}
