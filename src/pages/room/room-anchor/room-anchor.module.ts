import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomAnchorPage } from './room-anchor';
import {RoomProvider} from "../../../providers/room/room";
import {SearchProvider} from "../../../providers/search/search";

@NgModule({
  declarations: [
    RoomAnchorPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomAnchorPage),
  ],
  providers:[RoomProvider,SearchProvider],
  exports:[RoomAnchorPage]
})
export class RoomAnchorPageModule {}
