import { NgModule } from '@angular/core';
import { ChatComponent } from './chat/chat';
import {RoomProvider} from "../providers/room/room";
import {SearchProvider} from "../providers/search/search";
@NgModule({
	declarations: [ChatComponent],
  providers:[RoomProvider,SearchProvider],
	exports: [ChatComponent]
})
export class ComponentsModule {}
