import { Component, Input, OnChanges } from '@angular/core';
import {RoomProvider} from "../../providers/room/room";
import {SearchProvider} from "../../providers/search/search";

/**
 * Generated class for the ChatComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat',
  templateUrl: 'chat.html'
})
export class ChatComponent implements OnChanges {

  @Input() roomData: any;
  private t = 0;
  private chatData:any

  constructor(
    public roomProvider:RoomProvider,
    public searchProvider:SearchProvider
  ) {
  }
  ngOnChanges(changes: any){
    this.getChatData()
  }

  getChatData(){
    this.roomProvider.getRoomChatData(this.roomData.room_id,this.t).subscribe(
      data => {
        if(data.error == 0){
          this.chatData = data.list;
          this.t = data.t;
        }
      }
    )
  }

}
