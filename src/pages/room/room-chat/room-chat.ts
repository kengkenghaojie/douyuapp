import {Component, Input, OnChanges} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchProvider} from "../../../providers/search/search";
import {RoomProvider} from "../../../providers/room/room";

/**
 * Generated class for the RoomChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-chat',
  templateUrl: 'room-chat.html',
})
export class RoomChatPage implements OnChanges {
  @Input() roomData: any;
  private t = 0;
  private chatData:any

  constructor(
    public navCtrl: NavController,
    public roomProvider:RoomProvider,
    public searchProvider:SearchProvider,
    public navParams: NavParams
  ) {
  }
  ngOnChanges(changes: any){
    this.getChatData()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomChatPage');
  }
  getChatData(){
    this.roomProvider.getRoomChatData(this.roomData.room_id,this.t).subscribe(
      data => {
        console.log(data)
        if(data.error == 0){
          this.chatData = data.data.list;
          this.t = data.data.t;
        }else {
          //this.getChatData()
        }
      }
    )
  }

}
