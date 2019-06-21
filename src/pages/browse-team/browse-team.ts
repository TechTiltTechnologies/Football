import { BrowseTeammatesPage } from './../browse-teammates/browse-teammates';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ToastController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';

import { OtherTeamPage } from '../other-team/other-team';

@IonicPage()
@Component({
  selector: 'page-browse-team',
  templateUrl: 'browse-team.html',
})
export class BrowseTeamPage {

  details:any;
  lists:any;
  teamdetails:any;
  rating: number = 4;
  empty:any;

  constructor(public navCtrl: NavController,private toastCtrl: ToastController,private http: Http,public loadingCtrl:LoadingController, public rest:RestApiProvider,public alertCtrl:AlertController, public navParams: NavParams) {
    this.getTeam();
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseTeamPage');
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
      }
      else {
        this.lists = this.details.data;
        console.log(this.lists);
      }
      
    });
  });
  }

  fillter() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Filter by?');

    alert.addInput({
      type: 'checkbox',
      label: 'Nearby',
      value: 'value1'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Within 10Km',
      value: 'value2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Within 20Km',
      value: 'value3'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        // this.testCheckboxOpen = false;
        // this.testCheckboxResult = data;
      }
    });
    alert.present();
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
     // window.localStorage.setItem('response',res);
     loader.dismiss()
     

      //this.navCtrl.push(SidePage);

      this.teamdetails = {
        teamdetails : res.data
      };
  
         this.navCtrl.push(BrowseTeammatesPage,{
          teamdetails:this.teamdetails
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

  getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;
      if (val && val.trim() != '') {
            this.lists = this.lists.filter((list) => {
          return ((list.team_name.toLowerCase().indexOf(val.toLowerCase()) > -1)); 
        })
      }
    
    
  }


}
