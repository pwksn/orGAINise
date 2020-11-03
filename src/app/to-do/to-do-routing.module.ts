import { LaterTasksComponent } from './later-tasks/later-tasks.component';
import { TomorrowTasksComponent } from './tomorrow-tasks/tomorrow-tasks.component';
import { TodayTasksComponent } from './today-tasks/today-tasks.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', redirectTo: '/today', pathMatch: 'full' },
    { 
        path: 'today', 
        loadChildren: () => import('./today-tasks/today-tasks.module').then(m => m.TodayTasksModule) 
    },
    { 
        path: 'tomorrow', 
        loadChildren: () => import('./tomorrow-tasks/tomorrow-tasks.module').then(m => m.TomorrowTasksModule)
    },
    { 
        path: 'later', 
        loadChildren: () => import('./later-tasks/later-tasks.module').then(m => m.LaterTasksModule)
    },
    {
        path: 'new',
        loadChildren: () => import('./new-task/new-task.module').then(m => m.NewTaskModule),
    }, 
    {
        path: 'details/:id',
        loadChildren: () => import('./task-details/task-details.module').then(m => m.TaskDetailsModule),
    },
    {
        path: 'edit/:id',
        loadChildren: () => import('./new-task/new-task.module').then(m => m.NewTaskModule),
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ToDoRoutingModule {}