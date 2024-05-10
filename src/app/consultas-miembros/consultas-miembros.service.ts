import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsultMiembroDtp } from './models/consultmiembro-dto';
import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultasMiembrosService {

  private apiUrl = environment.urlHost;

  constructor(private http: HttpClient) { }

  getAllClients(nrodoc: string): Observable<ConsultMiembroDtp[]> {
    return this.http.get<ConsultMiembroDtp[]>(`${this.apiUrl}miembro/report-miembros?nrodoc=${nrodoc}`);
  }
}