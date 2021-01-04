import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DateService {

    private todayDate = new Date();
    private todayForTomorrowDate = new Date();
    private tomorrowDate = new Date(this.todayForTomorrowDate.setDate(this.todayForTomorrowDate.getDate() + 1));
    private currentDayNumber = this.todayDate.getUTCDate();
    private currentMonthNumber = this.todayDate.getMonth();
    private currentYearNumber = this.todayDate.getFullYear();
    private tomorrowDayNumber = this.tomorrowDate.getUTCDate();
    private tomorrowMonthNumber = this.tomorrowDate.getMonth();
    private tomorrowYearNumber = this.tomorrowDate.getFullYear();

    private polishMonthsNames: string[] = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

    get today() {
        return this.todayDate.setHours(0, 0, 0, 0);
    }

    get tomorrow() {
        return this.tomorrowDate.setHours(0, 0, 0, 0);;
    }

    get currentDay() {
        return this.currentDayNumber;
    }

    get currentMonth() {
        return this.polishMonthsNames[this.currentMonthNumber];
    }

    get currentYear() {
        return this.currentYearNumber;
    }

    get tomorrowDay() {
        return this.tomorrowDayNumber;
    }

    get tomorrowMonth() {
        return this.polishMonthsNames[this.tomorrowMonthNumber];
    }

    get tomorrowYear() {
        return this.tomorrowYearNumber;
    }

    get getTimeMs(){
        const dateNow = new Date().getTime();
        return dateNow;
    }
    
}