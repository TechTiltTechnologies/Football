import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinFriendlyMatchPage } from './join-friendly-match';

@NgModule({
  declarations: [
    JoinFriendlyMatchPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinFriendlyMatchPage),
  ],
})
export class JoinFriendlyMatchPageModule {}
