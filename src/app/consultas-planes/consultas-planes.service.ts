import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsultPlanesDtp } from './models/consultplanes-dto';
import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultasPlanesService {

  private apiUrl = environment.urlHost;

  constructor(private http: HttpClient) { }

  getAllClients(nombreplan: string): Observable<ConsultPlanesDtp[]> {
    return this.http.get<ConsultPlanesDtp[]>(`${this.apiUrl}planes/report-planes?nombreplan=${nombreplan}`);
  }
}