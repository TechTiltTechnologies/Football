import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { NotificationPage } from '../notification/notification';
@IonicPage()
@Component({
  selector: 'page-full-payment',
  templateUrl: 'full-payment.html',
})
export class FullPaymentPage {
  cardinfo:any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
   }
  constructor(public navCtrl: NavController,private stripe: Stripe, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FullPaymentPage');
  }
  clikc(){
    this.stripe.setPublishableKey('pk_test_mRq8smyyCXCIKNAHchNzQOev');

// let card = {
//   number: '',
//   expMonth: '',
//   expYear: '',
//   cvc: ''
// };

this.stripe.createCardToken(this.cardinfo)
   .then(token =>{
    console.log(token.id)
   })
   .catch(error => console.error(error));
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
}
