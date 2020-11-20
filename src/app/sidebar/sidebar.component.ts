import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  isExpanded = false; // to toggle submenu
  isMobile: boolean = false;
  private userSub: Subscription;
  public isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (window.innerWidth < 992) { // 768px portrait
      this.isMobile = true;
    }
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSubmenuToggle() {
    this.isExpanded = !this.isExpanded;
    return this.isExpanded;
  }

  onSubmenuClose() {
    this.isExpanded = false;
  }

  onPerformLogout() {
    this.authService.logOut();
  }
}
