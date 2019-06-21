import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { StartJourneyPage } from '../start-journey/start-journey';
import { TermsPage } from '../terms/terms';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { elementStart } from '@angular/core/src/render3/instructions';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email:any;
  fname:any;
  lname:any;
  mobile:any;
  validate:any;
  emvalidate:any;
  @ViewChild('role') role;
  password:any;
  isChecked:any;
  isenabled:boolean=false;
  deviceId:any;
  checkk:any;
   
  
  heroes: ["Batman", "Donald Duck", "Captain America", "Spiderman", "Thor"]

  constructor(public navCtrl: NavController,private uniqueDeviceID: UniqueDeviceID, public navParams: NavParams,private toastCtrl: ToastController,public alertCtrl: AlertController,  private http: Http,  public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.uniqueDeviceID.get()
    .then((uuid: any) =>{
      this.deviceId = uuid;
      console.log(this.deviceId);
    })
    .catch((error: any) => console.log(error));
  }

  register(){
    if(this.fname=='' ){
      let toast  = this.toastCtrl.create({
        message: 'FirstName field is empty',
        duration: 3000,
        position: 'bottom'
      
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
      
      } else
      
      if(this.email==''){
        let toast  = this.toastCtrl.create({
          message: 'Email field is empty',
          duration: 3000,
          position: 'bottom'
        
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        
        toast.present();
      
      }
      
      else

      var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)
      if(!email){
        let toast  = this.toastCtrl.create({
          message: 'Invalid Email ID',
          duration: 3000,
          position: 'bottom'
        
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        
        toast.present();
      
      }
      
      else
      
      if(this.mobile =='' ){
        let toast  = this.toastCtrl.create({
          message: 'Mobile number field is empty',
          duration: 3000,
          position: 'bottom'
        
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        
        toast.present();
      
      } else

       
      if(this.mobile.length != 10 ){
        let toast  = this.toastCtrl.create({
          message: 'Invalid Mobile Number',
          duration: 3000,
          position: 'bottom'
        
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        
        toast.present();
      
      } else
      
      if(this.password==''){
      
        let toast  = this.toastCtrl.create({
          message: 'Password field is empty',
          duration: 3000,
          position: 'bottom'
        
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        
        toast.present();
      
      } else

      if(this.password.length <= 6){
      
        let toast  = this.toastCtrl.create({
          message: 'Password Should be Atleast six digits',
          duration: 3000,
          position: 'bottom'
        
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        
        toast.present();
      
      } else

      if(this.isChecked != true){
      
        let toast  = this.toastCtrl.create({
          message: 'Please accept the Terms and condition',
          duration: 3000,
          position: 'bottom'
        
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        
        toast.present();
      
      }


      else
      
      {

        this.isenabled=true; 
      
      var headers = new Headers();
      
      headers.append('Accept', 'application/json');
      
      headers.append('Content-Type', 'application/json' );
      
      let options = new RequestOptions({ headers: headers });
      
      let data = {
      
      first_name : this.fname,

     // last_name : this.lname,
      
      password: this.password,
      
      phone_number: this.mobile,
      
      email: this.email,

      player_role: this.role.value,

      device_id:this.deviceId

     // city: this.city.value,

    //  address : this.address.value
      
      };
      
      let loader = this.loading.create({
      
      content: 'please wait…',
      
      });
      console.log(data)
      loader.present().then(() => {
      
      this.http.post('https://www.dev.glowup.me/football/api/users/register',data, options)
      
      .map(res => res.json())
      
      .subscribe(res => {
    
      console.log(res)
      
      if(res.status == 200){
        
        loader.dismiss();
        let toast  = this.toastCtrl.create({
          message: (res.msg),
          duration: 3000,
          position: 'bottom'
        
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        
        toast.present();

        if(res.msg == "Already User Exists"){
          this.navCtrl.push(LoginPage)
        }
      
      this.navCtrl.push(StartJourneyPage);
      
      }else
      
      {
        loader.dismiss();
        let toast  = this.toastCtrl.create({
          message: (res),
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
  Login(){
    this.navCtrl.push(LoginPage);
  }
  check(){
    console.log(this.isChecked)
    if(this.isChecked == true && this.fname != undefined && this.email != undefined && this.mobile != undefined && this.password != undefined){
      this.isenabled=true; 
    }
    else{
      this.isenabled=false; 
      let toast  = this.toastCtrl.create({
        message: 'Please Enter the Fields',
        duration: 3000,
        position: 'bottom'
      
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      
      toast.present();


    }
  }
  terms(){

    this.navCtrl.push(TermsPage)
  }


  mobvalidate(){
    if(this.mobile.length < 10 || this.mobile.length > 10){
      this.validate = "validate";
    }
    else if(this.mobile.length == 10){
      this.validate = null;
    }
    else{

    }
  }
  emailvalidate(){
   let email =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)
    if(!email){
      this.emvalidate = "validate";
    }
    else{
      this.emvalidate = null;
    }
  }
  

}
