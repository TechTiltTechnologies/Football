import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SidePage } from './side';

@NgModule({
  declarations: [
    SidePage,
  ],
  imports: [
    IonicPageModule.forChild(SidePage),
  ],
})
export class SidePageModule {}
