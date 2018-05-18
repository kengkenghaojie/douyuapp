import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomBroadcastPage } from './room-broadcast';
import {SearchProvider} from "../../../providers/search/search";
import {RoomProvider} from "../../../providers/room/room";

@NgModule({
  declarations: [
    RoomBroadcastPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomBroadcastPage),
  ],
  exports:[RoomBroadcastPage],
  providers:[RoomProvider,SearchProvider]
})
export class RoomBroadcastPageModule {}
