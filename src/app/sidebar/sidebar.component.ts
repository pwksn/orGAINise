import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isExpanded = false; // to toggle submenu

  constructor() { }

  ngOnInit(): void {
  }

  onSubmenuToggle() {
    this.isExpanded = !this.isExpanded;
    return this.isExpanded;
  }

  onSubmenuClose() {
    this.isExpanded = false;
  }
}
