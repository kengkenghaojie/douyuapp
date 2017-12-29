import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
//import { ClassificationService } from "./classificationService";
import { liveList } from '../liveList/liveList';
import { getDataListService } from '../../common/getDataListService';

@Component({
  selector: 'classification',
  templateUrl: 'classification.html',
  //providers: [ClassificationService]
})
export class classification {
  cate1InfoList: any[];
  cate2InfoList: any[];
  liveClass: string;

  constructor(public navCtrl: NavController,private elementRef: ElementRef,public classificationService:getDataListService) {
    // If we navigated to this page, we will have an item available as a nav param
    	this.getAllData();
  }
  ngAfterViewInit() {   //元素初始化执行
      if(navigator.userAgent.match(/(ios)/i)){
      	this.elementRef.nativeElement.querySelector('.nav-header').style.top = '3.66666666rem';
        console.log(navigator.userAgent.match(/(ios)/i));
      }else if(navigator.userAgent.match(/(Android)/i)){
      	this.elementRef.nativeElement.querySelector('.nav-header').style.top = '5.56666667rem';
        console.log(navigator.userAgent.match(/(Android)/i));
      }
  };
  getAllData() {
  	this.classificationService.getCommonData("category").subscribe(
      data => {
        console.log(data);
        this.cate1InfoList = data['cate1Info'];
        this.cate2InfoList = data['cate2Info'];
      },
      error => {
      }
    );
  };
  filterLive(cate1Info:any,idx) {      //点击头部过滤下面数据
  	let navheaderItem = this.elementRef.nativeElement.querySelectorAll('.navheaderItem');    //想不出用数据的方式操作这个class，只能通过原生的JS
  	for(let i:number=0;i<navheaderItem.length;i++){
  		navheaderItem[i].classList.remove("cur")
  	}

  	if(cate1Info){
  		navheaderItem[idx+1].classList.add("cur");    //添加class
  		this.liveClass = cate1Info.cate1Name;
  		this.classificationService.getCommonData("category").subscribe(
      data => {
        this.cate2InfoList = data['cate2Info'];
       /* this.cate2InfoList.forEach( (item:any,index:number) => {
          if(cate1Info.cate1Id !== item.cate1Id){
          	this.cate2InfoList.splice(index,1);
          }
  		})*/

       for(let i =0;i<this.cate2InfoList.length+6;i++){					//这里有毒！要这样过滤的！求好的方法

       		this.cate2InfoList.forEach( (item:any,index:number) => {
          if(cate1Info.cate1Id !== item.cate1Id){
          	this.cate2InfoList.splice(index,1);
          }
  		})

       }
       //console.log(this.cate2InfoList)
      }
    );
  	}else{
  		navheaderItem[0].classList.add("cur");    //添加class
  		this.classificationService.getCommonData("category").subscribe(
      data => {
        this.cate2InfoList = data['cate2Info'];
        //console.log(this.cate2InfoList)
      }
    );
  	}
  };
  toLiveList(event, cate2Info) {
  	this.navCtrl.push(liveList, {
      item: cate2Info,
      liveClass: this.liveClass,
      shortName: cate2Info.shortName,
      cate_id : cate2Info.cate2Id
    });
  }
}

