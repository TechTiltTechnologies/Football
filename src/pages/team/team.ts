import { BrowseTeamPage } from './../browse-team/browse-team';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController,LoadingController } from 'ionic-angular';
import { CreateTeamPage } from '../create-team/create-team';
import { MyTeamPage } from '../my-team/my-team';
import { JoinFriendlyPage } from '../join-friendly/join-friendly';
import { Storage } from '@ionic/storage'
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';
import { NotificationPage } from '../notification/notification';
@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {
  teamDetails:any;
  playerDetails:any;
  teamid:any;
  player_id:any;
  team_id:any;
  createteam:any;
  my_team:any;

  constructor(public navCtrl: NavController,public toastCtrl:ToastController,public loadingCtrl:LoadingController, private http: Http, public navParams: NavParams,public storage:Storage) {
   
   
  }

  ionViewDidLoad() {

    this.profile_details();

   
  }

  profile_details(){

    this.storage.get('playerData').then((val) => {
      this.playerDetails = val;
      console.log(this.playerDetails)
      this.player_id = this.playerDetails.player_id

      console.log(this.player_id)

      console.log('1')


      var headers = new Headers();
    
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  
  let data = {
  
    player_id : this.player_id


  };
  console.log(data)
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  
  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/player_profile',data,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
 console.log(res)

  if(res.status == 200){
   loader.dismiss()
   console.log('1')
   this.team_id = res.data[0].team_id

   console.log(this.team_id)

  
   this.getteamdetails();
  
  } else
  
  {
    loader.dismiss()
    let toast  = this.toastCtrl.create({
      message: "Somthing Went Wrong.Please Try again later",
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


    });  

   

  }

  getteamdetails(){


    console.log(this.team_id)

    if(this.team_id == "0"){
       this.teamDetails = null;
       console.log('1')
       this.createteam = "createteam"
  }
  else {

    this.my_team = "myteam"
  var headers = new Headers();
    
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let data = {
  
  team_id : this.team_id,

  };
  console.log(data)
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  
  // loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/by_id_team_ci',data,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
 console.log(res)
  if(res.status == 200){
   loader.dismiss()
    this.teamDetails = {
      teamDetails : res.data
    };
  
  } else
  
  {
    //loader.dismiss()
    let toast  = this.toastCtrl.create({
      message: "Somthing Went Wrong.Please Try again later",
      duration: 3000,
      position: 'bottom'
    
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    
    toast.present();
}

});
//});
 }

  }
  cteam(){
   this.navCtrl.push(CreateTeamPage)
  }
  myteam(){
  //  console.log(this.teamDetails)
    this.navCtrl.push(MyTeamPage,{
      teamDetails:this.teamDetails
    })
  }
  join(){
    this.navCtrl.push(JoinFriendlyPage)
  }

  browseteam(){

    this.navCtrl.push(BrowseTeamPage)
    
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
}
