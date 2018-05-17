import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ClassificationProvider} from "../../providers/classification/classification";

/**
 * Generated class for the ClassificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-classification',
  templateUrl: 'classification.html',
})
export class ClassificationPage {

  cate1InfoList: any[];
  cate2InfoList: any[];
  allClassData: any[];  //暂时保存的东西
  liveClass: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private elementRef: ElementRef,
    public classificationProvider:ClassificationProvider
  ) {
  }

  ionViewDidLoad() {
    this.getAllData();
  }
  getAllData() {
    this.classificationProvider.getClassificationData().subscribe(
      data => {
        this.cate1InfoList = data.cate1Info;
        this.cate2InfoList = data.cate2Info;
        this.allClassData = data.cate2Info;
        this.cate1InfoList.unshift({
          cate1Id: "-1",
          cate1Name: "全部",
          shortName: "all"
        });
        this.cate1InfoList.forEach((item:any)=>{
          if(item.cate1Id == '-1'){
            item.checked = true;
          }else {
            item.checked = false;
          }
        })
      },
      error => {
      }
    );
  };
  filterLive(cate1Info:any,idx) {      //点击头部过滤下面数据
    this.cate1InfoList.forEach((item:any)=>{
      item.checked = false;
    })
    cate1Info.checked = true;
    if(cate1Info.cate1Id != '-1'){
      this.cate2InfoList = [];
      this.allClassData.forEach( (item:any,index:number) => {
        if(cate1Info.cate1Id == item.cate1Id){
          this.cate2InfoList.push(item);
        }
      })

    }else {
      this.cate2InfoList = this.allClassData;
    }
  };
  toLiveList(event, cate2Info) {
    this.navCtrl.push('LiveListPage', {
      item: cate2Info,
      liveClass: this.liveClass,
      shortName: cate2Info.shortName,
      cate_id : cate2Info.cate2Id
    });
  }



}
