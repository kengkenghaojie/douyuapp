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

  public request(url: string, options: RequestOptionsArgs): Observable<Response> {
    console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
    return Observable.create(observer => {
      console.log("成功创建订阅")
      this.http.request(url, options).subscribe(res => {
        console.log("进入分发",res)
         let result = this.requestSuccessHandle(url, options, res);
        console.log("返回成功的东西",result)
         result.success ? observer.next(result.data) : observer.error(result.data);
      }, err => {
        console.log(err)
        observer.error(this.requestFailedHandle(url, options, err));
      });
    });
  }

  public get(url: string, paramMap: any = null): Observable<any> {
    console.log("get",url)
    return this.request(url, new RequestOptions({
      method: RequestMethod.Get,
      search: HttpService.buildURLSearchParams(paramMap)
    }));
  }

  public post(url: string, body: any = {}): Observable<any> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: body,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }));
  }

  public postFormData(url: string, paramMap: any = null): Observable<any> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: HttpService.buildURLSearchParams(paramMap).toString(),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }));
  }

  public put(url: string, body: any = {}): Observable<any> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Put,
      body: body
    }));
  }

  public delete(url: string, paramMap: any = null): Observable<any> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Delete,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public patch(url: string, body: any = {}): Observable<any> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Patch,
      body: body
    }));
  }


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
