import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LiveListProvider} from "../../providers/live-list/live-list";

/**
 * Generated class for the LiveListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-live-list',
  templateUrl: 'live-list.html',
})
export class LiveListPage {
  shortName: any;
  liveList: any[];
  liveClass: string;
  serviceName: string;
  cateId:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private liveListProvider:LiveListProvider) {
    this.shortName = navParams.get('item');
    this.liveClass = navParams.get('liveClass');
    this.serviceName = navParams.get('shortName');
    this.cateId = navParams.get('cate_id');

    if(this.liveClass == undefined){
      this.liveClass = this.shortName.cate2Name
    }

    if(this.liveClass != "" && this.liveClass != ""){
      this.getNameData(this.cateId);
    }else{
      this.getAllData();
      this.liveClass = "全部直播";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiveListPage');
  }

  getNameData(serviceName) {
    this.liveListProvider.liveListData(serviceName).subscribe(
      data => {

        this.liveList = data.data;
        //localStorage.removeItem("shortName");
        console.log(this.liveList);
      },
      error => {
      }
    );
  };
  getAllData() {
    this.liveListProvider.liveAllListData().subscribe(
      data => {
        this.liveList = data.data;
        console.log(this.liveList);

      },
      error => {
      }
    );
  }
  toRoom(live) {
    this.navCtrl.push("RoomPage", {
      item: live
    });
  };

}
