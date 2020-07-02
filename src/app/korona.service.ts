import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class KoronaService{

    //url = 'https://raw.githubusercontent.com/urosmlade/korona/master/json'; moj git
    urlSveZemlje = 'https://api.coronastatistics.live/countries?sort=cases';
    urlDrzava = 'https://api.coronastatistics.live/countries/';
    vremeurl = 'https://raw.githubusercontent.com/urosmlade/korona/master/azurirano';
    urlTimelineZemlja = 'https://api.coronastatistics.live/timeline/';
    urlukupno = 'https://api.coronastatistics.live/all';
    urltotaltimeline = 'https://api.coronastatistics.live/timeline/global';

    virus:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    vreme:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    timeline:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    sveZemlje:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    ukupno:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    totalTimeline:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(public httpClient:HttpClient){}


    ucitajTotalTimeline():Observable<any>{
        this.httpClient.get<any>(this.urltotaltimeline).subscribe(data=>{
            this.totalTimeline.next(data)
        })
        return this.totalTimeline.asObservable();
    }

 
    ucitajUkupno():Observable<any>{
        this.httpClient.get<any>(this.urlukupno).subscribe(data=>{
            this.ukupno.next(data);
        })
        return this.ukupno.asObservable();
    }


    ucitajSveZemlje():Observable<any[]>{
        this.httpClient.get<any[]>(this.urlSveZemlje).subscribe(data=>{
            this.sveZemlje.next(data);
        })
        return this.sveZemlje.asObservable();
    }

    ucitajDrzavu(naziv:string):Observable<any>{
        this.httpClient.get<any>(this.urlDrzava + naziv).subscribe(data=>{
            this.virus.next(data);
        })
        return this.virus.asObservable();
    }


    ucitajvreme():Observable<any>{
        this.httpClient.get<any>(this.vremeurl).subscribe(data=>{
            this.vreme.next(data);
        })
        return this.vreme.asObservable();
    }


    ucitajTimeline(naziv:string):Observable<any>{
        this.httpClient.get<any>(this.urlTimelineZemlja + naziv).subscribe(data=>{
            this.timeline.next(data);
        })
        return this.timeline.asObservable();
    }



}