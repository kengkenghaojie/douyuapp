import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
import {RoomProvider} from "../../providers/room/room";
import {SearchProvider} from "../../providers/search/search";

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  roomData: any;
  hls_url: string;
  cate2InfoList: any[];
  limitNum:number = 8;
  share:boolean = false;
  bottomTips:boolean = false;
  queryWord:string = "";
  type:number=2;
  sort:number=1;
  limit:number=20;
  offset:number=0;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public roomProvider:RoomProvider,
    public searchProvider:SearchProvider
  ) {
    console.log(navParams.get("item"));
    this.roomData = navParams.get('item');
    this.queryWord = this.roomData.tag_name;
  }

  ionViewDidLoad() {
    this.getRoomData();
    this.getSameListData();
  }

  getRoomData(){
    this.roomProvider.getRoomData(this.roomData.room_id).subscribe(
      data =>{
        console.log(data)
        this.hls_url = data["data"].hls_url;
      }
    )
  }
  getSameListData(){
    this.searchProvider.showSearchListData(this.queryWord,this.type,this.sort,this.limit,this.offset).subscribe(
      data =>{
        console.log(data.live)
        if(this.cate2InfoList == undefined){
          this.cate2InfoList = data.live;
        }else {
          console.log(data["live"].length)
          //this.cate2InfoList = this.cate2InfoList + data["live"];
          //this.cate2InfoList.push(data["live"])
          data["live"].forEach((item,index)=>{
            this.cate2InfoList.push(item)
          })
        }
      }
    )
  }
  toRoom(live){
    this.roomData = live;
    console.log(this.roomData)
    this.queryWord = this.roomData.cateName;

    this.getRoomData();
    this.getSameListData();
    this.content.scrollToTop();
  }


  doInfinite(infiniteScroll) {
    this.offset = this.offset +20;
    setTimeout(() => {

      this.getSameListData()


      infiniteScroll.complete();
    }, 500);
  };

}
