import { Component } from '@angular/core';

import { NavController, NavParams,MenuController } from 'ionic-angular';
import { classification } from '../../classification/classification';
import { search } from '../../search/search';

@Component({
  selector: 'homeMenu',
  templateUrl: 'homeMenu.html'
})
export class homeMenu {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController) {
  }

  fenlei() {
    this.menuCtrl.close();
    this.navCtrl.push(classification);   //跳转到分类
  };
  search() {
    this.menuCtrl.close();
    this.navCtrl.push(search);
  };

}
