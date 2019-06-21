import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TournamentDetailsPage } from './tournament-details';

@NgModule({
  declarations: [
    TournamentDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TournamentDetailsPage),
  ],
})
export class TournamentDetailsPageModule {}
