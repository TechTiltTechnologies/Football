import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,Platform,LoadingController,ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage'
import { SidePage } from '../side/side';
import { TabsPage } from '../tabs/tabs';
import { NotificationPage } from '../notification/notification';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  @ViewChild ('pname') playername;
  @ViewChild ('pemail') playermail;
  @ViewChild ('pnumber') playerphone;
   profile:any;
   profile_imagee:any;
   profievalue:any;
   picture:any;
   data:any;
   image:any;
   profile_image:any;
   playerDetails:any;
   send_image:any;
   imagename:any;
  constructor(public navCtrl: NavController,private filePath: FilePath,private file:File,public platform: Platform,public actionSheetCtrl: ActionSheetController,public storage:Storage,private toastCtrl: ToastController,private http: Http, public loading: LoadingController,public loadingCtrl:LoadingController, private camera: Camera,private transfer: FileTransfer,public navParams: NavParams) {
   this.profievalue = navParams.get('profile');
   this.image = navParams.get('img')
   this.data = this.profievalue.playerDetails
 //console.log(this.image)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  

  update(){


if(this.imagename == undefined){
  this.send_image = "";
}
else{
  console.log('1')
  this.send_image = this.imagename ;
}
   var headers = new Headers();
    
   headers.append('Accept', 'application/json');
   
   headers.append('Content-Type', 'application/json' );
   
   let options = new RequestOptions({ headers: headers });
   
   let data = {
   
   player_id : this.profievalue.player_id,

   player_fname : this.playername.value,
   
   player_email : this.playermail.value,

   player_number : this.playerphone.value,

   player_image : this.send_image
   
 
   };
   console.log(data)
   let loader = this.loadingCtrl.create({
   
   content: 'please wait…',
   
   });
   
   loader.present().then(() => {
   
   this.http.post('https://www.dev.glowup.me/football/api/player_update',data,options)
   
   .map(res => res.json())
   
   .subscribe(res => {
   
   console.log(res)
   
   if(res.status == 200){
    this.storage.set('playerData',null);
   
    loader.dismiss()
     let toast  = this.toastCtrl.create({
       message: (res.msg),
       duration: 3000,
       position: 'bottom'
     
     });
   
     toast.onDidDismiss(() => {
       console.log('Dismissed toast');
     });
     
     toast.present();

    this.storage.set('playerData',res.data)
     //this.navCtrl.push(SidePage);
 
        this.navCtrl.setRoot(SidePage,{
          playerDetails:res.data
         });
   
   } else
   
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

  getImage(){
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
      correctOrientation: true
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
      this.profile_image = newFileName;
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
    var url = "https://www.dev.glowup.me/football/api/player_profile_upload";
   
     // File for Upload
     var targetPath = this.pathForImage(this.profile_image);
   
     // File name only
     var file = this.profile_image;
    
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
