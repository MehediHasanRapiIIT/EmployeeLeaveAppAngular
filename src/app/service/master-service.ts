import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseModel, LoginModel } from '../models/Employee.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  
  constructor(private http: HttpClient) {

  }

  onLogin(obj: LoginModel) {
    return this.http.post<any>('https://api.freeprojectapi.com/api/LeaveTracker/login', obj);
  }

}
