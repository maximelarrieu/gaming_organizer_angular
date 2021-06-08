import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:3001/api'

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${baseUrl}/login`, {
      username,
      password
    }, httpOptions)
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${baseUrl}/register`, {
      username,
      email,
      password,
      createdAt: Date.now()
    }, httpOptions)
  }
}
