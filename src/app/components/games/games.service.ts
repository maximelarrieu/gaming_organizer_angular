import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/api/games'

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}`)
  }

  getOne(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`)
  }

  addOneToUser(user_id: any, game_id: any): Observable<any> {
    return this.http.post(`${baseUrl}/${game_id}/add/to/${user_id}`, {
      game_id,
      user_id
    }, httpOptions)
  }
}
