import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomPage } from './room';
import {RoomProvider} from "../../providers/room/room";
import {SearchProvider} from "../../providers/search/search";
import {DirectivesModule} from "../../directives/directives.module";
import {ComponentsModule} from "../../components/components.module";
import {RoomChatPageModule} from "./room-chat/room-chat.module";
import {RoomAnchorPageModule} from "./room-anchor/room-anchor.module";
import {RoomBroadcastPageModule} from "./room-broadcast/room-broadcast.module";

@NgModule({
  declarations: [
    RoomPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomPage),
    DirectivesModule,
    ComponentsModule,
    RoomChatPageModule,
    RoomAnchorPageModule,
    RoomBroadcastPageModule
  ],
  providers:[RoomProvider,SearchProvider]
})
export class RoomPageModule {}
