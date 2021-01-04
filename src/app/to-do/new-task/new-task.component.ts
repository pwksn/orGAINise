import { DateService } from './../../shared/date.service';
import { DataStorageService } from './../../shared/data-storage.service';
import { Partner, Task } from './../task.model';
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
  public taskTimeCycles: number = 1;
  public taskTime: number[] = [0, 25];
  private taskCyclesDone: number;
  public partnersList: Partner[] = [];

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
    if (this.isEditMode && this.taskTimeCycles) {
      this.taskTime = this.tasksService.calculateTaskTime(this.taskTimeCycles);
    };
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  onSubmit() {
    this.task = {
      taskName: this.taskForm.value['name'],
      taskDay: this.taskForm.value['day'],
      taskDetails: this.taskForm.value['details'],
      taskCycles: this.taskTimeCycles,
      taskCyclesDone: this.taskCyclesDone,
      partners: this.partnersList
    }

    if (this.isEditMode) {
      if (this.task.partners) {
        for (let partner of this.task.partners) {
          partner.isInvited = false;
        }
      }
      this.changeTask(this.task);
    } else {
      this.tasksService.addTask(this.task);
    }
    this.tasksService.storeAllTasks(this.task.taskDay);
  }

  public onAddPartner() {
    const newPartner: Partner = {
      partnerName: this.taskForm.value['partner'],
      partnerNumber: this.taskForm.value['phone'],
      partnerMail: this.taskForm.value['mail']
    };
    this.partnersList.push(newPartner);
    this.taskForm.controls['partner'].reset();
    this.taskForm.controls['phone'].reset();
    this.taskForm.controls['mail'].reset();
  }

  onGoBack() {
    this._location.back();
  }

  onGoToTaskList() {
    this.router.navigateByUrl(`/todo/${this.task.taskDay}`);
  }

  private changeTask(task: Task) {
    if (this.daySelected !== task.taskDay) {
      this.tasksService.removeEditedTask(this.taskId,this.daySelected);
      this.tasksService.addTask(task);
    } else {
      this.tasksService.updateTask(this.taskId, this.task, this.task.taskDay);
    }
  }

  private getParams() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.taskId = +params['id'];
          this.isEditMode = params['id'] != null;
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
      const task = this.tasksService.getTask(this.taskId, this.daySelected);
      taskName = task.taskName;
      taskDay = task.taskDay;
      taskDetails = task.taskDetails;
      this.taskTimeCycles = task.taskCycles;
      this.taskCyclesDone = task.taskCyclesDone;
      this.partnersList = task.partners;
    }

    this.taskForm = new FormGroup({
      'name': new FormControl(taskName, [Validators.required, Validators.maxLength(30)]),
      'day': new FormControl(taskDay),
      'details': new FormControl(taskDetails),
      'partner': new FormControl(partnerName),
      'phone': new FormControl(partnerNumber),
      'mail': new FormControl(partnerMail)
    })
  }

  get name() { return this.taskForm.get('name'); }

  public changeTaskCycle(operation: string) {
    if (operation === 'increase' && this.taskTimeCycles < 99) {
      this.taskTimeCycles++;
    } else if(this.taskTimeCycles > 0){
      this.taskTimeCycles--;
    }
    this.taskTime = this.tasksService.calculateTaskTime(this.taskTimeCycles);
  }

  public canBeAdded() {
    return this.taskForm.value['partner'] ? true : false;
  }

  public onRemovePartner(partner: Partner) {
    const index = this.partnersList.indexOf(partner);
    this.partnersList.splice(index, 1);
  }
}
