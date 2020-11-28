import { AirConditionData } from './../weather/weather-response.model';
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
        return this.http.put(`https://orgainise-webapp.firebaseio.com/usersData/${this.localId}/tasks.json`, tasks)
            .subscribe(response => console.log(response));
    }

    public fetchTasks() {
        return this.http.get<Task[]>(`https://orgainise-webapp.firebaseio.com/usersData/${this.localId}/tasks.json`);
    }

    public storeAirCondition(airCondition: AirConditionData) {
        return this.http.put(`https://orgainise-webapp.firebaseio.com/apiCalls/lastAirCondition.json`, airCondition)
        .subscribe(response => console.log(response));
    }

    public fetchAirCondition() {
        return this.http.get<AirConditionData>(`https://orgainise-webapp.firebaseio.com/apiCalls/lastAirCondition.json`);
    }

    public storeTotalTasks(totalTasksNumber: number) {
        return this.http.put(`https://orgainise-webapp.firebaseio.com/usersData/${this.localId}/totalTasks.json`, totalTasksNumber)
            .subscribe(response => console.log(response));
    }

    public fetchTotalTasks() {
        return this.http.get<number>(`https://orgainise-webapp.firebaseio.com/usersData/${this.localId}/totalTasks.json`);
    }

    public storeInvitation(receiverEmail: string, task: Task, uniqueId: number) {
        const formattedMail = receiverEmail.replace('.', '(dot)');
        return this.http.put(`https://orgainise-webapp.firebaseio.com/invitations/${formattedMail}/${uniqueId}.json`, task)
            .subscribe(response => {
                if (response ) {
                  task.isInvited = true;
                  task.taskUniqueId = uniqueId;
                }
                console.log(task);
            });
    }

    public fetchInvitations(receiverEmail: string) {
        const formattedMail = receiverEmail.replace('.', '(dot)');
        return this.http.get<Task[]>(`https://orgainise-webapp.firebaseio.com/invitations/${formattedMail}.json`);
    }

    public removeInvitation(task: Task) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const userEmail = userData.email;
      const formattedMail = userEmail.replace('.', '(dot)');
      const uniqueId = task.taskUniqueId;
      return this.http.delete(`https://orgainise-webapp.firebaseio.com/invitations/${formattedMail}/${uniqueId}.json`).subscribe(response => {
        console.log(response);
      })
    }
}
