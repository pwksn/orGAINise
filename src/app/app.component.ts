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
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'orgApp2';
  userPosition = {};
  currentRoute: string;
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
    // this.tasks = this.tasksService.mockTasks;
    // this.dataStorageService.fetchTasks().subscribe(
    //   fetchedTasks => {
    //     console.log(fetchedTasks);
    //     fetchedTasks ? this.tasksService.sortTasksByDay(fetchedTasks) : null;
    //   }
    // );
    this.authService.autoLogin();
    this.locationService.getPosition().then(pos => {
      this.weatherService.getWeather(pos.lng, pos.lat);
    });
    this.userSub = this.authService.user.subscribe(user => {
      this.isLoggedIn = !user ? false : true;
    });

    // this.tasksService.sortTasksByDay(this.tasks);
  }

  ngAfterContentChecked() {
    this.currentRoute = this.router.url;
  }
}
