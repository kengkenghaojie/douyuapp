import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { douyuUrl } from '../../utils/constants';
const HomeData = 'https://m.douyu.com/index/getHomeData'
/*
  Generated class for the MyFunction provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HomeService {

  constructor(private http: Http) {
    console.log(douyuUrl)
  }

  getNews(): Observable<any[]> {
    return this.http.get(douyuUrl + "index/getHomeData")
      .map(res => <any[]>res.json())  //map的返回就是原本的数据类型
  }
}
