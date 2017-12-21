import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

/*import { HomeData } from '../utils/constants';*/
const classificationData = 'https://m.douyu.com/category'
/*
  Generated class for the MyFunction provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClassificationService {

  constructor(private http: Http) { }

  getClassificationData(): Observable<any[]> {
    return this.http.get(classificationData)
      .map(res => <any[]>res.json())
  }
}