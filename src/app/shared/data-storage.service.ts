import { TasksService } from './../to-do/tasks.service';
import { Task } from './../to-do/task.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    private allTasks: Task[];
    
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private tasksService: TasksService
    ) {}

    public getQueryParam(param: string) {
        return this.route.snapshot.queryParamMap.get(param);
    }

    public storeTasks(tasks: Task[]) {
        this.allTasks = this.tasksService.mockTasks;
        this.http.put('https://orgainise-webapp.firebaseio.com/allTasks.json', this.allTasks);
    }
}