import { LanguageSettingsPage } from './../language-settings/language-settings';

import { FullteamPage } from './../fullteam/fullteam';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController,LoadingController } from 'ionic-angular';
//import { HomePage } from '../home/home';
import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';
import { FaqPage } from '../faq/faq';
import { TermsPage } from '../terms/terms';
import { Storage } from '@ionic/storage'
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { StarterPage } from '../starter/starter';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import 'rxjs/add/operator/map';
import { MyTeamPage } from '../my-team/my-team';
import { Platform } from 'ionic-angular';
import { TeamPage } from '../team/team';
//import introJs from 'intro.js/intro.js';
@IonicPage()
@Component({
  selector: 'page-side',
  templateUrl: 'side.html',
})
export class SidePage {
 rootPage = 'TabsPage';
 locationdetails:any;
 fbdetails:any;
 cmdetails:any;
 gpdetails:any;
 profilevalue:any;
 name:any;
 playerDetails:any;
 teamid:any;
 teamDetails:any;
 message:string;
 player_id:any;
 team_id:any;
 clanguage:any;
 file:string = null;
 link:string = 'https://www.facebook.com/';
 subject:string = 'Dowload and get 51';

  constructor(public navCtrl: NavController,public translate: TranslateService,public platform: Platform,private socialSharing: SocialSharing,public alertCtrl:AlertController,  public storage:Storage,public toastCtrl:ToastController,public loadingCtrl:LoadingController, private http: Http, public navParams: NavParams) {
    storage.get('chooselanguage').then((val) => {
      this.clanguage = val;
    console.log(this.clanguage)

    if(this.clanguage == 'en')
    {
      console.log('1')
      console.log('ltr')
      this.platform.setDir('ltr', true);
      this.translate.use('en');
    }
    else if(this.clanguage == 'ar'){
      console.log('2')
      console.log('rtl')
      this.platform.setDir('rtl', true);
      this.translate.use('ar');
      
    }
    });
   storage.get('checked').then((val) => {
     if(val == null){
      this.cmdetails =  navParams.get('playerDetails');
      this.name = this.cmdetails.player_fname;
      this.storage.set('playerData',this.cmdetails)
     }
     else{
      storage.get('playerData').then((val) => {
        this.cmdetails = val;
        this.name = this.cmdetails.player_fname;
        console.log(this.name)

        this.message = this.name + '  has invited you to join to Street League. Install Street League app now from below link and have fun playing football!'
       });
     
     }
  
   });

  

  
  this.locationdetails = navParams.get('locationData');

    //  console.log(this.locationdetails)

  
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SidePage');
  }

  home(){
    //this.navCtrl.push(SidePage);
  }
  notify()
  {
    this.navCtrl.push(NotificationPage);
  }
  profile(){
    console.log(this.cmdetails)
    this.navCtrl.push(ProfilePage,{
      userData:this.cmdetails
      });
  }
  about(){
    this.navCtrl.push(AboutPage);
  }

  invite(){

    
  console.log(this.message)

    this.socialSharing.share(this.message,this.subject,this.file,this.link)
    .then(()=>{
   
   }).catch(()=>{
   
   });



  }
faq(){
  this.navCtrl.push(FaqPage);
}
terms(){
  this.navCtrl.push(TermsPage);
}
isActive(Page){

}
 //quick tour
 
// ngAfterViewInit(): void {
//   this.intro();
// }

// intro() {
//   let intro = introJs.introJs();
//   intro.setOptions({
//   steps: [
//     {
//       intro: "Hello world!"
//     },
//     {
//       element: '#step1',
//       intro: "This is a tooltip.",
//       position: 'bottom'

//     },
//     {
//       element: '#step2',
//       intro: "Ok, wasn't that fun?",
//       position: 'bottom'
//     }
//   ]
//   });
//   intro.start();
// } 
Logout(){
  let alert = this.alertCtrl.create({
    title: 'Logout',
    message: 'Do you want to Logout?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
         // this.navCtrl.push(SidePage);
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.storage.set('playerData',null);
          this.storage.set('teamDetails',null);
          this.storage.set('checked',null)
          //this.navCtrl.setRoot(StarterPage);
          this.navCtrl.push(LoginPage)
        }
      }
    ]
  });
  alert.present();
 
}

