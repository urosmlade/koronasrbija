import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Drzava } from './drzava.model';

@Injectable()
export class StatistikaService{

    private ukupnoUrl = 'https://api.coronastatistics.live/timeline/global';

    private drzavaUrl = 'http://api.coronastatistics.live/timeline/';


    total:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    zemlja:BehaviorSubject<any> = new BehaviorSubject<any>(null);


    constructor(private http:HttpClient){}

    ucitajUkupno():Observable<any>{
        this.http.get<any>(this.ukupnoUrl).subscribe(data=>{
            this.total.next(data);
        })
        return this.total.asObservable(); 
    }


    ucitajZemlju(zemlja:string):Observable<any>{
        this.http.get<any>(this.drzavaUrl + zemlja).subscribe(data=>{
            this.zemlja.next(data);
        })
        return this.zemlja.asObservable();
    }


    /*handleError(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert("Please check your internet connection!.");
        return throwError(errorMessage);
     }*/



}