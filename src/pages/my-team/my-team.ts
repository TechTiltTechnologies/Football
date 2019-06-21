import { FullteamPage } from './../fullteam/fullteam';
import { HomePage } from './../home/home';
import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ToastController, AlertController ,Slides,LoadingController} from 'ionic-angular';
import { AddPlayersPage } from '../add-players/add-players';
import { Storage } from '@ionic/storage'
import {Http, Headers, RequestOptions}  from '@angular/http';
import { NotificationPage } from '../notification/notification';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { PlayerDetailsPage } from '../player-details/player-details';
import { Platform } from 'ionic-angular';
import { TeamPage } from '../team/team';
import { Navbar } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-my-team',
  templateUrl: 'my-team.html',
})
export class MyTeamPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  @ViewChild('SwipedSTabsSlider') SwipedSTabsSlider: Slides ;
  @ViewChild('slider') slider: Slides;
  @ViewChild(Navbar) navBar: Navbar;
  data:any;
  editfwd:any;
  editfwd1:any;
  editfwd2:any;
  midd1:any;
  midd2:any;
  midd3:any;
  midd4:any;
  defe:any;
  defe1:any;
  defe2:any;
  defe3:any;
  gk:any;
  teamDetails:any;
  SwipedTabsIndicator :any= null;
  SwipedSTabsIndicator :any= null;
  tabs:any=[];
  stabs:any = [];
  players:any;
  tlogo:any;
  forwarders:any;
  lists:any = [];
  midfielders:any;
  goalkeepers:any;
  defenders:any;
  player:any;
  playerData:any;
  delete:any;
  plays:any;
  sideteam:any;
  constructor(public navCtrl: NavController,private navController: NavController,public platform: Platform,public toastCtrl:ToastController, public modalCtrl:ModalController, private photoViewer: PhotoViewer,public alertCtrl:AlertController, private http: Http,public loadingCtrl: LoadingController, public navParams: NavParams,public storage:Storage) {
    this.tabs=["Team Information","Team formation"];
    this.stabs = ["Team Details","Contacts"]
    this.data = navParams.get('teamDetails');
   
    //this.storage.set('teamDetails',this.data)
    this.teamDetails = this.data.teamDetails;
    this.tlogo = this.teamDetails.team_logo_url
    this.players = this.teamDetails.team_players_details
    this.defenders = this.teamDetails.defender;
    this.forwarders = this.teamDetails.forwarder;
    this.midfielders = this.teamDetails.mid_fielder;
    this.goalkeepers = this.teamDetails.goal_keeper;
    console.log(this.teamDetails)
    console.log(this.defenders)
    
    storage.set("teamDetails",this.teamDetails)
    storage.get('playerData').then((val) => {
      this.playerData = val;
      console.log(this.playerData)
     
      //  console.log(this.players)
      // for(let i = 0;i<this.players.length;i++){
        if(this.playerData.team_role == "Captain"){
         this.delete = "delete"
        }else{
           this.delete = null;
        }
    //  }
    }); 

    storage.get('sidemyteam').then((val) =>{

      console.log(val)

      this.sideteam = val


    })
    this.platform.registerBackButtonAction(() => this.backButtonClickk());
  }

 

  formation(){
  console.log('hi')
   dragElement(document.getElementById("mydiv"));
   console.log(document.getElementById("mydiv"))
    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
      }
    
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamPage');
    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.SwipedSTabsIndicator = document.getElementById("indicators");
    this.platform.registerBackButtonAction(() => this.backButtonClickk());
    this.navBar.backButtonClick = (e:UIEvent)=>{

 if(this.sideteam == "sideteam"){
  this.navCtrl.push(FullteamPage);
 }
      // todo something
      
     // this.navController.pop();
     this.navCtrl.push(TeamPage);
     
   }
  }

  backButtonClickk() {
    console.log('back')
    this.navCtrl.push(TeamPage);
  }
  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index,500);
    }
    selectSTab(index) {
      this.SwipedSTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
      this.SwipedSTabsSlider.slideTo(index,500);
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
  
  updateSIndicatiorPosition() {
    if(this.SwipedSTabsSlider.length()> this.SwipedSTabsSlider.getActiveIndex())
    {
    this.SwipedSTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedSTabsSlider.getActiveIndex() * 100)+'%,0,0)';
    }
    }
    
    animateSIndicator($event){
    if(this.SwipedSTabsIndicator)
    this.SwipedSTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedSTabsSlider.length()-1)));
  }
  addPlayer(){
    this.navCtrl.push(AddPlayersPage,{
      teamdetails : this.teamDetails
    })
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
 showplayer(player){
     this.player = {
     single : player 
    }  
    this.navCtrl.push(PlayerDetailsPage,this.player);
 
 }
 deleteTeam(){

  const confirm = this.alertCtrl.create({
    title: 'Confirmation',
    message: 'Are you Confirm to delete this team?',
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: () => {
          //const confirmm = this.alertCtrl.create({
            //title: 'Information',
            //message: 'If you select "ok".it is automatic logout',
            //buttons: [
              // {
              //   text: 'Cance',
              //   handler: () => {
              //     console.log('Disagree clicked');
              //   }
              // },
             // {
               // text: 'Ok',
                //handler: () => {
               
          var headers = new Headers();
    
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let value = {
    team_id : this.teamDetails.team_id,

  };
 
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  console.log(value)
  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/delete_team',value,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
  console.log(res)
  
 
  if(res.status == 200){

   //console.log(this.playerData)
  // this.storage.set('teamDetails',null)
    loader.dismiss()
   // this.storage.set('playerData',null)
    //this.platform.exitApp();
   this.navCtrl.push(TeamPage)

  
  } else
  
  {

    loader.dismiss()
    let alert = this.alertCtrl.create({
      title: 'Information',
      subTitle: 'Team is Register a tournament. So you could not delete your team',
      buttons: ['Ok']
    });
    alert.present();

}

});
});
}
}
]
});
confirm.present();

