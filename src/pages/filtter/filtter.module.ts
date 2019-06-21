import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltterPage } from './filtter';

@NgModule({
  declarations: [
    FiltterPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltterPage),
  ],
})
export class FiltterPageModule {}
