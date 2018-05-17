import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

@Injectable()
export class HttpServerProvider implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let CsReq = req;

    if (req.body) {       //加这个判断是不让跨域的地方添加token，因为斗鱼那边没有接收
      CsReq = req.clone({
        headers: new HttpHeaders({
          "token":"haojie",
        })
      });
    }
    //console.log(CsReq)
    return next
      .handle(CsReq)
      .flatMap((event: any) => {
        if (event instanceof HttpResponse && event.body.success !== true) {
          return Observable.create(observer => observer.error(event));
        }
        //console.log(event)
        return Observable.create(observer => observer.next(event));
      })
      .catch((res: HttpResponse<any>) => {
        //console.log(res)
        let result;
        switch (res.status) {
          case 401:
            result = res;
            break;
          case 200:
            result = res;
            break;
          case 404:
            result = res;
            break;
        }
        // 以错误的形式结束本次请求
        return Observable.create(observer => observer.next(result));
      })
  }

}
