import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { douyuUrl } from '../../utils/constants';
import { douyutvUrl } from '../../utils/constants';
import { douyucdnUrl } from '../../utils/constants';
import { roomData } from '../../utils/constants';
import { roomsData } from '../../utils/constants';
/*
  Generated class for the RoomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoomProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RoomProvider Provider');
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

}
