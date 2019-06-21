import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';
import { OtherTeamPage } from '../other-team/other-team';
import { NotificationPage } from '../notification/notification';
@IonicPage()
@Component({
  selector: 'page-join-friendly-match',
  templateUrl: 'join-friendly-match.html',
})
export class JoinFriendlyMatchPage {
  details:any;
  lists:any;
  teamdetails:any;
  rating: number = 4;
  empty:any;
  constructor(public navCtrl: NavController,public http:Http,public loadingCtrl:LoadingController, public navParams: NavParams,public rest:RestApiProvider,public toastCtrl:ToastController) {
    this.getTeam();
    this.rating;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinFriendlyMatchPage');
  }

  getTeam(){
    let loader = this.loadingCtrl.create({
    
      content: 'please wait…',
      
      });
      
    loader.present().then(() => {
    this.rest.getTeam()
    .then(data => {
      loader.dismiss()
      this.details = data;
      if(this.details.status == 500){
        this.empty = "empty"
      }else{
        this.lists = this.details.data;
        console.log(this.details)
      }
     
        
    });
  });
  }

  getItems(ev: any) {
  
    // set val to the value of the searchbar
    const val = ev.target.value;
      if (val && val.trim() != '') {
            this.lists = this.lists.filter((list) => {
       return ((list.team_name .toLowerCase().indexOf(val.toLowerCase()) > -1)); 
         // return list.team_name.toLowerCase().includes(list.team_name.toLowerCase) && list.team_city.toLowerCase().includes(list.team_city.toLowerCase());
                 
        })  
      }
    
    
  }
  jteam(i,val) {
    var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let value = {
    
    team_id : val.team_id
  
    };
   
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    console.log(value)
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/by_id_team_ci',value,options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    console.log(res)
    
    
    
    if(res.status == 200){
      loader.dismiss();
     // window.localStorage.setItem('response',res);

      //this.navCtrl.push(SidePage);

      this.teamdetails = {
        teamdetails : res.data
      };
  
         this.navCtrl.push(OtherTeamPage,{
          teamdetails:this.teamdetails,
          status:"1"
          });
    
    } else
    
    {
      loader.dismiss()
      // let toast  = this.toastCtrl.create({
      //   message: 'Your Login Username or Password is invalid',
      //   duration: 3000,
      //   position: 'bottom'
      
      // });
    
      // toast.onDidDismiss(() => {
      //   console.log('Dismissed toast');
      // });
      
      // toast.present();
  }
  
  });
  
  });

  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
}
