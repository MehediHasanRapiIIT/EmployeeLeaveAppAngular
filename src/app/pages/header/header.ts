import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from '../../service/master-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  sidebarOpen = signal(true);
  loggedInUsername = signal<string | null>(null);

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
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUsername.set(user);
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('authToken');
    this.loggedInUsername.set(null);
    this.router.navigate(['/login']);
  }
}
