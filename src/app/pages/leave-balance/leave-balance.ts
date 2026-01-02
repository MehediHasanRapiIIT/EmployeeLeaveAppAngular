import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MasterService } from '../../service/master-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leave-balance',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe, AsyncPipe],
  templateUrl: './leave-balance.html',
  styleUrl: './leave-balance.css',
})
export class LeaveBalance implements OnInit {

    newleavebalanceObj: any = {
    balanceId: 0,
    empId: 0,
    updatedDate: new Date().toISOString().split('T')[0],
    count: 0,
    updateBy: 0,
    leaveType: ''
  };

  leaveBalances = signal<any[]>([]);
  //signal<EmployeeModel[]>([]);
  showModal: boolean = false;
  isEditMode: boolean = false;

  masterSrv = inject(MasterService);

  allEmpList$: Observable<any[]> = new Observable<any[]>;
  
    constructor(){
    this.allEmpList$ = this.masterSrv.getAllEmployee();
    const localData = localStorage.getItem('leaveUser');
    if(localData != null){
      const userObj = JSON.parse(localData);
      this.newleavebalanceObj.updateBy = userObj.empId;
    }
  }


  ngOnInit() {
    this.getAllLeaves();
  }

  getAllLeaves() {
    this.masterSrv.getAllLeave().subscribe({
      next: (result: any[]) => {
        this.leaveBalances.set(result);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    })

  }

  openModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

resetForm() {
  const localData = localStorage.getItem('leaveUser');
  const userObj = localData ? JSON.parse(localData) : null;

  this.newleavebalanceObj = {
    balanceId: 0,
    empId: 0,
    updatedDate: new Date().toISOString().split('T')[0],
    count: 0,
    updateBy: userObj?.empId ?? 0,   // ✅ FIX
    leaveType: ''
  };
}


  saveLeaveBalance() {

    this.masterSrv.onAddLeave(this.newleavebalanceObj).subscribe({
      next: (result: any) => {
        alert(result.message);
        this.getAllLeaves();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    })
    // if (!this.newleavebalanceObj.empId || !this.newleavebalanceObj.leaveType || !this.newleavebalanceObj.count) {
    //   alert('Please fill all required fields');
    //   return;
    // }

    // if (this.isEditMode) {
    //   const index = this.leaveBalances.findIndex(x => x.balanceId === this.newleavebalanceObj.balanceId);
    //   if (index !== -1) {
    //     this.leaveBalances[index] = { ...this.newleavebalanceObj };
    //   }
    // } else {
    //   this.newleavebalanceObj.balanceId = this.leaveBalances.length + 1;
    //   this.leaveBalances.push({ ...this.newleavebalanceObj });
    // }
    // this.closeModal();
  }

  editLeaveBalance(leave: any) {
    this.isEditMode = true;
    this.newleavebalanceObj = { ...leave };
    this.showModal = true;
  }

  deleteLeaveBalance(id: number) {
    // if (confirm('Are you sure you want to delete this record?')) {
    //   this.leaveBalances = this.leaveBalances.filter(x => x.balanceId !== id);
    // }
  }

}