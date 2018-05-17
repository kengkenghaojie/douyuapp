import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the LiveListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LiveListProvider {

  private liveListDataUrl = 'http://api.douyutv.com/api/v1/live'
  private liveListDataUrl1 = 'http://open.douyucdn.cn/api/RoomApi/live'

  constructor(public http: HttpClient) {
    console.log('Hello LiveListProvider Provider');
  }

  liveListData(serviceName): Observable<any> {
    return this.http.get(
      this.liveListDataUrl+'/'+serviceName
    ).map(res => {
      return res;
    })
  };
  liveAllListData(): Observable<any> {
    //console.log(window.localStorage.getItem("shortName"))
    return this.http.get(
      this.liveListDataUrl1
    ).map(res => {
      return res;
    })
  };

}
