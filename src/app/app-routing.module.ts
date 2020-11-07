import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/pomodoro', pathMatch: 'full'},
    { 
        path: 'todo',
        loadChildren: () => import('./to-do/to-do.module').then(m => m.ToDoModule)
    }, 
    {
        path: 'weather',
        loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule)
    },
    {
        path: 'pomodoro',
        loadChildren: () => import('./pomodoro/pomodoro.module').then(m => m.PomodoroModule)
    },
    {
        path: '404',
        loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
    },
    {
        path: '**', redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, 
        { preloadingStrategy: PreloadAllModules }
    )],
    exports: [RouterModule]
})

export class AppRoutingModule {
    
}