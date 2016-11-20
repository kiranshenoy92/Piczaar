import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
import { photo } from '../photo';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  constructor() {

  }
  photos : photo[] = [];


  takePicture(){
    Camera.getPicture({
      destinationType     : Camera.DestinationType.DATA_URL,
      targetHeight        : 500,
      targetWidth         : 500,
      correctOrientation  : true
    }).then((imageData) =>{
      this.photos.push(new photo('data:image/jpeg;base64,'+imageData,0));
    },(err)=>{
      console.log(err);
    })
  }

  likePicture(photo : photo) {
   photo.likes++;
  }

  deletePicture(photo : photo) {
    this.photos.splice(this.photos.indexOf(photo),1);
  }
}
