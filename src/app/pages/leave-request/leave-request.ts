import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master-service';

@Component({
  selector: 'app-leave-request',
  imports: [FormsModule],
  templateUrl: './leave-request.html',
  styleUrl: './leave-request.css',
})
export class LeaveRequest implements OnInit{

  newLeaveRequest: any = {
  leaveId: 0,
  empId: 0,
  leaveDate: new Date().toISOString().split('T')[0],
  fromDate: "",
  toDate: "",
  reason: "",
  leaveType: ""
  };

  constructor() { 
    const localData = localStorage.getItem('leaveUser');
    if(localData != null){
      const userObj = JSON.parse(localData);
      this.newLeaveRequest.empId = userObj.empId;
    }
  }

  ngOnInit(): void {
    this.getAllLeaveRequestById();
  }

  masterSrv = inject(MasterService);

  onSubmitLeaveRequest(){
    this.masterSrv.onLeaveRequest(this.newLeaveRequest).subscribe({
      next: (result: any) => {
        alert(result.message);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    })
  }

  leaveList = signal<any[]>([]);

  getAllLeaveRequestById(){

    this.masterSrv.getAllLeaveRequestById(this.newLeaveRequest.empId).subscribe({
      next: (result: any[]) => {
        this.leaveList.set(result);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    })
  }

}
