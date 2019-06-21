import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyTeamPage } from '../my-team/my-team';
import { TournamentListPage } from '../tournament-list/tournament-list';
import { JoinFriendlyMatchPage } from '../join-friendly-match/join-friendly-match';
import { NotificationPage } from '../notification/notification';

@IonicPage()
@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayPage');
  }
  tournament(){
    this.navCtrl.push(TournamentListPage)
  }
  friendly(){
    this.navCtrl.push(JoinFriendlyMatchPage)
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
}
