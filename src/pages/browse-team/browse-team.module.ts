import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseTeamPage } from './browse-team';

@NgModule({
  declarations: [
    BrowseTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseTeamPage),
  ],
})
export class BrowseTeamPageModule {}
