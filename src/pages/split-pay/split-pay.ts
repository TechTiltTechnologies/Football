import { BookNowPage } from './../book-now/book-now';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';
import { RestApiProvider } from '../../providers/rest-api/rest-api'
import { SocialSharing } from '@ionic-native/social-sharing';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-split-pay',
  templateUrl: 'split-pay.html',
})
export class SplitPayPage {
  public invoiceForm: FormGroup;
  model: any = {};
  data:any;
  value:any;
  players:any;
  splitmore:any;
  amounnt:any;
  isenabled:boolean=false;
  name:Array<any>;
  playerid:Array<any>;
  playerData:any;
  total:any;
  message:string;
  pname:any;
  clanguage:any;
  file:string = null;
  link:string = 'https://www.facebook.com/';
  subject:string = null;
  constructor(public navCtrl: NavController,public storage:Storage,
             public alertCtrl:AlertController, 
             public toastCtrl:ToastController, 
             public loadingCtrl:LoadingController,
             public translate: TranslateService,
             public platform: Platform,
             public rest:RestApiProvider,
             private socialSharing: SocialSharing,
             public navParams: NavParams,
              private http: Http,
              private _fb: FormBuilder) {
  
    this.getplayerlist();
    this.name=[];
    this.playerid = [];
    console.log(this.value)

    this.amounnt = navParams.get('amount')
    console.log(this.amounnt)

    storage.get('playerData').then((val) => {
      this.playerData = val;
      this.pname = this.playerData.player_fname;
     });

     storage.get('chooselanguage').then((val) => {
      this.clanguage = val;
    console.log(this.clanguage)

    if(this.clanguage == 'en')
    {
      this.platform.setDir('ltr', true);
      this.translate.use('en');
    }
    else if(this.clanguage == 'ar'){

      this.platform.setDir('rtl', true);
      this.translate.use('ar');
      
    }
    });
     this.total = this.amounnt;



    
  }

  ngOnInit() {
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])
     
    });
   // console.log(this.invoiceForm)
  }

  submit(){
    console.log("Calculate");
    let items = this.invoiceForm.value.itemRows;
     this.total = this.amounnt;
    let players =[];
   

    items.map((item,i)=>{
      if(item.amount != "") {
       this. total-=parseInt(item.amount);
        players.push({name:this.name[i],amount:item.amount,playerid:this.playerid[i]})
      }
    });
    console.log("Remaininge amount "+ this.total);
    console.log(players);

  }
  /// let amount = this.invoiceForm.value.itemRows[i].amount;
  //  let user = this.name[i];

  itemClicked(value,i){

    console.log(value.player_fname,this,this.name);

    this.name[i] = value.player_fname

    this.playerid[i] = value.player_id

    this.isenabled=true; 



  }

  get formArr() {
    return this.invoiceForm.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this._fb.group({
      amount: [''],
     
      
    });
  }

  addNewRow() {
    console.log(this._fb.group)
  
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
    this.submit();
  }
  getplayerlist(){
    this.rest.getPlayer()
    .then(data => {
      this.data = data;
      this.players = this.data.data
      console.log(this.players)
     // this.grounds = this.Gdetails.data;
    });
  
  }

  selectPlayer(data,i){

  }

  send(i){

    console.log("Calculate");
    let items = this.invoiceForm.value.itemRows;
     this.total = this.amounnt;
    let players =[];
   

    items.map((item,i)=>{
      if(item.amount != "") {
       this. total-=parseInt(item.amount);
        players.push({name:this.name[i],amount:item.amount,playerid:this.playerid[i]})
      }
    });
    console.log("Remaininge amount "+ this.total);
    console.log(players);

     let amount = this.invoiceForm.value.itemRows[i].amount;
   let user = this.name[i];
   let playerrid = this.playerid[i]

    var headers = new Headers();
  
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {
    
     amount_spliter_id:this.playerData.player_id,
    
     sp_player_id : playerrid,
    
     split_amount : amount
    
    };
    console.log(data)
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/split_payment_send_sms',data,options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
     console.log(res)
    if(res.status == 200){
     loader.dismiss()
     let toast  = this.toastCtrl.create({
      message: "Request Send Successfull",
      duration: 3000,
      position: 'bottom'
    
    });
    
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    
    toast.present();
    } else
    {
      loader.dismiss()
      let toast  = this.toastCtrl.create({
        message: "Somthing Went Wrong.Please Try again later",
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

  share(){

    this.message = this.playerData.player_fname + 'has invited you to join to Street League. Install Street League app now from below link and have fun playing football!'
    console.log(this.message)
    this.socialSharing.share(this.message,this.subject,this.file,this.link)
   .then(()=>{
  
  }).catch(()=>{
  
  });
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;
    console.log("val",val)
    this.value = val
    //this.getplayerlist();
    if(val == ""){
      this.getplayerlist();
    }
      if (val && val.trim() != '') {
            this.players = this.players.filter((player) => {
          return ((player.player_fname.toLowerCase().indexOf(val.toLowerCase()) > -1)); 
        })
      }

      console.log("selectinfo",this.players)
  }

  morepayment(){
  this.splitmore = "SplitMore"
  console.log(this.splitmore)
  }
  
  booknow(){
    this.navCtrl.push(BookNowPage);
  }
  pay(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplitPayPage');
  }

}
