import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers, RequestOptions}  from '@angular/http';

@Injectable()
export class FcmProvider {

  constructor(
  	public firebaseNative: Firebase,
  	public platform: Platform,
    public http:Http,
    public storage:Storage
  ) { }

  async getToken(){
  	
  	let token;

  	if (this.platform.is('android')) {
  		token = await this.firebaseNative.getToken();
  	}

  	if (this.platform.is('ios')) {
  		token = await this.firebaseNative.getToken();
  		await this.firebaseNative.grantPermission();
  	}

  	return this.saveTokenToServer(token);
  }

  private saveTokenToServer(token) {
  	console.log(token);
    let headers = new Headers();
    headers.append('Accept', 'application/json'); 
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    this.storage.get('playerData').then((playerData)=> {
      if (playerData && playerData.hasOwnProperty('player_id')) {
        let data = {
          user_id : playerData.player_id,
          token: token
        };

          this.http.post('https://www.dev.glowup.me/football/api/add_firebase_token', data, options)
          .map(res => res.json())
          .subscribe(res => {
            console.log(res)
          });
      } else {
         console.log('User Not Logged IN');
      }
    });
  }

  listenToNotifications() {
  	return this.firebaseNative.onNotificationOpen();
  }
}
