import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

/*
  Generated class for the ThemeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThemeProvider {

  private theme: BehaviorSubject<String>;

  constructor() {
    // theme 是 BehaviorSubject实例
    this.theme = new BehaviorSubject('light-theme');
  }

  setActiveTheme(val) {
    // 改变值
    this.theme.next(val);
  }

  getActiveTheme() {
    // 观察
    return this.theme.asObservable();
  }

}
