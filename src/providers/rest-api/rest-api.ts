import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class RestApiProvider {
  
  public apiUrl = "https://www.dev.glowup.me/football/api/grounds_list"
  public tourUrl = "https://www.dev.glowup.me/football/api/tournament_list"
  public teamUrl ="https://www.dev.glowup.me/football/api/show_team_ci"
  public playerUrl = "https://www.dev.glowup.me/football/api/get_players"
  public imgUrl = "https://www.dev.glowup.me/football/api/post_logo_url"
  public groundUrl = "https://www.dev.glowup.me/football/api/get_all_ground_locations"
  
  constructor(public http: HttpClient) {
    console.log('Hello RestApiProvider Provider');
  }

  getGround() {


    
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
  getTournament(){
    return new Promise(resolve => {
      this.http.get(this.tourUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getTeam(){
    return new Promise(resolve => {
      this.http.get(this.teamUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getPlayer(){
    return new Promise(resolve => {
      this.http.get(this.playerUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getUrl(){
    return new Promise(resolve => {
      this.http.get(this.imgUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getLocation(){
    return new Promise(resolve => {
      this.http.get(this.groundUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
