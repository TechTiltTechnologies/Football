import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


declare var google:any;
@IonicPage()
@Component({
  selector: 'page-address-view',
  templateUrl: 'address-view.html',
})
export class AddressViewPage {
  @ViewChild('map') mapRef : ElementRef;
  latlng:any;
  lat:any;
  lng:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lat = navParams.get('lat')
    this.lng = navParams.get('lng')
    console.log(this.lat,this.lng)
  }

  ionViewDidLoad() {
    console.log(this.mapRef); 
    this.DisplayMap();
    console.log('ionViewDidLoad AddressViewPage');
  }
  DisplayMap(){
    let location = new google.maps.LatLng(this.lat,this.lng);

    let options ={
      center : location,
      zoom : 10,
      streetViewControl:false,
        mapTypeId: google.maps.MapTypeId.ROADMAP //ROADMAP
    };

    const map = new google.maps.Map(this.mapRef.nativeElement,options);

    this.addMarker(location,map);
  }
  addMarker(position,map){
    return new google.maps.Marker({
      position,
      map
    });

  }

  goback() {
    this.navCtrl.pop();
    console.log('Click on button Test Console Log');
 }
}
