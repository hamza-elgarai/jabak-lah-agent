import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http:HttpClient) { }
  url="https://jabak-lah-backend.onrender.com"

  deleteClient(id:number){
    return this.http.delete(this.url+"/client/"+id)
  }
  getClients(){
    let token = localStorage.getItem('token') || ''
    return this.http.get<any[]>(`${this.url}/clients`,{
      headers:{
        Authorization:"Bearer "+token
      }
    })
  }
  editClient(id:number,editBody:any){
    let token = localStorage.getItem('token') || ''
    return this.http.patch<HttpResponse<any>>(`${this.url}/client/`+id,editBody,{
      headers:{
        Authorization:"Bearer "+token
      },
    }) 
  }
  getClient(id:number){
    let token = localStorage.getItem('token') || ''
    return this.http.get<any[]>(this.url+"/client/"+id,{
      headers:{
        Authorization:"Bearer "+token
      }
    })
  }
  addSolde(id:number,versement:number){
    let token = localStorage.getItem('token') || ''
    return this.http.patch<HttpResponse<any>>(this.url+"/client/addSolde/"+id,{versement:versement},{
      headers:{
        Authorization:"Bearer "+token
      },
    }) 
  }

}
