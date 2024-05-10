import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from '../login/dto/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.urlApi;

  constructor(
    private http: HttpClient
  ) { }
  
  login(loginDto:LoginDto): Observable<any> {
    console.log(loginDto);

    return this.http.post(`${this.baseUrl}/signin`, loginDto);
  }

}
