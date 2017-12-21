import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

/*import { HomeData } from '../utils/constants';*/
const liveListData = 'http://api.douyutv.com/api/v1/live'
const liveListData1 = 'http://open.douyucdn.cn/api/RoomApi/live'
/*
  Generated class for the MyFunction provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LiveListService {

  constructor(private http: Http) { }

  liveListData(serviceName): Observable<any[]> {
  	//console.log(window.localStorage.getItem("shortName"))
    return this.http.get(liveListData+'/'+serviceName)
      .map(res => <any[]>res.json())
  };
  liveAllListData(): Observable<any[]> {
  	//console.log(window.localStorage.getItem("shortName"))
    return this.http.get(liveListData1)
      .map(res => <any[]>res.json())
  };
}