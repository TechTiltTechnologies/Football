import { HomePage } from './../home/home';
import { SidePage } from './../side/side';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';



@IonicPage()
@Component({
  selector: 'page-dummyloader',
  templateUrl: 'dummyloader.html',
})
export class DummyloaderPage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public navParams: NavParams) {

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      //this.navCtrl.push(SidePage);
      this.navCtrl.setRoot(SidePage)
    }, 1000);
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DummyloaderPage');
  }

}