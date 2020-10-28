import { DataStorageService } from './../../shared/data-storage.service';
import { Task } from './../task.model';
import { TasksService } from './../tasks.service';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit, AfterViewInit {

  @ViewChild('taskName') private elementRef: ElementRef;
  taskForm: FormGroup;
  id: number;
  isEditMode: boolean = false;
  private daySelected: string;
  private task: Task;

  constructor(
    private _location: Location,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private router: Router, // toDo navigaton service in shared
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.daySelected = this.dataStorageService.getQueryParam('day');
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  onSubmit() {
    this.task = {
      taskName: this.taskForm.value['name'],
      taskDay: this.taskForm.value['day'],
      taskDetails: this.taskForm.value['details'],
      partnerName: this.taskForm.value['partner'],
      partnerNumber: this.taskForm.value['phone'],
      partnerMail: this.taskForm.value['mail']
    }
    this.tasksService.addTask(this.task);
    this.onGoToTaskList();
  }

  onGoBack() {
    this._location.back();
  }

  onGoToTaskList() {
    this.router.navigate([`../${this.task.taskDay}`], {relativeTo: this.route.parent});
  }

  private initForm() {
    let taskName = '';
    let taskDay = 'today'; // default value 
    let taskDetails = '';
    let partnerName = '';
    let partnerNumber = '';
    let partnerMail = '';

    if (this.isEditMode) {
      const task = this.tasksService.getTask(this.id, this.daySelected);
      taskName = task.taskName;
      taskDay = task.taskDay;
      taskDetails = task.taskDetails;
      partnerName = task.partnerName;
      partnerNumber = task.partnerNumber;
      partnerMail = task.partnerMail;
    }

    this.taskForm = new FormGroup({
      'name': new FormControl(taskName, [Validators.required, Validators.maxLength(30)]), // toDo: komunikat
      'day': new FormControl(taskDay),
      'details': new FormControl(taskDetails),
      'partner': new FormControl(partnerName),
      'phone': new FormControl(partnerNumber),
      'mail': new FormControl(partnerMail)
    })
  }
}
