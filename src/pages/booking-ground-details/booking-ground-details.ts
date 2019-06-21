import { Component,ElementRef,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google:any;
@IonicPage()
@Component({
  selector: 'page-booking-ground-details',
  templateUrl: 'booking-ground-details.html',
})
export class BookingGroundDetailsPage {

  detials:any;
  id:any;
  transaction:any;
  @ViewChild('map') mapRef : ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.detials = navParams.get('booking');
   this.transaction = this.detials.transaction_id;
   if(this.transaction != ""){
     this.id = this.transaction
   }
   else{
     this.id = null
   }
   console.log(this.detials)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingGroundDetailsPage');
    this.DisplayMap();
  }
  DisplayMap(){

    for(let i=0;i<10;i++){
    let lat = 12.978467;
    let lng = 80.216918;

    let location = new google.maps.LatLng(lat, lng);

    let options ={
      center : location,
      zoom : 8,
      streetViewControl:false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl:false,
      mapTypeControl:false,
      fullscreenControl:false
     
    };

    const map = new google.maps.Map(this.mapRef.nativeElement,options);

    this.addMarker(location,map);
  }
  }
  addMarker(position,map){
    return new google.maps.Marker({
      position,
      map
    });

  }
}
