import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, ActionSheetController, Content } from 'ionic-angular';
import { room } from '../room/room';
import { liveList } from '../liveList/liveList';
import { searchService } from "./searchService";

@Component({
  selector: 'search',
  templateUrl: 'search.html',
  providers: [searchService]
})
export class search {
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
    public searchService: searchService,
    private elementRef: ElementRef,
    public toastCtrl: ToastController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController
    ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.getLoadSearchData()
  };
  search(queryWord,type,sort,limit,offset,i) {
    
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
      
      this.searchService.showSearchListData(queryWord,type,sort,limit,offset).subscribe(
          data => {
            //抽取公共方法
            this.valueI(i,data);
        },
      error => {
      }
    );
    }

    //下面的样式，上面是搜索逻辑  
    if(!this.searchResult){
        this.scssStyle();
     }
  };
  doInfinite(infiniteScroll,i) {
    this.offset = this.offset +20;
    let liveRoomsDataScroll = this.liveRoomsData;
    setTimeout(() => {
      
      this.search(this.queryWord,this.type,this.sort,20,this.offset,i)


      infiniteScroll.complete();
    }, 500);
  };
    searchHot(queryWord,type,sort,limit,offset,i) {
    
      this.queryWord = queryWord;
      this.searchResult = false;
      this.cur = 1;

      this.searchService.showSearchListData(queryWord,type,sort,limit,offset).subscribe(
          data => {
            this.valueI(i,data);
        },
      error => {
      }
    );
    
    //下面的样式，上面是搜索逻辑
    if(!this.searchResult){
        this.scssStyle();
     } 
    
  };
  getLoadSearchData() {
    this.searchService.searchListData().subscribe(
      data => {
        this.searchLoadData = data;
        console.log(this.searchLoadData)
      },
      error => {
      }
    );
  };
  showLongToast() {
    let toast = this.toastCtrl.create({
      message: '请输入关键字查询',
      duration: 2000,
    });
    toast.present();
  };
  toRoom(live) {
    this.navCtrl.push(room, {
      item: live
    });
  };
  toLiveList(event, cate2Info) {
    //window.localStorage.setItem("shortName",cate2Info.shortName);
    this.navCtrl.push(liveList, {
      item: cate2Info,
      liveClass: cate2Info.cate2Name,
      shortName: cate2Info.shortName
    });
  }
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
  scssStyle() {
    if(navigator.userAgent.match(/(ios)/i)){
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-control').style.top = '7.19999rem';
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-header').style.top = '3.6799999rem';
        }else if(navigator.userAgent.match(/(Android)/i)){
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-control').style.top = '8.94999rem';
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-header').style.top = '5.4299999rem';
        }else{
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-control').style.top = '7.19999rem';
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-header').style.top = '3.6799999rem';
        }
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


}
