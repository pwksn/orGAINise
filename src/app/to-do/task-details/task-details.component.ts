import { AuthService } from './../../auth/auth.service';
import { DateService } from './../../shared/date.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TasksService } from './../tasks.service';
import { Task, Partner } from './../task.model';
import { DataStorageService } from './../../shared/data-storage.service';
import { formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  private daySelected: string;
  private tasksList: Task[];
  public task: Task;
  private taskIndex: number;
  private currentUserMail: string = this.tasksService.currentUserMail;
  public taskPartners: Task[] = [];

  constructor(
    private _location: Location,
    private dataStorageService: DataStorageService,
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
    private dateService: DateService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.daySelected = this.dataStorageService.getQueryParam('day');
    this.getTaskId(); // get index from route param insted
    this.setTask(this.daySelected);
    this.taskPartners = this.task.partners;
    console.log(this.taskIndex);
    console.log(this.taskPartnersLength);
  }

  private getTaskId() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.taskIndex = +params['id'];
        }
      )
  }

  onGoBack() {
    this._location.back();
  }

  onTaskEdit() {
    this.router.navigate(['../../../edit', this.taskIndex],
    {
      queryParams: {
        day: this.daySelected,
      },
      relativeTo: this.route
    });
  }

  setTask(day: string) {
    if (day === 'today') {
      this.tasksList = this.tasksService.getTodayTasks();
    } else if (day === 'tomorrow') {
      this.tasksList = this.tasksService.getTomorrowTasks();
    } else {
      this.tasksList = this.tasksService.getLaterTasks();
    }
    this.task = this.tasksList[this.taskIndex];
    console.log(this.task);
  }

  onPhoneCall(partner: Partner) {
    window.location.href =`tel:${partner.partnerNumber}`;
  }

  onSendMail(partner: Partner) {
    let taskUniqueId: number = this.dateService.getTimeMs;
    const taskToSend: Task = Object.assign({}, this.task);
    taskToSend.partnerMail = this.tasksService.currentUserMail;
    taskToSend.partnerNumber = null;
    taskToSend.partnerName = null;
    taskToSend.taskUniqueId = taskUniqueId;
    this.dataStorageService.storeInvitation(partner.partnerMail, taskToSend, taskUniqueId);
    partner.isInvited = true;
    this.tasksService.storeAllTasks();
  }

  isItMe(partnerMail: string) {
    return partnerMail === this.currentUserMail ? true : false;
  }

  get taskPartnersLength() {
    return this.task.partners.length;
  }

}
