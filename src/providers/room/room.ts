import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';

import { douyuUrl } from '../../utils/constants';
import { douyutvUrl } from '../../utils/constants';
import { douyucdnUrl } from '../../utils/constants';
import { roomData } from '../../utils/constants';
import { roomsAllData } from '../../utils/constants';
import { roomsData } from '../../utils/constants';
/*
  Generated class for the RoomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoomProvider {

  constructor(public http: HttpClient) {
  }
  getRoomData(urlPath): Observable<any> {
    return this.http.get(
      roomData + urlPath
    ).map(res => {
      return res;
    })
  };
  getRoomAllData(roomId): any {
    return this.http.get(
      roomData + roomId
    ).map(res => {
      return res;
    })
  }

  getRoomChatData(roomId,t): Observable<any> {
    return this.http.get(
      roomsAllData + "getBarrageList?rid=" + roomId + "&t=" + t + "&count=100"/*,{
        headers:new HttpHeaders({
          "Access-Control-Allow-Credentials":"false",
          "Access-Control-Allow-Headers":"Expires,Date,Server,Content-Type,Cache-Control,Pragma,Content-Encoding,X-Via,X-Dscp-Value,X-Cache-Remote",
          "Access-Control-Allow-Methods":"ET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH",
          "Access-Control-Allow-Origin":"*",
        })

      }*/
    ).map(res => {
      return res;
    })
  }

  getRoomAnchorData(roomId): Observable<any> {
    return this.http.get(
      douyuUrl + "video/getList?rid=" + roomId
    ).map(res => {
      return res;
    })
  }

  getRoomBroadcastData(roomId): Observable<any> {
    return this.http.get(
      douyuUrl + "room/getSimilarList?rid=" + roomId
    ).map(res => {
      return res;
    })
  }

}
