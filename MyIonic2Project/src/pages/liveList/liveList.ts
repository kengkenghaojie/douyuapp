import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { LiveListService } from "./liveListService";
import { room } from '../room/room';

@Component({
  selector: 'liveList',
  templateUrl: 'liveList.html',
  providers: [LiveListService]
})

export class liveList {
shortName: any;
liveList: any[];
liveClass: string

  constructor(public navCtrl: NavController, public navParams: NavParams,public liveListService: LiveListService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.shortName = navParams.get('item');
    this.liveClass = navParams.get('liveClass');
    if(this.liveClass == undefined){
    	this.liveClass = this.shortName.cate2Name
    }
    console.log(this.liveClass)
    this.liveListService.liveListData().subscribe(
      data => {
        //console.log(data);
        this.liveList = data["data"];
        localStorage.removeItem("shortName");

      },
      error => {
      }
    );
  };
  toRoom(live) {
  	this.navCtrl.push(room, {
      item: live
    });
  }
}
