import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { UserDto } from '../usuario/model/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = environment.urlHost;


  constructor(
    private http: HttpClient
  ) { }

  getAll():Observable<UserDto[]>{
    return this.http.get<UserDto[]>(`${this.baseUrl}usuario`)
  }

  delete(id: number): Observable<any>{
    console.log(id);
    return this.http.delete(`${this.baseUrl}usuario/${id}`);
    }

  create(data: UserDto): Observable<UserDto>{
    return this.http.post<UserDto>(`${this.baseUrl}usuario`,data);
  }

  update(data:UserDto): Observable<UserDto>{
    return this.http.put<UserDto>(`${this.baseUrl}usuario`,data);
  }

}
