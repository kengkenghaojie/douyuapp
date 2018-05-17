import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

//import { StatusBar, Splashscreen } from 'ionic-native';
import { FirstRunPage,MainPage} from '../pages/pages';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ThemeProvider} from "../providers/theme/theme";
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
    public themeProvider:ThemeProvider
  ) {
    this.themeProvider.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.initializeApp();

    // set our app's pages
    //this.checkAppUpdate()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  checkAppUpdate(){
    const UPDATE_URL = 'http://192.168.0.169:8001/update.xml';
    //this.appUpdate.checkAppUpdate(UPDATE_URL);
  }


}
