import { Component,OnInit } from '@angular/core';
import { Camera } from 'ionic-native';
import { photo } from '../photo';
import { FirebaseListObservable,AngularFire } from 'angularfire2'

@Component({
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  constructor(private af : AngularFire) {

  }

  ngOnInit(){
    this.getPictures();
  }
  photos : FirebaseListObservable<photo[]>;

  getPictures() {
    this.photos = this.af.database.list("/photos");
  }

  takePicture(){
    Camera.getPicture({
      destinationType     : Camera.DestinationType.DATA_URL,
      targetHeight        : 500,
      targetWidth         : 500,
      correctOrientation  : true
    }).then((imageData) =>{
      this.photos.push({ src:"data:image/jpeg;base64,"+imageData, likes:0 });
    },(err)=>{
      console.log(err);
    })
  }

  likePicture(photokey : string, likes : number) {
   this.photos.update(photokey,{likes :likes + 1});
  }

  deletePicture(photokey : string) {
    this.photos.remove(photokey);
  }
}
