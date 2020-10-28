import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) {}

    public getQueryParam(param: string) {
        return this.route.snapshot.queryParamMap.get(param);
    }
}