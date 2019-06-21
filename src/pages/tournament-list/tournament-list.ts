import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides,ToastController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { TournamentDetailsPage } from '../tournament-details/tournament-details';
import { Storage } from '@ionic/storage'
import { NotificationPage } from '../notification/notification';
@IonicPage()
@Component({
  selector: 'page-tournament-list',
  templateUrl: 'tournament-list.html',
})
export class TournamentListPage {

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  @ViewChild('slider') slider: Slides;
  tabs:any=[];
  SwipedTabsIndicator :any= null;
  tournaments:any;
  tour:any;
  tourDetails:any;
  empty:any;
  constructor(public navCtrl: NavController,public storage:Storage,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private http: Http, public navParams: NavParams,public rest:RestApiProvider) {
    this.tabs=["Tournament List","Booked Tournament"];
    this.getTournamentlist();
   
  }
  getTournamentlist(){
    this.rest.getTournament()
    .then(data => {
      this.tour = data;
      if(this.tour.status == 500){
        this.empty = "empty"
      }
      else {
        this.tournaments = this.tour.data;
        console.log(this.tournaments);
        console.log(this.tournaments[0].tour_enddate)
      }
     
    });
  }
  ionViewDidLoad() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
    console.log('ionViewDidLoad TournamentListPage');
  }
  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index,500);
    }
    
    updateIndicatiorPosition() {
    if(this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
    {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
    }
    }
    
    animateIndicator($event){
    if(this.SwipedTabsIndicator)
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1)));
  }

  detail(i,val){
    console.log(val);

    var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let value = {
    
    tour_id : val.tour_id
  
    };
   
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    console.log(value)
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/tournament_list_by_id',value,options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    console.log(res)
    
    
    
    if(res.status == 200){
     // window.localStorage.setItem('response',res);
     loader.dismiss()

      //this.navCtrl.push(SidePage);

      this.tourDetails = {
        tourDetails : res.data
      };
  
         this.navCtrl.push(TournamentDetailsPage,{
          tourDetails:this.tourDetails
          });
    
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
  notify(){
    this.navCtrl.push(NotificationPage);
  }
}
