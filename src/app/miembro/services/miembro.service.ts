import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Miembro } from '../models/miembro';
import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class MiembroService {

  private baseUrl = environment.urlHost;
  
  constructor(private HttpClient: HttpClient) { }
 
  getAll():Observable<Miembro[]>{
    return this.HttpClient.get<Miembro[]>(`${this.baseUrl}miembro`)
  }

  delete(miembroId: number): Observable<any>{
    console.log(miembroId);
    return this.HttpClient.delete(`${this.baseUrl}miembro/${miembroId}`);
    }

  create(data: Miembro): Observable<Miembro>{
    return this.HttpClient.post<Miembro>(`${this.baseUrl}miembro`,data);
  }

  update(data:Miembro): Observable<Miembro>{
    return this.HttpClient.put<Miembro>(`${this.baseUrl}miembro`,data);
  }
 
}
