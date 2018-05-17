import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { searchListData } from '../../utils/constants';
import { searchKeyData } from '../../utils/constants';
/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SearchProvider Provider');
  }

  searchListData(): Observable<any> {
    return this.http.get(
      searchListData
    ).map(res => {
      return res;
    })
  };
  showSearchListData(sk:string,type:number, sort:number, limit:number, offset:number ): Observable<any> {
    /*console.log("sk",sk);
     console.log("type",type);
     console.log("sort",sort);
     console.log("limit",limit);
     console.log("offset",offset);*/
    return this.http.get(searchKeyData + sk +"&type=" + type +"&sort=" +sort+"&limit="+limit+"&offset="+offset)
      .map(res => {
        return res;
      })
  };
}
