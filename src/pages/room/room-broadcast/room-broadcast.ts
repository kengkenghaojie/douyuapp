import {Component, Input, OnChanges} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchProvider} from "../../../providers/search/search";
import {RoomProvider} from "../../../providers/room/room";

/**
 * Generated class for the RoomBroadcastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-broadcast',
  templateUrl: 'room-broadcast.html',
})
export class RoomBroadcastPage implements OnChanges {
  @Input() roomData: any;
  private roomBroadcastData:any;
  constructor(
    public navCtrl: NavController,
    public roomProvider:RoomProvider,
    public searchProvider:SearchProvider,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomBroadcastPage');
  }
  ngOnChanges(changes: any){
    this.getRoomBroadcastData()
  }
  getRoomBroadcastData(){
    this.roomProvider.getRoomBroadcastData(this.roomData.room_id).subscribe(
      data =>{
        this.roomBroadcastData = data.data
        console.log(data)
      }
    )
  }

  watchThisRoom(data){
    this.navCtrl.push("RoomPage", {
      item: data
    });
  }

}
