import { Component,Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { BookingHistoryPage } from '../booking-history/booking-history';
import { EditProfilePage } from '../edit-profile/edit-profile';
//import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Storage } from '@ionic/storage';
import { NgProgress } from 'ngx-progressbar';
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  @Input('propertyName') myValue;
  @Output() someEvent = new EventEmitter();
  value: number;

  message:string = 'Football';
  file:string = null;
  link:string = 'https://www.facebook.com/';
  subject:string = 'Dowload and get 51';


  profilevalue:any;
  fbData = null;

  fbdetails:any;
  cmdetails:any;
  gpdetails:any;
  clanguage:any;
  private range =80;
 flag:any;
 default:any;
  flags:any = [
    {
      name : "India",
      flag : "../assets/imgs/India.png"
    },
    {
      name : "Dhubai",
      flag : "../assets/imgs/dhubai.jpg"
    },
    {
      name : "Pakistan",
      flag : "../assets/imgs/pak.png"
    },
    {
      name : "USA",
      flag : "../assets/imgs/america.png"
    }
  ]

  constructor(public navCtrl: NavController,public translate: TranslateService,public platform: Platform,public ngProgress: NgProgress,public storage:Storage,private ModalCtrl:ModalController, public navParams: NavParams,private socialSharing: SocialSharing) {
    this.default = "../assets/imgs/dhubai.jpg"
    // this.fbdetails = navParams.get('userData');

    // this.cmdetails = navParams.get('userData');

    // this.gpdetails = navParams.get('userData');
   this.range;
   console.log(this.range);
  
    // this.profilevalue = navParams.get('userData');
    // console.log(this.profilevalue);

    storage.get('playerData').then((val) => {
      this.profilevalue = val
     
    });

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

  edit(){
    this.navCtrl.push(EditProfilePage,{
      profile : this.profilevalue,
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
//   goback() {
//     this.navCtrl.pop();
//     console.log('Click on button Test Console Log');
//  }
 bhstry() { 
   this.navCtrl.push('BookingHistoryPage');
 }
 share(){
  this.socialSharing.share(this.message,this.subject,this.file,this.link)
 .then(()=>{

}).catch(()=>{

});
}
selectFlag(i,value){

  if("India" == value) {
    this.flag = "../assets/imgs/India.png"
  }
  else if("Dhubai" == value){
    this.flag = "../assets/imgs/dhubai.jpg"
  }
  else if("Pakistan" == value){
    this.flag = "../assets/imgs/pak.png"
  }
  else if("USA" == value){
    this.flag = "../assets/imgs/america.png"
  }
}
}
