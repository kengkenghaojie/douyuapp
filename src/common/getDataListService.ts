import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { douyuUrl } from '../utils/constants';
import { douyutvUrl } from '../utils/constants';
import { douyucdnUrl } from '../utils/constants';
import { roomData } from '../utils/constants';
import { roomsData } from '../utils/constants';

@Injectable()
export class getDataListService {

  constructor(private http: Http) { }

  getCommonData(urlPath): Observable<any[]> {
    return this.http.get(douyuUrl + urlPath)
      .map(res => <any[]>res.json())  //map的返回就是原本的数据类型
  };
  //这2个是获取liveList的数据  （还没有优化成一个方法）
  liveListData(serviceName): Observable<any[]> {
    return this.http.get(douyucdnUrl+serviceName)
      .map(res => <any[]>res.json())
  };
  liveAllListData(): Observable<any[]> {
    return this.http.get(douyucdnUrl)
      .map(res => <any[]>res.json())
  };
  getRoomData(val): Observable<any[]> {
    console.log(roomData+ val)
    return this.http.get(roomData+ val)
      .map(res => <any[]>res.json())
  }
  getRoomAllData(roomId): Observable<any[]> {
    return this.http.get(roomsData+ roomId)
      .map(res => <any[]>res.json())
  }
  getRoomAllLive (): Observable<any[]> {
    console.log(douyucdnUrl)
    return this.http.get(douyucdnUrl)
      .map(res => <any[]>res.json())
  };

}
