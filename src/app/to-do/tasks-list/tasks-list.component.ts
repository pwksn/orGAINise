import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  // public tasks: string[] = ['Task 1', 'Task 2', 'Task 3', 'Task 1', 'Task 2', 'Task 3', 'Task 1', 'Task 2', 'Task 3', 'Task 1', 'Task 2', 'Task 3', 'Task 1', 'Task 2', 'Task 3', 'Task 1', 'Task 2', 'Task 3',];

  public tasks: string[] = ['Task 1', 'Task 2', 'Task 3'];

  constructor() { }

  ngOnInit(): void {
  }

}
