import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GtabsPage } from './gtabs';

@NgModule({
  declarations: [
    GtabsPage,
  ],
  imports: [
    IonicPageModule.forChild(GtabsPage),
  ],
})
export class GtabsPageModule {}