//});
//confirmm.present();
    //    }
      
 // });
 // confirm.present();


  
 }


 //Edit formation methods   // created by Dinesh
 editfor(){
    this.editfwd = "fwd" 
 }
 editforr(){
   this.editfwd1 = "fwd1"
 }
 editforrr(){
  this.editfwd2 = "fwd1"
}
 mid(){
   this.midd1 = "mid1";
 }
 mid1(){
  this.midd2 = "mid2";
}
mid2(){
  this.midd3 = "mid3";
}
mid3(){
  this.midd4 = "mid4";
}
def(){
  this.defe = "defe"
}
def1(){
  this.defe1 = "defe"
}
def2(){
  this.defe2 = "defe"
}
def3(){
  this.defe3 = "defe"
}
goal(){
this.gk = "gk"
}
 itemTapped(value){
   console.log(value)
   if(value.player_role == "Forwarder"){
    if(this.editfwd != null){
    this.editfwd = null; 
    this.forwarders[0].player_fname = value.player_fname;
  } 
  else if(this.editfwd1 != null){
    this.editfwd1 = null; 
    this.forwarders[1].player_fname = value.player_fname;
  } 
  else if(this.editfwd2 != null){
    this.editfwd2 = null; 
    this.forwarders[2].player_fname = value.player_fname;
  } 
   }
   if(value.player_role == "MidFielder"){
    if(this.midd1 != null){
    this.midd1 = null; 
    this.midfielders[0].player_fname = value.player_fname;
  } 
  else if(this.midd2 != null){
    this.midd2 = null; 
    this.midfielders[1].player_fname = value.player_fname;
  } 
  else if(this.midd3 != null){
    this.midd3 = null; 
    this.midfielders[2].player_fname = value.player_fname;
  } 
  else if(this.midd4 != null){
    this.midd4 = null; 
    this.midfielders[3].player_fname = value.player_fname;
  } 
   }
   if(value.player_role == "Defender"){
     console.log("1")
    if(this.defe != null){
      console.log("2")
    this.defe = null; 
    this.defenders[0].player_fname = value.player_fname;
  } 
  else if(this.defe1 != null){
    console.log("3")
    this.defe1 = null; 
    this.defenders[1].player_fname = value.player_fname;
  } 
  else if(this.defe2 != null){
    console.log("4")
    this.defe2 = null; 
    this.defenders[2].player_fname = value.player_fname;
  } 
  else if(this.defe3 != null){
    console.log("5")
    this.defe3 = null; 
    this.defenders[3].player_fname = value.player_fname;
  } 
   }
   if(value.player_role == "Goal Keeper"){
    if(this.gk != null){
    this.gk = null; 
    this.goalkeepers[0].player_fname = value.player_fname;
  } 
  
   }
 }
 //end
 

}
