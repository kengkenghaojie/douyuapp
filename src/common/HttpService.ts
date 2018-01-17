import {Injectable} from '@angular/core';
import {
  Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpService {
  constructor(public http: Http) {
  }

  count: number = 0;//记录未完成的请求数量

  private begin() {
    console.time('http');
    console.log("开始")
}
private end() {
  console.timeEnd("end");
  console.log("结束")
}

  // public request(url: string, options: RequestOptionsArgs): Observable<Response> {
  //   console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
  //   return Observable.create(observer => {
  //     console.log("成功创建订阅")
  //     this.http.request(url, options).subscribe(res => {
  //       console.log("进入分发",res)
  //        let result = this.requestSuccessHandle(url, options, res);
  //       console.log("返回成功的东西",result)
  //       observer.next(result.data)
  //        //result.success ? observer.next(result.data) : observer.error(result.data);
  //     }, err => {
  //       console.log(err)
  //       observer.error(this.requestFailedHandle(url, options, err));
  //     });
  //   });
  // }

  public get(url: string, paramMap: any = null): Observable<any> {
    
    // return this.request(url, new RequestOptions({
    //   method: RequestMethod.Get,
    //   search: HttpService.buildURLSearchParams(paramMap)
    // }));
    this.begin();
    console.log("get",url)
    return this.http
            .get(url)
            .do(() => {this.end();})
            .catch((res) => {
                console.warn(res,'jjjj')
                this.end();
                return res;
            });
  }

 /**
     * POST请求
     *
     * @param {string} url URL地址
     * @param {*} [body] body内容
     * @param {*} [params] 请求参数
     */
    post(url: string, body?: any, params?: any): Observable<any> {
      this.begin();
      return this.http
          // .post(url, body || null, {
          //     params: this.parseParams(params)
          // })
          .post(url, body || null, params)
          .do(() => this.end())
          .catch((res) => {
              this.end();
              return res;
          });
  }

  /**
   * DELETE请求
   *
   * @param {string} url URL地址
   * @param {*} [params] 请求参数
   */
  delete(url: string, params?: any): Observable<any> {
      this.begin();
      return this.http
          // .delete(url, {
          //     params: this.parseParams(params)
          // })
          .delete(url,params)
          .do(() => this.end())
          .catch((res) => {
              this.end();
              return res;
          });
  }

  /**
   * Request请求
   *
   * @param {string} url URL地址
   * @param {*} [params] 请求参数
   */
  request(method:string, url: string,body ?:any, params?: any): Observable<any> {
      this.begin();
      return this.http
          // .request(method,url, {
          //     body:body ,
          //     params: this.parseParams(params)
          // })
          .request(url, params)
          .do(() => this.end())
          .catch((res) => {
              this.end();
              return res;
          });
  }

  /**
   * PUT请求
   *
   * @param {string} url URL地址
   * @param {*} [body] body内容
   * @param {*} [params] 请求参数
   */
  put(url: string, body?: any, params?: any): Observable<any> {

      this.begin();
      return this.http
          // .put(url, body || null, {
          //     params: this.parseParams(params)
          // })
          .put(url, body || null, params)
          .do(() => this.end())
          .catch((res) => {
              this.end();
              return res;
          });
  }

//   parseParams(params: any): HttpParams {
//     let ret = new HttpParams();
//     if (params) {
//         // tslint:disable-next-line:forin
//         for (const key in params) {
//             let _data = params[key];
//             // 将时间转化为：时间戳 (秒)
//             if (moment.isDate(_data)) {
//                 _data = moment(_data).unix();
//             }
//             ret = ret.set(key, _data);
//         }
//     }
//     return ret;
// }



  /**
   * 将对象转为查询参数
   */
  private static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      if (val instanceof Date) {
        val //= Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
      }
      params.set(key, val);
    }
    return params;
  }

  /**
   * 处理请求成功事件
   */
  requestSuccessHandle(url: string, options: RequestOptionsArgs, res: Response) {
    console.log("进入成功事件",url,res, res.json())
    let json = res.json();    //为数据
    //if (url.indexOf(APP_SERVE_URL) != -1) {
      if (!res.ok) {
        console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'err', res);
        return {success: false, data: json};
      } else {
        console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
        return {success: true, data: json};
      }
    //} else {
      //return {success: true, data: json};
    //}
  }


  /**
   * 处理请求失败事件
   */
  private requestFailedHandle(url: string, options: RequestOptionsArgs, err: Response) {
    console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'err', err);
    //if (!this.nativeService.isConnecting()) {
     // this.nativeService.alert('请连接网络');
    // } else if (err instanceof TimeoutError) {
    //   this.nativeService.alert('请求超时,请稍后再试!');
    // } else {
      let status = err.status;
      let msg = '请求发生异常';
      if (status === 0) {
        msg = '请求失败，请求响应出错';
      } else if (status === 404) {
        msg = '请求失败，未找到请求地址';
      } else if (status === 500) {
        msg = '请求失败，服务器出错，请稍后再试';
      }
      //this.nativeService.alert(msg);
      // this.logger.httpLog(err, msg, {
      //   url: url,
      //   status: status
      // });
    //}
    return err;
  }

  
}
