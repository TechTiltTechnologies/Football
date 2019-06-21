import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-starter',
  templateUrl: 'starter.html',
})
export class StarterPage {
  slider = [
    {
     heading: 'Welcome',
     title: 'FIND GROUND',
     description: 'Discover and book football ground',
     image:"assets/imgs/emoji.png"
    },
    {
      heading: 'Welcome',
     title: 'YOUR TEAMS',
     description: 'Create your team and play with others',
     image:"assets/imgs/emoji.png"
    },
    {
      heading: 'Welcome',
      title: 'PLAY TOURNAMENT',
      description: 'Register to tournament and show off your skills',
      image:"assets/imgs/emoji.png"
    },
    {
      heading: 'Welcome',
      title: 'GET REWARDS',
      description: 'Gain street credits and enjoy rewards ',
      image:"assets/imgs/emoji.png"
    }
   
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StarterPage');
  }
register(){
  this.navCtrl.push(RegisterPage);
}
login(){
  this.navCtrl.push(LoginPage);
}
}
