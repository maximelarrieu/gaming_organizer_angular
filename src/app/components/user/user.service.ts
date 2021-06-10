import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:3001/api/users'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(`${baseUrl}/all`, {responseType: 'text'})
  }

  getUserContent(): Observable<any> {
    return this.http.get(`${baseUrl}/user`, {responseType: 'text'})
  }

  getAdminContent(): Observable<any> {
    return this.http.get(`${baseUrl}/admin`, {responseType: 'text'})
  }

  getOne(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`)
  }
}
