import { Component } from '@angular/core';
import { NavController,ActionSheetController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  Alue:any = []
  constructor(public navCtrl: NavController, private BCScanner: BarcodeScanner,private storage: Storage,public actionSheetCtrl: ActionSheetController, private qrScanner: QRScanner) {
  }
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
      this.myInput = Mydata.text;
      /************/
      this.storage.forEach((value,key,index)=>{
        if (this.myInput == value.IDBC) {
          alert(this.myInput+'=='+value.IDBC)
          this.Alue = []
          this.Alue.push({
            idbc:value.IDBC,
            names:value.NAMES,
            pri:value.PRICES,
            des:value.DES
          })
        }
      })
      /************/
    }, (Error) => {
      //error
      alert(Error);
    });
  }
/* chearch data */
myInput:string
onInput(){
  this.storage.forEach((value,key,index) => {
    if(value.IDBC == this.myInput){
      console.log('this is id : ',value.IDBC,'==',this.myInput)
      this.Alue = []
      this.Alue.push({
        idbc:value.IDBC,
        names:value.NAMES,
        pri:value.PRICES,
        des:value.DES
      })
      return
    }else if(value.NAMES == this.myInput){
      console.log('this is name : ',value.NAMES,'==',this.myInput)
      this.Alue = []
      this.Alue.push({
        idbc:value.IDBC,
        names:value.NAMES,
        pri:value.PRICES,
        des:value.DES
      })
      return
    }else if(value.PRICES == this.myInput){
      console.log('this is price : ',value.PRICES,'==',this.myInput)
      this.Alue = []
      this.Alue.push({
        idbc:value.IDBC,
        names:value.NAMES,
        pri:value.PRICES,
        des:value.DES
      })
      return
    }else if(value.DES == this.myInput){
      console.log('this is description : ',value.DES,'==',this.myInput)
      this.Alue = []
      this.Alue.push({
        idbc:value.IDBC,
        names:value.NAMES,
        pri:value.PRICES,
        des:value.DES
      })
      return
    }
  });
}
ontouchcancel(){
  this.myInput=''
}
/* chearch data */

showtext(){
   this.Alue = []
   this.storage.forEach( (value, key, index) => {
     this.Alue.push({
       idbc:value.IDBC,
       names:value.NAMES,
       pri:value.PRICES,
       des:value.DES
     }) 
})
 //console.log(this.Alu)
}
delete_list(Numlist,index){
  console.log(Numlist)
  this.storage.remove(Numlist)
  this.showtext();
}
  clearitem(){
    if (confirm("ต้องการล้างข้อมูลหรือไม่")) {
      this.storage.clear()
      this.Alue=[]
      alert("ลบข้อมูลทั้งหมดแล้ว")
    }else{
      return
    }
  }

presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'แสดงรายการ',
          role: 'destructive',
          handler: () => {
            this.showtext()
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