booking(){
  this.navCtrl.push('BookingHistoryPage');
  //this.navCtrl.push('https://www.google.com')
}

myTeam(){

  

  this.navCtrl.push(FullteamPage);

   this.storage.set('sidemyteam', "sideteam");
//   // this.storage.get('playerData').then((val) => {
//   //   this.playerDetails = val;
//   //   this.teamid = this.playerDetails.team_id

//   //this.getteamid();

//   this.storage.get('playerData').then((val) => {
//     this.playerDetails = val;
//     console.log(this.playerDetails)
//     this.player_id = this.playerDetails.player_id

//     console.log(this.player_id)

//     console.log('1')


//     var headers = new Headers();
  
// headers.append('Accept', 'application/json');

// headers.append('Content-Type', 'application/json' );

// let options = new RequestOptions({ headers: headers });


// let data = {

//   player_id : this.player_id


// };
// console.log(data)
// let loader = this.loadingCtrl.create({

// content: 'please wait…',

// });

// loader.present().then(() => {

// this.http.post('https://www.dev.glowup.me/football/api/player_profile',data,options)

// .map(res => res.json())

// .subscribe(res => {

// console.log(res)

// if(res.status == 200){
//  loader.dismiss()
//  console.log('1')
//  this.team_id = res.data[0].team_id

//  console.log(this.team_id)

//  this.getteamdetails();

// } else

// {
//   loader.dismiss()
//   let toast  = this.toastCtrl.create({
//     message: "Somthing Went Wrong.Please Try again later",
//     duration: 3000,
//     position: 'bottom'
  
//   });

//   toast.onDidDismiss(() => {
//     console.log('Dismissed toast');
//   });
  
//   toast.present();
// }

// });
// });


//   }); 
  
}


language(){

  this.navCtrl.push(LanguageSettingsPage)

}

// getteamdetails(){

  
//   console.log(this.team_id)

//   if(this.team_id == "0"){
//     this.teamDetails = null;
//     let toast  = this.toastCtrl.create({
//       message: "Sorry,you must create team first",
//       duration: 3000,
//       position: 'bottom'
    
//     });
  
//     toast.onDidDismiss(() => {
//       console.log('Dismissed toast');
//     });
    
//     toast.present();
//   }
// else {

//   var headers = new Headers();
  
//   headers.append('Accept', 'application/json');
  
//   headers.append('Content-Type', 'application/json' );
  
//   let options = new RequestOptions({ headers: headers });
  
//   let data = {
  
//   team_id : this.team_id,
  
//   };
//   //console.log(data)
//   let loader = this.loadingCtrl.create({
  
//   content: 'please wait…',
  
//   });
  
//   loader.present().then(() => {
  
//   this.http.post('https://www.dev.glowup.me/football/api/by_id_team_ci',data,options)
  
//   .map(res => res.json())
  
//   .subscribe(res => {
  
//   // console.log(res)
//   if(res.status == 200){
//    loader.dismiss()
//     this.teamDetails = {
//       teamDetails : res.data
//     };
//     this.navCtrl.push(TeamPage,{
//       teamDetails:this.teamDetails
//     })
//   } else
  
//   {
//     loader.dismiss()
//     let toast  = this.toastCtrl.create({
//       message: "Sorry,you must create team first",
//       duration: 3000,
//       position: 'bottom'
    
//     });
  
//     toast.onDidDismiss(() => {
//       console.log('Dismissed toast');
//     });
    
//     toast.present();
//   }
  
//   });
//   });
  
  
// }
// }
}
