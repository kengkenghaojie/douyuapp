import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { NavController } from 'ionic-angular';

import { HomeService } from "./homeService";
import { classification } from '../classification/classification';

import { room } from '../room/room';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class home {
  indexBanner: any[];
  hotsList: any[];
  liveList: any[];
  yzList: any[];

  mixList: any[];
  i: number = /*(Math.random()*4, 10+1)-1; */Math.round(Math.random()*4+1)-1;
  temporary: number;

  constructor(
  	public navCtrl: NavController,
  	public homeService:HomeService
  ) {
  	this.homeService.getNews().subscribe(
      data => {
        console.log(data);
        //this.todos = data['rows'];
        this.indexBanner = data['banner'];
        this.hotsList = data["hotList"][this.i].data;
        this.liveList = data['liveList'];
        this.yzList = data['yzList'];

        this.mixList = data['mixList']
      },
      error => {
      }
    );
  }

fenlei() {
    this.navCtrl.push(classification);   //跳转到分类
  };
  toRoom(hot) {
    this.navCtrl.push(room, {
      item: hot
    });
  };
  change() {
    //console.log(this.i)
    this.temporary = this.i
    this.i = Math.round(Math.random()*4+1)-1;
    if(this.temporary ==this.i ){
      this.i = Math.round(Math.random()*4+1)-1;
      this.changeI(this.i);
    }else{
       this.changeI(this.i);
    }
    
  };
   changeI(ii){
     this.homeService.getNews().subscribe(
      data => {
        this.hotsList = data["hotList"][ii].data;
      },
      error => {
      }
    );
   }
}
