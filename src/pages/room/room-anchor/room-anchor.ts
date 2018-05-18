import {Component, Input, OnChanges} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RoomProvider} from "../../../providers/room/room";
import {SearchProvider} from "../../../providers/search/search";

/**
 * Generated class for the RoomAnchorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-anchor',
  templateUrl: 'room-anchor.html',
})
export class RoomAnchorPage implements OnChanges {
  @Input() roomData: any;
  private roomInfo:any;
  private cate2InfoList:any;

  constructor(
    public navCtrl: NavController,
    public roomProvider:RoomProvider,
    public searchProvider:SearchProvider,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomAnchorPage');
  }
  ngOnChanges(changes: any){
    this.getRoomAnchorData()
  }
  getRoomAnchorData(){
    this.roomProvider.getRoomAnchorData(this.roomData.room_id).subscribe(
      data =>{
        console.log(data)
        this.roomInfo = data.data.roomInfo;
        this.cate2InfoList = data.data.videoList;
      }
    )
  }

}
