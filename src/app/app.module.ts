import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {JsonpModule} from "@angular/http";
import{BrowserModule}from'@angular/platform-browser'
import { HomeProvider } from '../providers/home/home';
import { HttpServerProvider } from '../providers/http-server/http-server';
import {HttpModule} from "@angular/http";
import { RoomProvider } from '../providers/room/room';
import { SearchProvider } from '../providers/search/search';
import { ClassificationProvider } from '../providers/classification/classification';
import { LiveListProvider } from '../providers/live-list/live-list';
import { ThemeProvider } from '../providers/theme/theme';
import {AppUpdate} from "@ionic-native/app-update";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * native 插件
 * */
const NATIVE_PLUGINS = [
  SplashScreen,
  StatusBar,
  AppUpdate
];

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{   //默认设置为样式统一为iOS
      mode: 'ios',
      back:'',
      menuType: 'overlay'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
