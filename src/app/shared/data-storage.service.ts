import { TasksService } from './../to-do/tasks.service';
import { Task } from './../to-do/task.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    // private allTasks: Task[];
    
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
    ) {}

    public getQueryParam(param: string) {
        return this.route.snapshot.queryParamMap.get(param);
    }

    public storeTasks(tasks: Task[]) {
        return this.http.put('https://orgainise-webapp.firebaseio.com/allTasks.json', tasks)
            .subscribe(response => console.log(response));
    }

    public fetchTasks() {
        // this.http.get<Task[]>('https://orgainise-webapp.firebaseio.com/allTasks.json')
        //     .subscribe(tasks => console.log(tasks));
        return this.http.get<Task[]>('https://orgainise-webapp.firebaseio.com/allTasks.json');
    }
}