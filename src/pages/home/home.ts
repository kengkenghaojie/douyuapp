import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { NavController } from 'ionic-angular';

//import { HomeService } from "./homeService";
import { getDataListService } from '../../common/getDataListService';
import { classification } from '../classification/classification';

import { room } from '../room/room';
import { liveList } from '../liveList/liveList';
import { search } from '../search/search';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'home.html',
  //providers: [HomeService]
})
export class home {
  indexBanner: any[];
  hotsList: any[];
  liveList: any[];
  yzList: any[];
  liveCount: number;

  mixList: any[];
  i: number = 1 //Math.round(Math.random()*4+1)-1 ;
  temporary: number;

  constructor(
  	public navCtrl: NavController,
  	public homeService:getDataListService
  ) {
  	this.homeService.getCommonData("index/getHomeData").subscribe(
      data => {
        console.log(data);
        //this.todos = data['rows'];
        this.indexBanner = data['banner'];
        this.hotsList = data["hotList"][this.i].data;
        this.liveList = data['liveList'];
        this.yzList = data['yzList'];
        this.liveCount = data['liveCount'];
        this.mixList = data['mixList']
      },
      error => {
      }
    );
  }

fenlei() {
    this.navCtrl.push(classification);   //跳转到分类
  };
  search() {
    this.navCtrl.push(search);
  };
  toRoom(hot) {
    this.navCtrl.push(room, {
      item: hot
    });
  };
  change() {      //随机改变最热
    this.temporary = this.i
    this.i = Math.round(Math.random()*4+1)-1;
    if(this.i == 4){
      this.i = this.i-1;
    }
    if(this.temporary ==this.i){
      this.i = Math.round(Math.random()*4+1)-1;
      this.changeI(this.i);
    }else{
       this.changeI(this.i);
    }
  };
   changeI(ii){
     console.log(ii)
     this.homeService.getCommonData("index/getHomeData").subscribe(
      data => {
        this.hotsList = data["hotList"][ii].data;
      },
      error => {
      }
    );
   };
   toLiveList(event, cate2Info) {
    this.navCtrl.push(liveList, {
      item: "",
      liveClass: ""
    });
  };
  doRefresh(refresher) {    //下拉刷新
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.homeService.getCommonData("index/getHomeData").subscribe(
        data => {
          console.log(data);
          //this.todos = data['rows'];
          this.indexBanner = data['banner'];
          this.hotsList = data["hotList"][this.i].data;
          this.liveList = data['liveList'];
          this.yzList = data['yzList'];
          this.liveCount = data['liveCount'];
          this.mixList = data['mixList']
        },
        error => {
        }
      );
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
