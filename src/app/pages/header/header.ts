import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../service/master-service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  sidebarOpen = signal(true);
  username = '';
  role = '';

  constructor(
    private masterService: MasterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getLoggedInUser();
  }

  toggleSidebar() {
    this.sidebarOpen.update(value => !value);
  }

  getLoggedInUser() {
    const user = localStorage.getItem('leaveUser');
    if (user != null) {
      const userObj = JSON.parse(user);
      this.username = userObj.userName;
      this.role = userObj.role;
    }
  }

  logout() {
    localStorage.removeItem('leaveUser');
    
    this.router.navigateByUrl('login');
  }
}
