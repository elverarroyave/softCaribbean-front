import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private URLClient="http://localhost:8080/api/v1/clients/"
  constructor(private httpClient: HttpClient) { }

  public saveClient(client: Client){
    return this.httpClient.post<any>(this.URLClient, client);
  }

  public findByDocument(numDocument: string){
    return this.httpClient.get<any>(this.URLClient + numDocument);
  }

  public updateClient(id: number, client:Client){
    return this.httpClient.put<any>(this.URLClient + id, client);
  }

  public deleteClient(id: number){
    return this.httpClient.delete<any>(this.URLClient + id);
  }
}
