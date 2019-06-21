import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { TwoTeamPage } from '../two-team/two-team';
import { NotificationPage } from '../notification/notification';

@IonicPage()
@Component({
  selector: 'page-booked-tournamnet-details',
  templateUrl: 'booked-tournamnet-details.html',
})
export class BookedTournamnetDetailsPage {

  BookedDetils:any;
  details:any;
  backgrounds:any;
  schedules:any;
  results:any;
  team_ids:any;
  table:any;

  // backgrounds = [
  //   '../assets/imgs/tournament_bg.png',
  //   '../assets/imgs/tournament_bg.png',
    
  // ];
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private http: Http) {
 this.BookedDetils = navParams.get('tourDetails')
 this.details = this.BookedDetils.tourDetails[0];
 this.schedules = this.BookedDetils.tourDetails[0].team_schedule;
 this.results = this.BookedDetils.tourDetails[0].team_match_results;

if(this.results != ""){
  this.table = null;
  console.log('hai')
}else{
  this.table = "empty";
  console.log('i')
}
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookedTournamnetDetailsPage');
  }


detail(i,val){
  console.log(val)
  //this.navCtrl.push(TwoTeamPage)
  var headers = new Headers();
    
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let value = {

  team_id : val.two_team_ids

  };
 
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  console.log(value)
  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/two_team_match_details',value,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  if(res.status == 200){
   // window.localStorage.setItem('response',res);
   loader.dismiss()

       this.navCtrl.push(TwoTeamPage,{
        teamDetails:res.data,
        id : this.BookedDetils.tourDetails[0].tour_id,
        teamid : val.two_team_ids,
        tDetails : val
        });
  
  } else
  
  {
    loader.dismiss()
    let toast  = this.toastCtrl.create({
      message: 'Try again later',
      duration: 3000,
      position: 'bottom'
    
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    
    toast.present();
}

});

});
}
notify(){
  this.navCtrl.push(NotificationPage);
}
}
