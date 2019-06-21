import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseTeammatesPage } from './browse-teammates';

@NgModule({
  declarations: [
    BrowseTeammatesPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseTeammatesPage),
  ],
})
export class BrowseTeammatesPageModule {}
