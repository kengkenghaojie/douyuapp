import { Component, ViewChild   } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import { NavController, NavParams, AlertController, Content } from 'ionic-angular';


import { ClassificationService } from "../classification/classificationService";

@Component({
  selector: 'room',
  templateUrl: 'room.html',
  providers: [ClassificationService]
})
export class room {
  roomData: any;
  hls_url: string;
  cate2InfoList: any[];
  limitNum:number = 8;
  share:boolean = false;
  bottomTips:boolean = false;
   @ViewChild(Content) content: Content;

  constructor(
    public navParams: NavParams,
    private http: Http,
    public classificationService:ClassificationService,
    public alertCtrl: AlertController,

    ) {
    // If we navigated to this page, we will have an item available as a nav param
this.roomData = navParams.get('item');
console.log(this.roomData)
this.getRoomData().subscribe(
      data => {
        //console.log(data);
        this.hls_url = data["data"].hls_url;
      },
      error => {
      }
    );
this.getRoomAllData().subscribe(
      data => {
        //console.log(data);
        this.roomData = data["data"];
      },
      error => {
      }
    );
this.getRoomAllLive().subscribe(
      data => {
        //console.log(data);
        this.cate2InfoList = data["data"];
this.cate2InfoList = this.cate2InfoList.slice(0,this.limitNum);
      },
      error => {
      }
    );
  }

  getRoomData(): Observable<any[]> {
    return this.http.get("https://m.douyu.com/html5/live?roomId="+ this.roomData.room_id)
      .map(res => <any[]>res.json())
  }
  getRoomAllData(): Observable<any[]> {
    return this.http.get("http://open.douyucdn.cn/api/RoomApi/room/"+ this.roomData.room_id)
      .map(res => <any[]>res.json())
  }
  //http://open.douyucdn.cn/api/RoomApi/live 
  getRoomAllLive (): Observable<any[]> {
    return this.http.get("http://open.douyucdn.cn/api/RoomApi/live")
      .map(res => <any[]>res.json())
  };
  doInfinite(infiniteScroll) {
    console.log(this.limitNum)
    if(this.limitNum > 20){
      this.bottomTips = true;
    }else{
      setTimeout(() => {
      this.getRoomAllLive().subscribe(
      data => {
        let lodadata = data["data"];
        lodadata = lodadata.slice(this.limitNum,this.limitNum+4);
        this.limitNum = this.limitNum+4;
        
          for(let i=0;i<4;i++){
            this.cate2InfoList.push(lodadata[i]);
          }
        
        

      },
      error => {
      }
    );
      infiniteScroll.complete();
    }, 500);
    }
    
  };
  toRoom(live){
    this.roomData = live;
    
    this.getRoomAllData().subscribe(
      data => {
        //console.log(data);
        this.roomData = data["data"];  
      },
      error => {
      }
    );
    this.getRoomData().subscribe(
      data => {
        //console.log(data);
        this.hls_url = data["data"].hls_url;
      },
      error => {
      }
    );  
this.content.scrollToTop();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: '该功能斗鱼没有提供接口！',
      buttons: ['知道了']
    });
    alert.present();
  }
  shareCtrl(i) {
    if(i == 1){
      this.share = true  
    }else{
      this.share = false  
    }
    
  }
}
