import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {REST_API} from '../common/config';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  isAdmin = false;
  constructor(private _http: HttpClient) { }

  authenticate(username: string, password: string): Observable<boolean> {
    return this._http.post<boolean>(`${REST_API}/login`, { login: username, password: password });
  }
}
