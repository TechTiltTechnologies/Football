import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { RestApiProvider } from '../../providers/rest-api/rest-api'
import { NotificationPage } from '../notification/notification';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { PlayPage } from '../play/play';
@IonicPage()
@Component({
  selector: 'page-add-players',
  templateUrl: 'add-players.html',
})
export class AddPlayersPage {
  data:any;
  players:any;
  message:string = 'Football';
  file:string = null;
  link:string = 'https://www.facebook.com/';
  subject:string = 'Dowload and get 51';
  selectedPlayer :any = [];
  teamDetails:any;
  rating: number = 4;
  items:any = [];
  constructor(public navCtrl: NavController,public loadingCtrl:LoadingController,private http: Http,public toastCtrl:ToastController,public rest:RestApiProvider,public navParams: NavParams,private socialSharing: SocialSharing) {
 this.getplayerlist();
 this.rating;
   this.teamDetails = navParams.get('teamdetails')
   console.log(this.teamDetails)
   console.log(this.teamDetails.team_name)

   this.message = this.teamDetails.team_name + ' has invited you to join their team. Log in to Street League app now to accept / deny their invitation '
  }
  getplayerlist(){
    this.rest.getPlayer()
    .then(data => {
      this.data = data;
      this.players = this.data.data
     // this.grounds = this.Gdetails.data;
    });
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlayersPage');
  }

  selectPlayer(data,i){
    console.log(i)
      if (data.checked == true) {
        this.selectedPlayer.push(data.player_id);

      } 
      else if(data.checked == false){
        console.log(i)
        this.selectedPlayer.splice(i, 1);
        console.log(this.selectedPlayer);
      }
      else {
       let newArray = this.selectedPlayer.filter(function(el) {
         return el !== data;
      });
       this.selectedPlayer = newArray;
     }
     console.log(this.selectedPlayer); 
     //console.log(JSON.stringify(this.selectedPlayer))
  }

  share(){
    this.socialSharing.share(this.message,this.subject,this.file,this.link)
   .then(()=>{
  
  }).catch(()=>{
  
  });
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;
    if(val == ""){
      this.getplayerlist();
    }
      if (val && val.trim() != '') {
            this.players = this.players.filter((player) => {
          return ((player.player_fname.toLowerCase().indexOf(val.toLowerCase()) > -1)); 
        })
      }
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
  send(){
    var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let value = {

      team_id : this.teamDetails.team_id,

      player_id : this.selectedPlayer
  
    };
   
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    console.log(value)
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/addplayer_send_sms',value,options)
    
    .map(res => res)
    
    .subscribe(res => {
    
    console.log(res.status)
    
   
    if(res.status == 200){

      
      loader.dismiss()
      let toast  = this.toastCtrl.create({
        message: "Request sent successfully",
        duration: 3000,
        position: 'bottom'
      
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      
      toast.present();
    
    } else
    
    {

      loader.dismiss()
      let toast  = this.toastCtrl.create({
        message: 'Please Try again later',
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
}
