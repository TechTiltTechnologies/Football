import { SidePage } from './../side/side';
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController,Slides ,ToastController} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController,Platform  } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { BookedTournamnetDetailsPage } from '../booked-tournamnet-details/booked-tournamnet-details';
import { NotificationPage } from '../notification/notification';
import { BookingGroundDetailsPage } from '../booking-ground-details/booking-ground-details';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-booking-history',
  templateUrl: 'booking-history.html',
})
export class BookingHistoryPage {
  tabs:any=[];
  playerData:any;
  teamDetails:any;
  utournaments:any;
  ptournaments:any;
  id:any;
  uempty:any;
  pempty:any;
  bookedtourDetails:any;
  grounds:any;
  gempty:any;
  transdetails:any;

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  @ViewChild('slider') slider: Slides;
  SwipedTabsIndicator :any= null;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController, private platform: Platform,public storage:Storage, public navParams: NavParams,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private http: Http) {
    this.tabs=["Upcoming","Past"];
    this.transdetails = this.navParams.get('paypal');
    console.log(this.transdetails)
      this.upcoming();
      this.past();
      this.groundbooking();
      this.platform.registerBackButtonAction(() => this.backButtonClick());

  }

  backButtonClick() {
    console.log('back')
    this.navCtrl.push(SidePage);
  }

  cancelbooking(value,i){

    var currenttime = moment().format('HH:mm:ss');
    console.log(currenttime)

    var currentdate = moment().format('DD/MM/YYYY');
    console.log(currentdate)

    console.log(value)

    const confirm = this.alertCtrl.create({
      title: 'Are you sure to cancel the Current Booking!',
      message: 'Note: You must cancel the booking before 24 Hrs from the time of booking or else the payment will not be refunded.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: () => { 

           // (this.grounds).splice(value, 1);
            console.log('Agree clicked');

            var headers = new Headers();

            headers.append('Accept', 'application/json');

            headers.append('Content-Type', 'application/json');

            let options = new RequestOptions({ headers: headers });

            let data = {
                   
                   booking_id : value.booking_id,
                   cancel_date: currentdate,
                   cancel_time: currenttime
             
            };

            console.log(data);
            let loader = this.loadingCtrl.create({

              content: 'please wait…',

            });

            loader.present().then(() => {

              this.http.post('https://www.dev.glowup.me/football/api/cancel_booking', data, options)

                .map(res => res.json())

                .subscribe(res => {

                  console.log(res)


                  if (res.Status == 200) {
                    (this.grounds).splice(value, 1);
                    loader.dismiss();
                    let toast = this.toastCtrl.create({
                      message: "Booking Cancelled!",
                      duration: 3000,
                      position: 'bottom'

                    });

                    toast.onDidDismiss(() => {
                      console.log('Dismissed toast');
                    });

                    toast.present();

                  }
                  else {
                    loader.dismiss()
                  }

                });
            });
          }
        }
      ]
    });
    confirm.present();
          

  }

 
groundbooking(){
  this.storage.get('playerData').then((val) => {
    this.playerData = val;
    console.log(this.playerData)
    console.log(this.playerData.player_id)
   
  var headers = new Headers();
  
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let value = {
    player_id : this.playerData.player_id,
  };
 
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  console.log(value)
  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/booking_history',value,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
  console.log(res)
  
  
  
  if(res.status == 200){
    loader.dismiss()
   this.grounds = res.data
  
  } else
  
  {
    loader.dismiss()
    this.gempty = "null"

}

});

});


});

}
gbooking(value,i){
  console.log(value)
  this.navCtrl.push(BookingGroundDetailsPage,{
    booking:value
  })
}
upcoming(){
  this.storage.get('playerData').then((val) => {
    this.playerData = val;
    console.log(this.playerData)
    console.log(this.playerData.player_id)
   
  var headers = new Headers();
  
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let value = {
    player_id : this.playerData.player_id,
    team_id : this.playerData.team_id

  };
 
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  console.log(value)
  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/upcoming_booked_tournaments',value,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
  console.log(res)
  
  
  
  if(res.status == 200){
    loader.dismiss()
   this.utournaments = res.data
  
  } else
  
  {
    loader.dismiss()
    this.uempty = "null"

}

});

});


});

}

past(){
  this.storage.get('playerData').then((val) => {
    this.playerData = val;
    console.log(this.playerData)
    console.log(this.playerData.player_id)
   
  var headers = new Headers();
  
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let value = {
    player_id : this.playerData.player_id,
    team_id : this.playerData.team_id

  };
 
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  console.log(value)
  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/past_booked_tournaments',value,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
  console.log(res)
  
  
  
  if(res.status == 200){
    loader.dismiss()
   this.ptournaments = res.data
  
  } else
  
  {
    loader.dismiss()
    this.pempty = "null"

}

});

});


});

}
  ionViewDidLoad() {

    this.SwipedTabsIndicator = document.getElementById("indicator");
    console.log('ionViewDidLoad BookingHistoryPage');
 

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
    
    this.http.post('https://www.dev.glowup.me/football/api/after_booked_tournament_details',value,options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    console.log(res)
    
    
    
    if(res.status == 200){
    
     loader.dismiss()


      this.bookedtourDetails = {
        tourDetails : res.data
      };
  
         this.navCtrl.push(BookedTournamnetDetailsPage,{
          tourDetails:this.bookedtourDetails
          });
    
    } else
    
    {
      loader.dismiss()
      let toast  = this.toastCtrl.create({
        message: 'Something went wrong..please Try again',
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
