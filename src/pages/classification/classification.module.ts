import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassificationPage } from './classification';
import {ClassificationProvider} from "../../providers/classification/classification";

@NgModule({
  declarations: [
    ClassificationPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassificationPage),
  ],
  providers:[ClassificationProvider]
})
export class ClassificationPageModule {}
