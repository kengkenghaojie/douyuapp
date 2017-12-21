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
liveClass: string;
serviceName: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,public liveListService: LiveListService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.shortName = navParams.get('item');
    this.liveClass = navParams.get('liveClass');
    this.serviceName = navParams.get('shortName');

    console.log(this.shortName)

    if(this.liveClass == undefined){
    	this.liveClass = this.shortName.cate2Name
    }

    if(this.liveClass != "" && this.liveClass != ""){
      this.getNameData(this.serviceName);
    }else{
      this.getAllData();
      this.liveClass = "全部直播";
    }

  };


  toRoom(live) {
  	this.navCtrl.push(room, {
      item: live
    });
  };
  getNameData(serviceName) {
    this.liveListService.liveListData(serviceName).subscribe(
      data => {
        //console.log(data);
        this.liveList = data["data"];
        //localStorage.removeItem("shortName");

      },
      error => {
      }
    );
  };
  getAllData() {
    this.liveListService.liveAllListData().subscribe(
      data => {
        this.liveList = data["data"];


      },
      error => {
      }
    );
  }
}
