import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { douyuUrl } from '../../utils/constants';
import { douyutvUrl } from '../../utils/constants';
import { douyucdnUrl } from '../../utils/constants';
import { roomData } from '../../utils/constants';
import { roomsData } from '../../utils/constants';
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import {Jsonp} from "@angular/http";

/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeProvider {

  constructor(public http: HttpClient,public jsonp:Jsonp) {

  }
  //private aaa = new HttpParams().set("fBoardId","000000000018").set("pageNo","1").set("pageSize","10");

  getCommonData(urlPath): Observable<any> {
    return this.http.get(
      douyuUrl + urlPath,
      /*{
        headers:new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        })
      }*/
    ).map(res => {
        return res;
      })  //map的返回就是原本的数据类型
    /*return this.jsonp.get(douyuUrl + urlPath).map(res => {
      console.log(res)
      return res;
    })*/
  };

  test(): Observable<any> {
    return this.http.post(
      "http://121.8.235.162:9802/api/news/newss",
      {
        fBoardId:"000000000018",
        pageNo:"1",
        pageSize:"10"
      },{
        headers:new HttpHeaders({
          "Content-Type":"application/json",
          "Accept":"application/json"
        })
      }
    ).map(res => {
      return res;
    })  //map的返回就是原本的数据类型
  };
}
