import { AuthService } from './auth/auth.service';
import { DataStorageService } from './shared/data-storage.service';
import { TasksService } from './to-do/tasks.service';
import { Task } from './to-do/task.model';
import { Data, Router } from '@angular/router';
import { Component, OnInit, OnChanges, AfterContentChecked } from '@angular/core';
import { WeatherService } from './weather/weather.service';
import { LocationService } from './shared/location.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'orgApp2';
  userPosition = {};
  tasks: Task[];
  isLoggedIn: boolean = false;
  private userSub: Subscription;

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private router: Router,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isLoggedIn = !user ? false : true;
      this.dataStorageService.localId = user?.id;
    });
    this.dataStorageService.fetchTasks();
  }
}
