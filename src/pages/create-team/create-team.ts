import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,ActionSheetController,Platform, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { MyTeamPage } from '../my-team/my-team';
import { tokenName } from '@angular/compiler';
import { checkAndUpdateTextInline } from '@angular/core/src/view/text';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { RestApiProvider } from '../../providers/rest-api/rest-api'
import { NotificationPage } from '../notification/notification';
import { File } from '@ionic-native/file';
import { CachedResourceLoader } from '@angular/platform-browser-dynamic/src/resource_loader/resource_loader_cache';
import { catchError } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-create-team',
  templateUrl: 'create-team.html',
})
export class CreateTeamPage {
  @ViewChild('tname') teamname;
  @ViewChild('cname') captain;
  @ViewChild('tmail') teamemail;
  @ViewChild('tnumber') teamnumber;
  @ViewChild('tcity') teamcity;
  @ViewChild('tslogon') teamslogon;
  @ViewChild('tsize') teamsize;
  @ViewChild('image') logo;
  teamlogo:any;
  playerData:any;
  name:any;
  imageUrl:any;
  teamDetails:any;
  response:any;
  image:any;
  profile_imagee:any;
  picture:any;
  imagename:any;
  sendd_image:any;
  constructor(public navCtrl: NavController,private filePath: FilePath,public platform: Platform,public actionSheetCtrl: ActionSheetController,private _sanitizer: DomSanitizer,public rest:RestApiProvider,public toastCtrl:ToastController, private http: Http,public storage:Storage,public loadingCtrl:LoadingController, private camera: Camera,private file:File,private transfer: FileTransfer, public navParams: NavParams) {
    
    this.storage.get('playerData').then((val) => {
      this.playerData = val;
      this.name = this.playerData.player_fname;
     });
    // this.getgroundlist();
     this.teamlogo = " "
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTeamPage');
   
  }


  // getgroundlist(){
  //   this.rest.getUrl()
  //   .then(data => {
  //     this.image = data;
  //     this.imageUrl = this.image.url;
  //     //console.log(data)
  //   });
  
  // }

  myteam(){
    
    if(this.teamname.value == '' ){
      let toast  = this.toastCtrl.create({
        message: 'Team Name is empty',
        duration: 3000,
        position: 'bottom'
      
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
      
      } 

     else if(this.teamcity.value == '' ){
        let toast  = this.toastCtrl.create({
          message: 'Team City is empty',
          duration: 3000,
          position: 'bottom'
        
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
        
        } 

        else if(this.teamsize.value == '' ){
          let toast  = this.toastCtrl.create({
            message: 'Team Size is empty',
            duration: 3000,
            position: 'bottom'
          
          });
        
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        
          toast.present();
          
          } 

          else if(this.teamsize.value.length > 2 ){
            let toast  = this.toastCtrl.create({
              message: 'Invalid Team Size',
              duration: 3000,
              position: 'bottom'
            
            });
          
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
            
            toast.present();
          
          }

          // else if(this.teamlogo == '' ){
          //   let toast  = this.toastCtrl.create({
          //     message: 'Team Name is empty',
          //     duration: 3000,
          //     position: 'bottom'
            
          //   });
          
          //   toast.onDidDismiss(() => {
          //     console.log('Dismissed toast');
          //   });
          
          //   toast.present();
            
          //   } 

    else{

      
if(this.imagename == undefined){
  this.sendd_image = "";
}
else{
  this.sendd_image = this.imagename;
}

    console.log(this.teamname.value)
    console.log(this.playerData.player_id)
    //values
    var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {
    
    team_name: this.teamname.value,
    
    captain_id : this.playerData.player_id,

    // team_phone: this.teamnumber.value,

    // team_email: this.teamemail.value,

     team_city : this.teamcity.value,

    team_size:this.teamsize.value,

   // team_slogon : this.teamslogon.value

    team_logo:this.sendd_image
  
    };
    console.log(data)
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/add_team',data,options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    console.log(res)
    if(res.status == 200){
      // this.storage.set("teamDetails",this.teamDetails)
     //loader.dismiss()
      let toast  = this.toastCtrl.create({
        message: (res.msg),
        duration: 3000,
        position: 'bottom'
      
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      
      toast.present();

     // this.navCtrl.push(MyTeamPage);

      // this.teamDetails = {
      //   teamDetails : res.data
      // };
      console.log(res.data)
      console.log(res.data.team_id)


      // this.navCtrl.push(MyTeamPage)
        //  this.navCtrl.push(MyTeamPage,{
        //   teamDetails:this.teamDetails
        //   });

        //myteam
        var headers = new Headers();
    
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let data = {
  
  team_id : res.data.team_id,

  };


  this.http.post('https://www.dev.glowup.me/football/api/by_id_team_ci',data,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
 // console.log(res)
  if(res.status == 200){
   loader.dismiss()
    this.teamDetails = {
      teamDetails : res.data
    };
    this.navCtrl.push(MyTeamPage,{
         teamDetails:this.teamDetails
        });
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

    
    } else
    
    {
      loader.dismiss()
      let toast  = this.toastCtrl.create({
        message: res.msg,
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
  getImage(){
//created by Nellai 
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit:true,
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

 copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.teamlogo = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  
  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  
  }
  
   uploadImage() {
    // Destination URL
    var url = "https://www.dev.glowup.me/football/api/image_upload";
   
    // File for Upload
    var targetPath = this.pathForImage(this.teamlogo);
   
    // File name only
    var file = this.teamlogo;
   
    var options = {
      filename: "file",
      file: file,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'file': file}
    };
   
    const fileTransfer: FileTransferObject = this.transfer.create();
   
    let loader = this.loadingCtrl.create({
          content: "Uploading..."
        });
        loader.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      loader.dismiss();
      
      this.profile_imagee = data;
      this.picture = JSON.parse(this.profile_imagee.response);
      console.log(this.picture)
      console.log(data)
      console.log( this.profile_imagee)

      let url = this.picture

      this.imagename = url.split('/').pop().split('#')[0].split('?')[0];

      console.log(this.imagename)

      this.presentToast('Image succesful uploaded.');
    }, err => {
      loader.dismiss();
      this.presentToast('Error while uploading file.');
    });
  }
notify(){
  this.navCtrl.push(NotificationPage);
}
}
