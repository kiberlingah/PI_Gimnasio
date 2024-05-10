import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { VentaMembresia } from 'src/app/venta-membresia/model/venta-membresia';
import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaMembresiaService {
  private API_SERVE = 'http://localhost:8080/ventamenbresia'; // URL de tu API
  private API_SERVE_p = 'http://localhost:8080/planes';
  //private API_SERVE_m = 'http://localhost:8080/miembro/buscarmiembrobynrodoc?nrodoc';

 // private apiUrl = environment.urlHost;

  private ventaCreatedSubject = new Subject<void>();

  ventaeCreated$ = this.ventaCreatedSubject.asObservable();


  constructor(private http: HttpClient) { }


  crearVentaMembresia(ventaMembresia: any): Observable<any> {
    return this.http.post(this.API_SERVE, ventaMembresia)
  }

  notifyClientCreated() {
    this.ventaCreatedSubject.next();
  }

  getAllPlanes(): Observable<any> {
    return this.http.get(this.API_SERVE_p);
  }
  getAllMiembros(nrodoc: string): Observable<any> {
    return this.http.get(`${this.API_SERVE}/buscarmiembrobynrodoc?nrodoc=${nrodoc}`);
  }


}


