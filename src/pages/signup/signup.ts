import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  goback() {
    this.navCtrl.pop();
    console.log('Click on button Test Console Log');
 }
 
}
