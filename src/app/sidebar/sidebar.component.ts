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
    console.log('toggle');
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded);
    return this.isExpanded;
  }

  onSubmenuClose() {
    this.isExpanded = false;
  }
}
