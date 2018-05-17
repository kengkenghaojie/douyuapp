import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeProvider} from "../../providers/home/home";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
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
    public navParams: NavParams,
    public homeProvider:HomeProvider
  ) {
  }

  ionViewDidLoad() {
    this.getHomeData()
   /* this.homeProvider.test().subscribe(
      data => {
        console.log(data);
      },
      error => {
      }
    );*/
  }
  getHomeData(ii?){
    this.homeProvider.getCommonData("index/getHomeData").subscribe(
      data => {
        if(ii){
          this.i = ii;
        }
        console.log(data);
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
    this.getHomeData(ii);
  };

  toRoom(hot) {
    this.navCtrl.push("RoomPage", {
      item: hot
    });
  };
  toLiveList(event, cate2Info) {
    this.navCtrl.push("LiveListPage", {
      item: "",
      liveClass: ""
    });
  };

  doRefresh(refresher) {    //下拉刷新
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.getHomeData()
      refresher.complete();
    }, 2000);
  }

}
