import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TournamentListPage } from './tournament-list';

@NgModule({
  declarations: [
    TournamentListPage,
  ],
  imports: [
    IonicPageModule.forChild(TournamentListPage),
  ],
})
export class TournamentListPageModule {}
