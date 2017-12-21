import { Component,ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { searchService } from "../searchService";

@Component({
  selector: 'all',
  templateUrl: 'all.html',
  providers: [searchService]
})
export class search {
  searchLoadData: any;
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public searchService: searchService,
    private elementRef: ElementRef,
    public toastCtrl: ToastController
    ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.getLoadSearchData()
  };
  search(queryWord,type,sort,limit,offset) {
    console.log(queryWord)
     if(queryWord == undefined || queryWord == ""){
      this.showLongToast();
      return ;
    }else{
      this.searchResult = false;
      //this.type=1;this.sort=1;this.limit=20;this.offset=0;
      this.searchService.showSearchListData(queryWord,type,sort,limit,offset).subscribe(
          data => {
            this.showSearchListData = data;
            console.log(this.showSearchListData);
            this.anchor = true;
            this.live = true;
            if(this.showSearchListData.cate.length == 0){
              this.cate = false;
            }else{
              this.cate = true;
            }
        //console.log(data)
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
  scssStyle() {
    if(navigator.userAgent.match(/(ios)/i)){
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-control').style.top = '7.19999rem';
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-header').style.top = '3.6799999rem';
        }else if(navigator.userAgent.match(/(Android)/i)){
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-control').style.top = '8.99999rem';
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-header').style.top = '5.4799999rem';
        }else{
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-control').style.top = '7.19999rem';
            this.elementRef.nativeElement.querySelector('.search-result-app .layout-header').style.top = '3.6799999rem';
        }
  }


}
