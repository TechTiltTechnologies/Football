import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SidePage } from "../side/side";
import { RegisterPage } from "../register/register";
import { HomePage } from "../home/home";
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';


//import { BookingHistoryPage } from "../booking-history/booking-history";


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = 'BookingHistoryPage';
  tab4Root = 'TeamPage';
  tab5Root = 'PlayPage';

  cmdetails:any;
  clanguage:any;
  

  constructor(public navCtrl: NavController,public platform: Platform,public storage:Storage, public navParams: NavParams,public translate: TranslateService) {
 
   
     // this.translate.use('ar');

     storage.get('chooselanguage').then((val) => {
      this.clanguage = val;
    console.log(this.clanguage)

    if(this.clanguage == 'en')
    {
      this.platform.setDir('ltr', true);
      this.translate.use('en');
    }
    else if(this.clanguage == 'ar'){

      this.platform.setDir('rtl', true);
      this.translate.use('ar');

    }
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  

}
