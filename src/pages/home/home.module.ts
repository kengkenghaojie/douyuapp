import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';


import { home } from './home';
import { homeMenu } from './homeMenu/homeMenu';



@NgModule({
  imports: [
    IonicModule,
  ],
  declarations: [
    home,homeMenu
  ],
  entryComponents:[
    home,homeMenu
  ]
})
export class homeModule {}
