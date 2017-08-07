import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ArrayData={
    id:'',
    name:'',
    description:''
  };
  constructor(public navCtrl: NavController,private BCScanner: BarcodeScanner) {

  }
  opencamera(){
    this.BCScanner.scan().then((Mydata)=>{
      //suscesse
      this.ArrayData.id = Mydata.text;
    },(Error)=>{
      //error
      alert(Error);
    });
  }
 
}
