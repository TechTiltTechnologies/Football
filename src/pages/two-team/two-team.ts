import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides,ToastController,LoadingController } from 'ionic-angular';
import { ConditionalExpr } from '@angular/compiler';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { NotificationPage } from '../notification/notification';

@IonicPage()
@Component({
  selector: 'page-two-team',
  templateUrl: 'two-team.html',
})
export class TwoTeamPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  @ViewChild('slider') slider: Slides;

   @ViewChild('SwipedTabsSliderr') SwipedTabsSliderr: Slides ;
   @ViewChild('sliderr') sliderr: Slides;

   SwipedTabsIndicator :any= null;
   SwipedTabsIndicatorr :any= null;
   tabs:any=[];
   tabs1:any[];
   Teams:any;
   tourid:any;
   teamid:any;
   tdetails:any;
   teams:any;
   lists:any
   team1:any;
   team2:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private http: Http) {
   this.Teams = navParams.get('teamDetails');
   this.tourid = navParams.get('id')
   this.teamid = navParams.get('teamid')
   this.tdetails = navParams.get('tDetails')
   this.teams = this.Teams.team1;
   this.lists = this.Teams.team2;
   this.separateteam(this.Teams,this.tourid,this.teamid);
   this.tabs=["SQUADS","STATISTICS"];
   this.tabs1=[this.tdetails.team_name1,this.tdetails.team_name2];
  }

  separateteam(detail,id,tid){

  //statistics
  var headers = new Headers();
    
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let value = {

  tour_id : id,

  team_id : tid

  };
 
  // let loader = this.loadingCtrl.create({
  
  // content: 'please wait…',
  
  // });
  console.log(value)

  
  this.http.post('https://www.dev.glowup.me/football/api/two_team_match_statistics',value,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
  console.log(res)

  if(res.status == 200){
  
  // loader.dismiss()
    this.team1 = res.data.team1;
    this.team2 = res.data.team2;
     console.log(res.data.team1)
     console.log(res.data.team2)
  
  } else
  
  {
   // loader.dismiss()
    let toast  = this.toastCtrl.create({
      message: 'Your Login Username or Password is invalid',
      duration: 3000,
      position: 'bottom'
    
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    
    toast.present();
}

});


      
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TwoTeamPage');
    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.SwipedTabsIndicatorr = document.getElementById("indicatorr");
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


  selectTabb(index) {
    this.SwipedTabsIndicatorr.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSliderr.slideTo(index,500);
    }
    
    updateIndicatiorPositionn() {
    if(this.SwipedTabsSliderr.length()> this.SwipedTabsSliderr.getActiveIndex())
    {
    this.SwipedTabsIndicatorr.style.webkitTransform = 'translate3d('+(this.SwipedTabsSliderr.getActiveIndex() * 100)+'%,0,0)';
    }
    }
    
    animateIndicatorr($event){
    if(this.SwipedTabsIndicatorr)
    this.SwipedTabsIndicatorr.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSliderr.length()-1)));
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
}
