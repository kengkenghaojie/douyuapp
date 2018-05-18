import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomChatPage } from './room-chat';
import {RoomProvider} from "../../../providers/room/room";
import {SearchProvider} from "../../../providers/search/search";

@NgModule({
  declarations: [
    RoomChatPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomChatPage),
  ],
  providers:[RoomProvider,SearchProvider],
  exports:[RoomChatPage]
})
export class RoomChatPageModule {}
