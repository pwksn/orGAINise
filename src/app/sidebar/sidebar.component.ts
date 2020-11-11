import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isExpanded = false; // to toggle submenu
  isMobile: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth < 992) { // 768px portrait
      this.isMobile = true;
    }
  }

  onSubmenuToggle() {
    this.isExpanded = !this.isExpanded;
    return this.isExpanded;
  }

  onSubmenuClose() {
    this.isExpanded = false;
  }

  onPerformLogout() {
    console.log('logout from sidenav clicked!');
  }
}
