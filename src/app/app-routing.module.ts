import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

let defaultRoute: string = '/auth';

if (localStorage.getItem('userData')) {
    defaultRoute = '/todo/today'
};

const appRoutes: Routes = [
    { path: '', redirectTo: defaultRoute, pathMatch: 'full'},
    {
        path: 'todo',
        loadChildren: () => import('./to-do/to-do.module').then(m => m.ToDoModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'weather',
        loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'pomodoro',
        loadChildren: () => import('./pomodoro/pomodoro.module').then(m => m.PomodoroModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
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
