import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//import { home } from '../pages/home/home';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { classification } from '../pages/classification/classification';
import { liveList } from '../pages/liveList/liveList';
import { room } from '../pages/room/room';
import { search } from '../pages/search/search';

import { getDataListService } from '../common/getDataListService';

import { homeModule }     from '../pages/home/home.module';

@NgModule({
  declarations: [
    MyApp,
    //home,
    ItemDetailsPage,
    ListPage,
    classification,
    liveList,
    room,
    search
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    homeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //home,
    ItemDetailsPage,
    ListPage,
    classification,
    liveList,
    room,
    search
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},getDataListService]
})
export class AppModule {}
