import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTeamRatingPage } from './add-team-rating';

@NgModule({
  declarations: [
    AddTeamRatingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTeamRatingPage),
  ],
})
export class AddTeamRatingPageModule {}
