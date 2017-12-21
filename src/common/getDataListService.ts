import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { douyuUrl } from '../utils/constants';
import { douyutvUrl } from '../utils/constants';
import { douyucdnUrl } from '../utils/constants';

@Injectable()
export class getDataListService {

  constructor(private http: Http) { }

  getCommonData(urlPath): Observable<any[]> {
    return this.http.get(douyuUrl + urlPath)
      .map(res => <any[]>res.json())  //map的返回就是原本的数据类型
  }

}
