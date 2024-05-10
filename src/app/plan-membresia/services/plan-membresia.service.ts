import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planes } from '../models/plan-membresia';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:8080/planes'

@Injectable({
  providedIn: 'root'
})
export class PlanMembresiaService {

  constructor(private HttpClient: HttpClient) { }
  readAll(): Observable<any> {
    return this.HttpClient.get(baseURL);
  }

  get(planesid: number): Observable<any> {
    return this.HttpClient.get(`${baseURL}/${planesid}`)
  }
  create(data: Planes): Observable<any> {
    return this.HttpClient.post(baseURL, data);
  }
  update(planesId: number, data: Planes): Observable<any> {
    return this.HttpClient.put(baseURL, data)
  }
  delete(planesId: number): Observable<any> {
    return this.HttpClient.delete(`${baseURL}/${planesId}`);
  }
  deleteAll(): Observable<any> {
    return this.HttpClient.delete(baseURL);
  }
  searchByName(name: string): Observable<any> {
    return this.HttpClient.get(`${baseURL}?nombreplan=${name}`);
  }
}
