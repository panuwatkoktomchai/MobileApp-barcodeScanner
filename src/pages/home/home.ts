import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ArrayData: any = {
    id: '',
    names: '',
    prices:'',
    description: ''
  };
  constructor(public navCtrl: NavController, private BCScanner: BarcodeScanner, private storage: Storage, private qrScanner: QRScanner) {}
  QCopencamera() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            alert('Scanned something' + text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => alert('Error is = ' + e));
  }
  BCopencamera() {
    this.BCScanner.scan().then((Mydata) => {
      //suscesse
      this.ArrayData.id = Mydata.text;
    }, (Error) => {
      //error
      alert(Error);
    });
  }
  /*check form input*/
  savelist() {
    if (this.ArrayData.id == "") {
      alert("กรุณาระบุไอดี")
      return;
    }
    else if (this.ArrayData.names == "") {
      alert("กรุณาระบุชื่อ");
      return;
    }
    else {
      this.checkid()
      this.setdata_storage();
    }
  }
  /*check form input*/


  /* check id repeat */
  checkid() {
    this.storage.forEach((value,key,index) => {
      if(this.ArrayData.id == value["IDBC"]){
        alert("รหัสนี้มีอยู่แล้ว")
        return(false)
      }
    });
  }
  /* check id */


  /* warning id repeat */
  
  stus:any = true
  checkstatus(){
    console.log(this.stus)
  }
  /* warning id repeat */


  /* set to storage */
  setdata_storage() {
    let myObj;
    myObj = {
      "IDBC": this.ArrayData.id,
      "NAMES": this.ArrayData.names,
      "PRICES":this.ArrayData.prices,
      "DES": this.ArrayData.description
    }
    this.storage.set(this.ArrayData.id, myObj)
    console.log("set storage");
    console.log(myObj.PRICES)
    this.ArrayData.id = ''
    this.ArrayData.names = ''
    this.ArrayData.prices = ''
    this.ArrayData.description = ''
  }
  /* set to storage */
}
