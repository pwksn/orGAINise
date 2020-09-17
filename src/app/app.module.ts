import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

import { } from './shared/location.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

const appRoutes: Routes = [
  { path: '', component: LayoutComponent },
  // { path: 'weather', component: WeatherComponent }
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule)
  },
  {
    path: 'pomodoro',
    loadChildren: () => import('./pomodoro/pomodoro.module').then(m => m.PomodoroModule)
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
