import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseModel, EmployeeModel, LoginModel } from '../models/Employee.model';

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
    return this.http.get<any[]>('https://api.freeprojectapi.com/api/LeaveTracker/GetAllBalances');
  }

  getAllEmployee() {
    return this.http.get<any[]>('https://api.freeprojectapi.com/api/LeaveTracker/getAllEmployee');
  }

  onLeaveRequest(obj: any) {
    return this.http.post<any>('https://api.freeprojectapi.com/api/LeaveTracker/request', obj);
  }

  getAllLeaveRequestById(id:number){
    return this.http.get<any[]>('https://api.freeprojectapi.com/api/LeaveTracker/GetLeaveRequestsbyEmpId?empid='+id);
  }

}
