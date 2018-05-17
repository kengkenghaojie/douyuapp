import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import {ThemeProvider} from "../../../providers/theme/theme";

/**
 * Generated class for the HomeMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-menu',
  templateUrl: 'home-menu.html',
})
export class HomeMenuPage {
  selectedTheme: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,public themeProvider:ThemeProvider) {
    this.themeProvider.getActiveTheme().subscribe(val => this.selectedTheme = val);
    console.log('this.selectedTheme: ' + this.selectedTheme);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeMenuPage');
  }
  fenlei() {
    this.menuCtrl.close().then(()=>{
      this.navCtrl.push("ClassificationPage");   //跳转到分类
    });

  };
  search() {
    this.menuCtrl.close();
    this.navCtrl.push("SearchPage");
  };

  changeTheme() {
    console.log('changeTheme: ' + this.selectedTheme);
    if (this.selectedTheme === 'dark-theme') {
      // 改变
      this.themeProvider.setActiveTheme('light-theme');
      console.log('curTheme: ' + 'light-theme');
    } else {
      this.themeProvider.setActiveTheme('dark-theme');
      console.log('curTheme: ' + 'dark-theme');
    }
  }
}
