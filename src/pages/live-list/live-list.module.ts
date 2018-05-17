import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveListPage } from './live-list';
import {LiveListProvider} from "../../providers/live-list/live-list";

@NgModule({
  declarations: [
    LiveListPage,
  ],
  imports: [
    IonicPageModule.forChild(LiveListPage),
  ],
  providers:[LiveListProvider]
})
export class LiveListPageModule {}
