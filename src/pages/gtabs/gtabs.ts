import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  selector: 'page-gtabs',
  templateUrl: 'gtabs.html',
})
export class GtabsPage {
  tab1Root = HomePage;
  tab2Root = 'PlayPage';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GtabsPage');
  }

}
