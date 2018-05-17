import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {JsonpModule} from "@angular/http";
//import { home } from '../pages/home/home';
/*import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { classification } from '../pages/classification/classification';
import { liveList } from '../pages/liveList/liveList';
import { room } from '../pages/room/room';
import { search } from '../pages/search/search';*/

//import { getDataListService } from '../common/getDataListService';

//import { homeModule }     from '../pages/home/home.module';

import{BrowserModule}from'@angular/platform-browser'
import { HomeProvider } from '../providers/home/home';
import { HttpServerProvider } from '../providers/http-server/http-server';
import {HttpModule} from "@angular/http";
import { RoomProvider } from '../providers/room/room';
import { SearchProvider } from '../providers/search/search';
import { ClassificationProvider } from '../providers/classification/classification';
import { LiveListProvider } from '../providers/live-list/live-list';
import { ThemeProvider } from '../providers/theme/theme';

/**
 * native 插件
 * */
const NATIVE_PLUGINS = [
  SplashScreen,
  StatusBar,
];

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{   //默认设置为样式统一为iOS
      mode: 'ios',
      back:'',
      menuType: 'overlay'
    }),
    HttpClientModule,
    //HttpModule,
    JsonpModule ,   //注入JSonpModule模块,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
   /* getDataListService,
    HttpService,*/
    ...NATIVE_PLUGINS,
    HomeProvider,
    HttpServerProvider,
    { provide: HTTP_INTERCEPTORS, useClass: HttpServerProvider, multi: true},
    RoomProvider,
    SearchProvider,
    ClassificationProvider,
    LiveListProvider,
    ThemeProvider
  ]
})
export class AppModule {}
