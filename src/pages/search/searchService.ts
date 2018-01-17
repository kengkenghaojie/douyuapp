import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { searchListData } from '../../utils/constants';
import { searchKeyData } from '../../utils/constants';
import {HttpService} from "../../common/HttpService";
//const searchListData = 'https://m.douyu.com/search/getTodayTopData?limit=10&isAjax=1';
//const searchKeyData = 'https://m.douyu.com/search/getData?sk=';
//https://m.douyu.com/search/getData?sk=aaa&type=1&sort=1&limit=20&offset=0
/*
 Generated class for the MyFunction provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class searchService {

  constructor(private http: Http, public httpService: HttpService) { }

  searchListData(): Observable<any[]> {
    return this.httpService.get(searchListData)
      .map(res => <any[]>res.json())
  };
  showSearchListData(sk:string,type:number, sort:number, limit:number, offset:number ): Observable<any[]> {
  	/*console.log("sk",sk);
  	console.log("type",type);
  	console.log("sort",sort);
  	console.log("limit",limit);
  	console.log("offset",offset);*/
    return this.httpService.get(searchKeyData + sk +"&type=" + type +"&sort=" +sort+"&limit="+limit+"&offset="+offset)
      .map(res => <any[]>res.json())
  };

}
