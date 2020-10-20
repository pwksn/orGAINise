import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  constructor(
    private _location: Location,
  ) { }

  ngOnInit(): void {
  }

  onGoBack() {
    this._location.back();
  }

}
