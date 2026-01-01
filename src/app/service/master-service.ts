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

  onAddLeave(obj: any) {
    return this.http.post<ApiResponseModel>('https://api.freeprojectapi.com/api/LeaveTracker/AddLeaveBalance', obj);
  }

  getAllLeave() {
    return this.http.get<ApiResponseModel>('https://api.freeprojectapi.com/api/LeaveTracker/getAllLeave');
  }

}
