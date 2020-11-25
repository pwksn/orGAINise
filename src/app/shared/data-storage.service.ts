import { AuthService } from './../auth/auth.service';
import { TasksService } from './../to-do/tasks.service';
import { Task } from './../to-do/task.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    // private allTasks: Task[];
    public localId: string;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
    ) {}

    public getQueryParam(param: string) {
        return this.route.snapshot.queryParamMap.get(param);
    }

    public storeTasks(tasks: Task[]) {
        return this.http.put(`https://orgainise-webapp.firebaseio.com/${this.localId}.json`, tasks)
            .subscribe(response => console.log(response));
    }

    public fetchTasks() {
        console.log(`https://orgainise-webapp.firebaseio.com/${this.localId}.json`);
        return this.http.get<Task[]>(`https://orgainise-webapp.firebaseio.com/${this.localId}.json`);
    }
}
