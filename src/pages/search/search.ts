import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import {SearchProvider} from "../../providers/search/search";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchLoadData: any;
  classMap: any  = ['icon-v2-num1', 'icon-v2-num2', 'icon-v2-num3', 'icon-v2-num4', 'icon-v2-num5', 'icon-v2-num6', 'icon-v2-num7', 'icon-v2-num8', 'icon-v2-num9', 'icon-v2-num10']
  searchResult: boolean = true;
  queryWord:string;
  type:number=1;
  sort:number=1;
  limit:number=20;
  offset:number=0;
  showSearchListData: any;
  cate: boolean = false;
  anchor: boolean = false;
  live: boolean = false;

  all:boolean = true;
  liveRooms:boolean = false;
  liveAnchors:boolean = false;
  liveRoomsData: any;
  cur:number=1;
  sortContent:string = '相关度';
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public searchProvider:SearchProvider
  ) {
    this.getLoadSearchData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  getLoadSearchData() {
    this.searchProvider.searchListData().subscribe(
      data => {
        this.searchLoadData = data;
        console.log(this.searchLoadData)
      },
      error => {
      }
    );
  };

  search(queryWord,type,sort,limit,offset,i) {    //queryWord：搜索内容

    if(queryWord == undefined || queryWord == ""){
      this.showLongToast();
      return ;
    }else{
      this.searchResult = false;
      if(i == undefined){
        this.cur = 1;
      }else if(i == 4 || i == 5){
        this.cur = this.cur;
      }else{
        this.cur = i;
        this.content.scrollToTop();
      };

      if(this.sortContent == "相关度"){
        sort = 1;
        this.sort = 1;
      }else if(this.sortContent == "人气值"){
        sort = 2;
        this.sort = 2;
      }else if(this.sortContent == "关注量"){
        sort = 3;
        this.sort = 3;
      }

      this.type = type;
      this.offset = offset;

      this.searchProvider.showSearchListData(queryWord,type,sort,limit,offset).subscribe(
        data => {
          //抽取公共方法
          this.valueI(i,data);
        },
        error => {
        }
      );
    }
  };

  //判断i的值
  valueI(i,data) {
    //首先判定是i什么类型,切换下面的tab
    if(i == 1 || i == undefined) {
      this.all = true;
      this.liveRooms = false;
      this.liveAnchors = false;
      this.showSearchListData = data;
      //console.log(this.showSearchListData);
      this.anchor = true;
      this.live = true;
      if(this.showSearchListData.cate.length == 0){
        this.cate = false;
      }else{
        this.cate = true;
      }
    }else if(i == 2){
      this.all = false;
      this.liveRooms = true;
      this.liveAnchors = false;
      this.liveRoomsData = data;
      //console.log(this.liveRoomsData);
    }else if(i == 3){
      this.all = false;
      this.liveRooms = false;
      this.liveAnchors = true;
      this.liveRoomsData = data;
      //console.log(this.liveRoomsData);
    }else if(i == 4){
      for(let i=0;i<20;i++){
        this.liveRoomsData.live.push(data.live[i]);
      }
    }
    else if(i == 5){
      for(let i=0;i<20;i++){
        this.liveRoomsData.anchor.push(data.anchor[i]);
      }
    }
  };

  searchHot(queryWord,type,sort,limit,offset,i) {

    this.queryWord = queryWord;
    this.searchResult = false;
    this.cur = 1;

    this.searchProvider.showSearchListData(queryWord,type,sort,limit,offset).subscribe(
      data => {
        this.valueI(i,data);
      },
      error => {
      }
    );

  };
  toRoom(live) {
    this.navCtrl.push("RoomPage", {
      item: live
    });
  };

  showLongToast() {
    let toast = this.toastCtrl.create({
      message: '请输入关键字查询',
      duration: 2000,
    });
    toast.present();
  };
  toLiveList(event, cate2Info) {
    //window.localStorage.setItem("shortName",cate2Info.shortName);
    console.log(cate2Info)
    this.navCtrl.push("LiveListPage", {
      item: cate2Info,
      liveClass: cate2Info.cate2Name,
      shortName: cate2Info.shortName,
      cate_id : cate2Info.cate2Id
    });
  }

  imgError(liveItem){     //图片报错的时候自动切换为默认的图片
    liveItem.roomSrc = "./assets/images/list-item-def-thumb.gif";
  };
  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: this.sortContent,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '相关度',
          icon:  'happy',
          handler: () => {
            this.sortContent = '相关度';
            this.search(this.queryWord,1,1,20,0,1);
          }
        },
        {
          text: '人气值',
          icon:  "people",
          handler: () => {
            this.sortContent = '人气值';
            this.search(this.queryWord,1,2,20,0,1);
          }
        },
        {
          text: '关注量',
          icon:  "heart",
          handler: () => {
            this.sortContent = '关注量';
            this.search(this.queryWord,1,3,20,0,1);
          }
        }
      ]
    });
    actionSheet.present();
  };

  doInfinite(infiniteScroll,i) {
    this.offset = this.offset +20;
    let liveRoomsDataScroll = this.liveRoomsData;
    setTimeout(() => {

      this.search(this.queryWord,this.type,this.sort,20,this.offset,i)


      infiniteScroll.complete();
    }, 500);
  };

}
