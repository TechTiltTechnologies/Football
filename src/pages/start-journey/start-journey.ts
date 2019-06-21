import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-start-journey',
  templateUrl: 'start-journey.html',
})
export class StartJourneyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartJourneyPage');
  }
  login(){
    this.navCtrl.push(LoginPage)
  }
}
