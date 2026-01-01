import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-balance',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './leave-balance.html',
  styleUrl: './leave-balance.css',
})
export class LeaveBalance implements OnInit {

  leaveBalances: any[] = [];
  showModal: boolean = false;
  isEditMode: boolean = false;
  
  newleavebalanceObj: any = {
    balanceId: 0,
    empId: 0,
    updatedDate: new Date().toISOString().split('T')[0],
    count: 0,
    updateBy: '',
    leaveType: ''
  };

  ngOnInit() {
    this.loadSampleData();
  }

  loadSampleData() {
    this.leaveBalances = [
      {
        balanceId: 1,
        empId: 1,
        leaveType: 'Sick Leave',
        count: 5,
        updateBy: 'Admin',
        updatedDate: '2025-11-13',
        empName: 'John Doe'
      },
      {
        balanceId: 2,
        empId: 2,
        leaveType: 'Paid Leave',
        count: 10,
        updateBy: 'Manager',
        updatedDate: '2025-11-10',
        empName: 'Jane Smith'
      }
    ];
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
    this.newleavebalanceObj = {
      balanceId: 0,
      empId: 0,
      updatedDate: new Date().toISOString().split('T')[0],
      count: 0,
      updateBy: '',
      leaveType: ''
    };
  }

  saveLeaveBalance() {
    if (!this.newleavebalanceObj.empId || !this.newleavebalanceObj.leaveType || !this.newleavebalanceObj.count) {
      alert('Please fill all required fields');
      return;
    }

    if (this.isEditMode) {
      const index = this.leaveBalances.findIndex(x => x.balanceId === this.newleavebalanceObj.balanceId);
      if (index !== -1) {
        this.leaveBalances[index] = { ...this.newleavebalanceObj };
      }
    } else {
      this.newleavebalanceObj.balanceId = this.leaveBalances.length + 1;
      this.leaveBalances.push({ ...this.newleavebalanceObj });
    }
    this.closeModal();
  }

  editLeaveBalance(leave: any) {
    this.isEditMode = true;
    this.newleavebalanceObj = { ...leave };
    this.showModal = true;
  }

  deleteLeaveBalance(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.leaveBalances = this.leaveBalances.filter(x => x.balanceId !== id);
    }
  }

}