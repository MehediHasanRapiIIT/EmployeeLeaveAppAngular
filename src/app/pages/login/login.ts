import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../service/master-service';
import { ApiResponseModel } from '../../models/Employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

masterSer = inject(MasterService);
router = inject(Router);


loginForm: FormGroup = new FormGroup({
  userName: new FormControl(''),
  password: new FormControl('')
});

onLogin() {
  const formValue = this.loginForm.value;
this.masterSer.onLogin(formValue).subscribe({
  next:(result:any)=>{
    localStorage.setItem('leaveUser', JSON.stringify(result));
    if(result.role == 'Hr'){
      this.router.navigateByUrl('employee');
    }else{
      this.router.navigateByUrl('leave-request');
    }
  },
  error:(error:any)=>{
    alert(error.error.message);
  }
})

}

}
