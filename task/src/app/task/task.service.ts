import { Injectable } from '@angular/core';
import {ITask} from './task.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {REST_API} from '../common/config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) { }

  uploadPhoto(id: string, file: File): Observable<ITask> {
    return this._http.post<any>(`${REST_API}/tasks/${id}/uploadPhoto`, file);
  }

  save(task: ITask): Observable<ITask> {
    if (!task.id) {
      return this.create(task);
    }
    return this._http.put<ITask>(`${REST_API}/tasks/${task.id}`, task);
  }

  create(task: ITask): Observable<ITask> {
    return this._http.post<ITask>(`${REST_API}/tasks`, task);
  }

  getTask(id: string): Observable<ITask> {
    return this._http.get<ITask>(`${REST_API}/tasks/${id}`);
  }

  getTasks(): Observable<ITask[]> {
    return this._http.get<ITask[]>(`${REST_API}/tasks`);
  }
}
