import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { HomePage } from './home';
import {HomeProvider} from "../../providers/home/home";
import {HomeMenuPageModule} from "./home-menu/home-menu.module";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild(),
    HomeMenuPageModule,
    PipesModule
  ],
  exports: [
    HomePage,
  ],
  providers:[HomeProvider]
})
export class HomePageModule {}
