import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SidePage } from '../side/side';
import { RegisterPage } from '../register/register';

import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
//import { ForgetPage } from '../forget/forget';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { StadiumdetailsPage } from '../stadiumdetails/stadiumdetails';
import { ForgetPage } from '../forget/forget';

import { FcmProvider } from './../../providers/fcm/fcm.provider';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("emailid") emailid;

  @ViewChild("password") password;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  public type = 'password';
  public showPass = false;
  playerData:any;
  Data:any;

  user:any = {};

  data:string;

  playerDetails = null;

  userData = null;
  isChecked:any;

  constructor(public navCtrl: NavController,private facebook: Facebook,private googlePlus: GooglePlus,private toastCtrl: ToastController,public loadingCtrl: LoadingController, public navParams: NavParams,public alertCtrl: AlertController,

    private http: Http, public loading: LoadingController,private storage: Storage, public fcm:FcmProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signup(){
   this.navCtrl.push(RegisterPage);
  }

  showPassword() {
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  glogin(){
    this.googlePlus.login({})
  .then(res => {

    this.user  = res;
    // this.navCtrl.push(SidePage);
    this.getData();
    let loader = this.loadingCtrl.create({
  
      content: 'please wait…',
      
      });
      loader.present().then(() => {    
        let toast  = this.toastCtrl.create({
          message: ('your login successfull with ' + res.displayName),
          duration: 5000,
          position: 'bottom'
        
        });
        loader.dismiss()
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        this.fcm.getToken();
        toast.present();
      })
  })

  .catch(err => console.error(err));
  }

  getData(){

    this.http
    .get('https://www.googleapis.com/plus/v1/people/me?access_token='+  this.user.accessToken)
    .subscribe((data:any)=> {

    this.userData = {
    email: [this.user.email], 
   // first_name: data['first_name'], 
    picture: [this.user.imageUrl], 
    username: [this.user.displayName]};

  this.navCtrl.push(SidePage,{
    userData:this.userData
    });
     
 window.localStorage.setItem('gtoken',data.displayName);
      })
  }


  fblogin(){
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}

        window.localStorage.setItem('fbvalue', this.userData.username);

        let loader = this.loadingCtrl.create({
  
          content: 'please wait…',
          
          });
        
          loader.present().then(() => {    
        let toast  = this.toastCtrl.create({
          message: ('your login successfull with ' + this.userData.username),
          duration: 5000,
          position: 'bottom'
        
        });
        loader.dismiss()
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        this.fcm.getToken();
        toast.present();
    
      //  this.navCtrl.push(SidePage);
      
        this.navCtrl.push(SidePage,{
          userData:this.userData
          });
        })
   // console.log(this.userData);
      });
    });
  }

  Login(){
   //// check to confirm the username and password fields are filled
   if(this.emailid.value=='' ){
    window.localStorage.setItem('email',this.emailid.value);
    let toast  = this.toastCtrl.create({
      message: 'Email Id field is empty',
      duration: 3000,
      position: 'bottom'
    
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    
    toast.present();
    
    } else if(this.password.value ==''){
      window.localStorage.setItem('email',this.password.value);
      let toast  = this.toastCtrl.create({
        message: 'Password field is empty',
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
    
    var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {
    
    email: this.emailid.value,
    
    password: this.password.value,
  
    };
    console.log(data)
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/users/login',data,options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    console.log(res)
    
    
    
    if(res.status == 200){

    this.storage.set('playerData',res.data);
     loader.dismiss()
      let toast  = this.toastCtrl.create({
        message: (res.msg),
        duration: 3000,
        position: 'bottom'
      
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      this.fcm.getToken();
      
      toast.present();

         this.playerData = res.data;

         this.navCtrl.push(SidePage,{
          playerDetails:res.data
          });
    
    } 
    else if(res.status == "No Data Found"){

      loader.dismiss()
      let toast  = this.toastCtrl.create({
        message: 'Please Register First',
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
      loader.dismiss()
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
  
  });
  }
  }

  keep(){
    console.log(this.isChecked);
    if(this.isChecked == true){
        // this.playerDetails = "Value";
        this.storage.set('checked',"dinesh")
     //this.storage.set('playerData',this.playerData);

    }else{
      this.storage.set('checked', null)
   //   this.storage.set('playerData',null);
    }
  }

  guest(){
     this.navCtrl.push('GtabsPage')
  }
  
  forget(){
    this.navCtrl.push(ForgetPage);
  }
}
