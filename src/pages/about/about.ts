import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,private BCScanner: BarcodeScanner) {

  }
  BCopencamera(){
      this.BCScanner.scan().then((Mydata)=>{
        //suscesse
        
      },(Error)=>{
        //error
        alert(Error);
      });
  }

}
