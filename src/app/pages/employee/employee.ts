import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiResponseModel, EmployeeModel } from '../../models/Employee.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-employee',
  imports: [FormsModule, RouterLink],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {


  
  employeeObj: EmployeeModel = new
  EmployeeModel();
  employeeList = signal<EmployeeModel[]>([]);

  http = inject(HttpClient);

  constructor() { }

  ngOnInit(): void {
    this.getAllEmployee();
   }

  getAllEmployee(){
    this.http.get<EmployeeModel[]>('https://api.freeprojectapi.com/api/LeaveTracker/getAllEmployee').subscribe({
      next:(result:EmployeeModel[])=>{
        this.employeeList.set(result);
      },
      error:(error:any)=>{
      
        console.error('Error fetching employees:', error);

      }
    })
  }
  onSaveEmployee() {
    
    this.http.post<ApiResponseModel>('https://api.freeprojectapi.com/api/LeaveTracker/CreateNewEmployee', this.employeeObj)
    .subscribe({
      next:(result:ApiResponseModel)=>{
        
        alert(result.message);
        this.getAllEmployee();
      },
      error:(error:any)=>{
        
        alert(error.error.message);
      }
    })

  }

  onEdit(obj:EmployeeModel) {
  
    this.employeeObj = obj;
  
  }

  onUpdateEmployee() {
    this.http.put<ApiResponseModel>('https://api.freeprojectapi.com/api/LeaveTracker/UpdateEmployee?id='+this.employeeObj.empId, this.employeeObj)
    .subscribe({
      next:(result:ApiResponseModel)=>{        
        alert(result.message);
        this.getAllEmployee();
      },
      error:(error:any)=>{
        
        alert(error.error.message);
      }
    })
  }

  onDeleteEmployee(id:number) {
    
    if(!confirm("Are you sure you want to delete this employee?")) return;

    this.http.delete<ApiResponseModel>('https://api.freeprojectapi.com/api/LeaveTracker/DeleteEmployee?id='+id)
    .subscribe({
      next:(result:ApiResponseModel)=>{        
        alert(result.message);
        this.getAllEmployee();
      },
      error:(error:any)=>{
        
        alert(error.error.message);
      }
    })
  }

}
