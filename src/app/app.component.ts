import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

//import { StatusBar, Splashscreen } from 'ionic-native';
import { FirstRunPage,MainPage} from '../pages/pages';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ThemeProvider} from "../providers/theme/theme";
import {AppUpdate} from "@ionic-native/app-update";
import {TranslateService} from '@ngx-translate/core';
//import { home } from '../pages/home/home';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: string = MainPage;
  selectedTheme: String;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public themeProvider:ThemeProvider,
    private appUpdate: AppUpdate,
    private translate:TranslateService
  ) {
    this.themeProvider.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.initializeApp();

    // set our app's pages

    // 设置默认的语言包
    this.initTranslate();
    //translate.setDefaultLang('zh');
  }

  initTranslate() {
    // 根据浏览器来判断字符集
    this.translate.addLangs(["zh", "en"]);
    this.translate.setDefaultLang('zh');
    this.translate.setDefaultLang('en');
    //this.translate.use('en');
    /*const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      // 设置翻译
      this.translate.use('zh');
    }*/

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkAppUpdate()
    });
  }
  checkAppUpdate(){
    const UPDATE_URL = 'http://192.168.0.169:8001/update.xml';
    this.appUpdate.checkAppUpdate(UPDATE_URL);
    console.log("aaa"+UPDATE_URL);
  }


}
