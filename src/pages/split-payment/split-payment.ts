import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';


@IonicPage()
@Component({
  selector: 'page-split-payment',
  templateUrl: 'split-payment.html',
})
export class SplitPaymentPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplitPaymentPage');
  }
  stpSelect() {
    console.log('STP selected');
  }
  booknow(){
    //this.navCtrl.push(BooknowPage);
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
}
