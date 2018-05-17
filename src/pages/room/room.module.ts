import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomPage } from './room';
import {RoomProvider} from "../../providers/room/room";
import {SearchProvider} from "../../providers/search/search";
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    RoomPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomPage),
    DirectivesModule
  ],
  providers:[RoomProvider,SearchProvider]
})
export class RoomPageModule {}
