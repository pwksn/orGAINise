import { DataStorageService } from './../shared/data-storage.service';
import { Task } from './task.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TasksResolverService implements Resolve<Task[]> {
    constructor( 
        private dataStorageService: DataStorageService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.dataStorageService.fetchTasks();

        // toDo: trzeba przypisac taski, które przyszły z Firebase, odpalić w fetchTasks sortTasksByDay jakoś, żeby nie było pętli
    }
}