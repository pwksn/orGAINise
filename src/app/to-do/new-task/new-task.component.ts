import { DateService } from './../../shared/date.service';
import { DataStorageService } from './../../shared/data-storage.service';
import { Task } from './../task.model';
import { TasksService } from './../tasks.service';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  private taskId: number;

  constructor(
    private _location: Location,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get taskName() { return this.taskForm.get('taskName') };

  ngOnInit(): void {
    this.daySelected = this.dataStorageService.getQueryParam('day');
    this.getParams();
    this.initForm();
    console.log(this.isEditMode);
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
    
    if (this.isEditMode) {
      this.changeTask(this.task);
      this.tasksService.storeAllTasks();
    } else {
      this.tasksService.addTask(this.task);
      this.tasksService.storeAllTasks();
    }
    this.onGoToTaskList();
  }

  onGoBack() {
    this._location.back();
  }

  onGoToTaskList() {
    this.router.navigateByUrl(`/todo/${this.task.taskDay}`);
  }

  private changeTask(task: Task) {
    if (this.daySelected !== task.taskDay) {
      // this.tasksService.removeTask(this.taskId, this.daySelected); //toDo
      this.tasksService.removeEditedTask(this.taskId,this.daySelected);
      this.tasksService.addTask(task);
    } else {
      this.tasksService.updateTask(this.taskId, this.task, this.task.taskDay);
    }
    // this.tasksService.storeAllTasks();
  }

  private getParams() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.taskId = +params['id'];
          console.log(this.taskId);
          this.isEditMode = params['id'] != null;
          console.log(this.isEditMode);
        }
      )
  }

  private initForm() {
    let taskName = '';
    let taskDay = 'today'; // default value 
    let taskDetails = '';
    let partnerName = '';
    let partnerNumber = '';
    let partnerMail = '';

    if (this.isEditMode) {
      console.log(this.taskId, this.daySelected);
      const task = this.tasksService.getTask(this.taskId, this.daySelected);
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
