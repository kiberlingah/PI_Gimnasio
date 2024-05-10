import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private baseUrl = environment.urlHost;
  
  constructor(private HttpClient: HttpClient) { }
 
  getAll():Observable<any[]>{
    return this.HttpClient.get<any[]>(`${this.baseUrl}tipodocumento`)
  }
}
