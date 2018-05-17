import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the ClassificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClassificationProvider {

  public classificationData = 'https://m.douyu.com/category'

  constructor(public http: HttpClient) {
    console.log('Hello ClassificationProvider Provider');
  }
  getClassificationData(): Observable<any> {
    return this.http.get(
      this.classificationData
    ).map(res => {
      return res;
    })
  };

}
