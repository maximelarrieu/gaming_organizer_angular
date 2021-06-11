import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:3001/api/users'

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": 'application/json'})
}

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

  addUserToGame(user_id: any, game_id: any): Observable<any> {
    return this.http.post(`${baseUrl}/${user_id}/add/to/${game_id}`, {
      user_id,
      game_id
    }, httpOptions)
  }

  removeUserToGame(user_id: any, game_id: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${user_id}/remove/to/${game_id}`, {
      user_id,
      game_id,
    }, httpOptions)
  }
}
