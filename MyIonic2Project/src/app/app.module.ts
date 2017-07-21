import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { home } from '../pages/home/home';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { classification } from '../pages/classification/classification';
import { liveList } from '../pages/liveList/liveList';
import { room } from '../pages/room/room';

@NgModule({
  declarations: [
    MyApp,
    home,
    ItemDetailsPage,
    ListPage,
    classification,
    liveList,
    room
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    home,
    ItemDetailsPage,
    ListPage,
    classification,
    liveList,
    room
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
