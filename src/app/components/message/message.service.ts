import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/api/messages'

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(`${baseUrl}`, httpOptions)
  }

  send(sender: any, message: string, sendAt: any): Observable<any> {
    return this.http.post(`${baseUrl}`, {
      sender,
      message,
      sendAt,
    }, {responseType: 'text'})
  }
}
